var SYSTEM_PROMPT = 'You are ElectionGuide, a friendly and nonpartisan expert assistant on election processes. Explain elections clearly and simply. Keep answers 3-6 sentences. Never endorse candidates or parties. Default to general/US elections if no country specified. Always be warm and encouraging.';

var quizState = { index: 0, score: 0, answered: false };

function initNavigation() {
  var navBtns = document.querySelectorAll('.nav-btn');
  var panels = document.querySelectorAll('.tab-panel');
  var hero = document.getElementById('hero-section');

  navBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      navBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var tab = btn.getAttribute('data-tab');
      panels.forEach(function(p) { p.style.display = 'none'; });
      document.getElementById('tab-' + tab).style.display = 'block';
      if (tab !== 'chat') {
        hero.style.display = 'none';
      } else {
        hero.style.display = 'block';
      }
    });
  });
}

function initChatInput() {
  document.getElementById('send-btn').addEventListener('click', sendMessage);
  document.getElementById('chat-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

function sendMessage() {
  var inputEl = document.getElementById('chat-input');
  var text = inputEl.value.trim();
  if (!text) return;

  var sendBtn = document.getElementById('send-btn');
  sendBtn.disabled = true;
  inputEl.value = '';

  appendMessage(text, 'user');
  var loader = appendLoader();

  fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAVUqs7HDl1KU5jCvSAZ7LdkJt18-KybWI',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: text }] }],
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }
      })
    }
  )
  .then(function(response) { return response.json(); })
  .then(function(data) {
    loader.remove();
    var reply = 'Sorry, I could not generate a response.';
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      reply = data.candidates[0].content.parts[0].text;
    }
    appendMessage(reply, 'bot');
    sendBtn.disabled = false;
  })
  .catch(function(error) {
    console.error(error);
    loader.remove();
    appendMessage('Sorry, something went wrong. Please try again.', 'bot');
    sendBtn.disabled = false;
  });
}

