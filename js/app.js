var SYSTEM_PROMPT = "You are a helpful election guide assistant. Answer questions clearly and concisely.";

document.addEventListener("DOMContentLoaded", function() {
  initNavigation();
  initChatInput();
  buildTimeline();
  buildGlossary();
  buildQuiz();
  initChips();
});

function initNavigation() {
  var navButtons = document.querySelectorAll("nav button");
  navButtons.forEach(function(btn) {
    btn.addEventListener("click", function() {
      var tabId = "tab-" + this.getAttribute("data-tab");
      showTab(tabId);
    });
  });
}

function showTab(tabId) {
  var tabs = document.querySelectorAll(".tab-panel");
  tabs.forEach(function(tab) {
    tab.style.display = "none";
  });
  var selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.style.display = "block";
  }

  var hero = document.getElementById("hero");
  if (tabId === "tab-chat") {
    hero.style.display = "block";
  } else {
    hero.style.display = "none";
  }
}

function initChatInput() {
  var sendBtn = document.getElementById("send-btn");
  var chatInput = document.getElementById("chat-input");

  sendBtn.addEventListener("click", function() {
    sendMessage();
  });

  chatInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
}

function initChips() {
  var chips = document.querySelectorAll(".chip");
  chips.forEach(function(chip) {
    chip.addEventListener("click", function() {
      quickAsk(this.innerText);
    });
  });
}

async function sendMessage() {
  var chatInput = document.getElementById("chat-input");
  var chatArea = document.getElementById("chat-area");
  var text = chatInput.value.trim();

  if (!text) return;

  chatInput.value = "";

  var userMsg = document.createElement("div");
  userMsg.className = "msg user-msg";
  userMsg.innerText = "You: " + text;
  chatArea.appendChild(userMsg);

  var loadingMsg = document.createElement("div");
  loadingMsg.className = "msg ai-msg";
  loadingMsg.innerText = "AI: Thinking...";
  chatArea.appendChild(loadingMsg);

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAVUqs7HDl1KU5jCvSAZ7LdkJt18-KybWI',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: text }] }],
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }
        })
      }
    );
    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;

    loadingMsg.innerText = "AI: " + reply;
  } catch (error) {
    loadingMsg.innerText = "AI: Error connecting to the server.";
  }
}

function buildTimeline() {
  var container = document.getElementById("timeline-container");
  container.innerHTML = "";

  ELECTION_PHASES.forEach(function(phase) {
    var card = document.createElement("div");
    card.className = "timeline-card";
    
    var title = document.createElement("h3");
    title.innerText = phase.phase + ": " + phase.title + " (" + phase.date + ")";
    
    var detail = document.createElement("p");
    detail.className = "timeline-detail";
    detail.innerText = phase.detail;
    detail.style.display = "none";
    
    var askBtn = document.createElement("button");
    askBtn.className = "ask-btn";
    askBtn.innerText = "Ask AI";
    askBtn.style.display = "none";
    askBtn.onclick = function(e) {
      e.stopPropagation();
      quickAsk(phase.ask);
    };

    card.appendChild(title);
    card.appendChild(detail);
    card.appendChild(askBtn);

    card.addEventListener("click", function() {
      card.classList.toggle("open");
      if (card.classList.contains("open")) {
        detail.style.display = "block";
        askBtn.style.display = "inline-block";
      } else {
        detail.style.display = "none";
        askBtn.style.display = "none";
      }
    });

    container.appendChild(card);
  });
}

function buildGlossary() {
  var container = document.getElementById("glossary-container");
  var searchInput = document.getElementById("glossary-search");

  function renderTerms(filterText) {
    container.innerHTML = "";
    var lowerFilter = filterText.toLowerCase();

    GLOSSARY_TERMS.forEach(function(item) {
      if (item.term.toLowerCase().indexOf(lowerFilter) > -1 || item.def.toLowerCase().indexOf(lowerFilter) > -1) {
        var card = document.createElement("div");
        card.className = "glossary-card";
        
        var term = document.createElement("h3");
        term.innerText = item.term;
        
        var def = document.createElement("p");
        def.innerText = item.def;

        card.appendChild(term);
        card.appendChild(def);

        card.addEventListener("click", function() {
          quickAsk("What does " + item.term + " mean?");
        });

        container.appendChild(card);
      }
    });
  }

  renderTerms("");

  searchInput.addEventListener("keyup", function() {
    renderTerms(this.value);
  });
}

var currentQuizIndex = 0;
var quizScore = 0;

function buildQuiz() {
  currentQuizIndex = 0;
  quizScore = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  var container = document.getElementById("quiz-container");
  container.innerHTML = "";

  if (currentQuizIndex >= QUIZ_QUESTIONS.length) {
    container.innerHTML = "<h2>Quiz Complete!</h2><p>Your score: " + quizScore + " out of " + QUIZ_QUESTIONS.length + "</p>";
    var restartBtn = document.createElement("button");
    restartBtn.innerText = "Restart Quiz";
    restartBtn.onclick = buildQuiz;
    container.appendChild(restartBtn);
    return;
  }

  var qData = QUIZ_QUESTIONS[currentQuizIndex];
  var qEl = document.createElement("h3");
  qEl.innerText = "Question " + (currentQuizIndex + 1) + ": " + qData.q;
  container.appendChild(qEl);

  var optionsContainer = document.createElement("div");
  optionsContainer.className = "quiz-options";

  qData.opts.forEach(function(opt, index) {
    var btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.innerText = opt;
    btn.onclick = function() {
      handleQuizAnswer(index, qData.ans, optionsContainer, qData.exp);
    };
    optionsContainer.appendChild(btn);
  });

  container.appendChild(optionsContainer);
}

function handleQuizAnswer(selectedIndex, correctIndex, optionsContainer, explanation) {
  var buttons = optionsContainer.querySelectorAll("button");
  buttons.forEach(function(btn, index) {
    btn.disabled = true;
    if (index === correctIndex) {
      btn.style.backgroundColor = "green";
      btn.style.color = "white";
    } else if (index === selectedIndex) {
      btn.style.backgroundColor = "red";
      btn.style.color = "white";
    }
  });

  if (selectedIndex === correctIndex) {
    quizScore++;
  }

  var expEl = document.createElement("p");
  expEl.innerText = explanation;
  optionsContainer.appendChild(expEl);

  setTimeout(function() {
    currentQuizIndex++;
    renderQuizQuestion();
  }, 2500);
}

function quickAsk(question) {
  showTab("tab-chat");
  var chatInput = document.getElementById("chat-input");
  chatInput.value = question;
  sendMessage();
}