function appendMessage(text, role) {
  var chatArea = document.getElementById('chat-area');
  var msgDiv = document.createElement('div');
  msgDiv.className = 'msg ' + role + '-msg';

  var avatar = document.createElement('div');
  avatar.className = 'avatar ' + (role === 'bot' ? 'bot-av' : 'user-av');
  avatar.textContent = role === 'bot' ? '🗳' : '👤';

  var bubble = document.createElement('div');
  bubble.className = 'bubble';

  var sanitized = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');

  bubble.innerHTML = sanitized;

  msgDiv.appendChild(avatar);
  msgDiv.appendChild(bubble);
  chatArea.appendChild(msgDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function appendLoader() {
  var chatArea = document.getElementById('chat-area');
  var msgDiv = document.createElement('div');
  msgDiv.className = 'msg bot-msg';
  msgDiv.innerHTML = '<div class="avatar bot-av">🗳</div><div class="bubble"><div class="loading-dots"><span></span><span></span><span></span></div></div>';
  chatArea.appendChild(msgDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
  return msgDiv;
}

function quickAsk(question) {
  var chatBtn = document.querySelector('.nav-btn[data-tab="chat"]');
  chatBtn.click();
  var inputEl = document.getElementById('chat-input');
  inputEl.value = question;
  sendMessage();
}

function buildTimeline() {
  var container = document.getElementById('timeline-container');
  container.innerHTML = '';

  ELECTION_PHASES.forEach(function(phase, index) {
    var row = document.createElement('div');
    row.className = 'tl-row';

    var spine = document.createElement('div');
    spine.className = 'tl-spine';

    var dot = document.createElement('div');
    dot.className = 'tl-dot ' + phase.dot;
    spine.appendChild(dot);

    if (index < ELECTION_PHASES.length - 1) {
      var line = document.createElement('div');
      line.className = 'tl-line';
      spine.appendChild(line);
    }

    var card = document.createElement('div');
    card.className = 'tl-card';
    card.tabIndex = 0;

    card.innerHTML =
      '<div class="tl-meta"><span class="tl-phase">' + phase.phase + '</span><span class="tl-date">' + phase.date + '</span></div>' +
      '<div class="tl-title">' + phase.title + '</div>' +
      '<div class="tl-body"><p>' + phase.detail + '</p><button class="tl-ask-btn">Ask AI about this</button></div>';

    card.addEventListener('click', function() {
      card.classList.toggle('open');
    });

    var askBtn = card.querySelector('.tl-ask-btn');
    askBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      quickAsk(phase.ask);
    });

    row.appendChild(spine);
    row.appendChild(card);
    container.appendChild(row);
  });
}

function buildGlossary() {
  var grid = document.getElementById('glossary-grid');
  grid.innerHTML = '';

  GLOSSARY_TERMS.forEach(function(item) {
    var card = document.createElement('div');
    card.className = 'g-card';
    card.setAttribute('data-term', item.term.toLowerCase());
    card.tabIndex = 0;
    card.innerHTML = '<div class="g-term">' + item.term + '</div><div class="g-def">' + item.def + '</div>';

    card.addEventListener('click', function() {
      quickAsk('Explain "' + item.term + '" in plain language with a real-world example related to elections.');
    });

    grid.appendChild(card);
  });
}

function filterGlossary(query) {
  var lowerQuery = query.toLowerCase();
  var cards = document.querySelectorAll('.g-card');
  cards.forEach(function(card) {
    var term = card.querySelector('.g-term').textContent.toLowerCase();
    var def = card.querySelector('.g-def').textContent.toLowerCase();
    card.style.display = (term.includes(lowerQuery) || def.includes(lowerQuery)) ? '' : 'none';
  });
}

function buildQuiz() {
  quizState = { index: 0, score: 0, answered: false };
  renderQuestion();
}

function renderQuestion() {
  var container = document.getElementById('quiz-container');
  container.innerHTML = '';

  if (quizState.index >= QUIZ_QUESTIONS.length) {
    renderScore();
    return;
  }

  var qData = QUIZ_QUESTIONS[quizState.index];
  var progress = Math.round((quizState.index / QUIZ_QUESTIONS.length) * 100);

  var card = document.createElement('div');
  card.className = 'quiz-card';
  card.innerHTML =
    '<div class="quiz-progress">Question ' + (quizState.index + 1) + ' of ' + QUIZ_QUESTIONS.length + '</div>' +
    '<div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + progress + '%"></div></div>' +
    '<div class="quiz-q">' + qData.q + '</div>' +
    '<div class="quiz-opts" id="quiz-opts"></div>' +
    '<div class="quiz-exp" id="quiz-exp">' + qData.exp + '</div>';

  container.appendChild(card);

  var optsContainer = document.getElementById('quiz-opts');
  qData.opts.forEach(function(optText, i) {
    var btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = optText;
    btn.addEventListener('click', function() { checkAnswer(i); });
    optsContainer.appendChild(btn);
  });
}

function checkAnswer(selectedIdx) {
  if (quizState.answered) return;
  quizState.answered = true;

  var qData = QUIZ_QUESTIONS[quizState.index];
  var buttons = document.querySelectorAll('.quiz-opt');

  buttons.forEach(function(btn) { btn.disabled = true; });

  if (selectedIdx === qData.ans) {
    buttons[selectedIdx].classList.add('correct');
    quizState.score++;
  } else {
    buttons[selectedIdx].classList.add('wrong');
    buttons[qData.ans].classList.add('correct');
  }

  document.getElementById('quiz-exp').style.display = 'block';

  setTimeout(function() {
    quizState.index++;
    quizState.answered = false;
    renderQuestion();
  }, 2500);
}

function renderScore() {
  var container = document.getElementById('quiz-container');
  var msg = 'Keep learning - explore the Timeline and Glossary tabs.';
  if (quizState.score === 5) msg = 'Perfect score! You are an election expert!';
  else if (quizState.score >= 3) msg = 'Great work! You have a solid understanding of elections.';

  container.innerHTML =
    '<div class="quiz-card quiz-score-screen">' +
    '<div class="quiz-score-num">' + quizState.score + '/' + QUIZ_QUESTIONS.length + '</div>' +
    '<div class="quiz-score-label">' + msg + '</div>' +
    '<button class="quiz-retake" onclick="buildQuiz()">Retake Quiz</button>' +
    '</div>';
}

document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initChatInput();
  buildTimeline();
  buildGlossary();
  buildQuiz();
});
