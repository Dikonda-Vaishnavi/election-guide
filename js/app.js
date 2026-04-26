const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

const SYSTEM_PROMPT = `You are ElectionGuide, a friendly and nonpartisan expert assistant on election processes. 
Explain elections clearly and simply. Keep answers 3–6 sentences. Never endorse candidates or parties. 
Default to general/US elections if no country specified. Always be warm and encouraging.`;

let conversationHistory = [];
let quizState = { index: 0, score: 0, answered: false };

function initNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  const panels = document.querySelectorAll('.tab-panel');
  const heroSection = document.getElementById('hero-section');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tabName = btn.getAttribute('data-tab');
      
      panels.forEach(p => p.style.display = 'none');
      document.getElementById(`tab-${tabName}`).style.display = 'block';

      if (tabName !== 'chat') {
        heroSection.style.display = 'none';
      } else {
        heroSection.style.display = 'block';
      }
    });
  });
}

function initChatInput() {
  const sendBtn = document.getElementById('send-btn');
  const chatInput = document.getElementById('chat-input');

  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

async function sendMessage() {
  const inputEl = document.getElementById('chat-input');
  const text = inputEl.value.trim();
  if (!text) return;

  const sendBtn = document.getElementById('send-btn');
  sendBtn.disabled = true;
  inputEl.value = '';

  appendMessage(text, 'user');
  conversationHistory.push({ role: 'user', content: text });

  const loader = appendLoader();

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
        'x-api-key': 'DEMO_KEY_HANDLED_BY_PROXY'
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: conversationHistory
      })
    });

    if (!response.ok) {
      throw new Error('API Error');
    }

    const data = await response.json();
    const replyText = data.content[0].text;
    
    loader.remove();
    appendMessage(replyText, 'bot');
    conversationHistory.push({ role: 'assistant', content: replyText });
    
    if (conversationHistory.length > 20) {
      conversationHistory = conversationHistory.slice(-20);
    }
  } catch (error) {
    console.error(error);
    loader.remove();
    appendMessage("I'm sorry, I'm having trouble connecting to the network right now. Please try again later.", 'bot');
  } finally {
    sendBtn.disabled = false;
  }
}

function appendMessage(text, role) {
  const chatArea = document.getElementById('chat-area');
  const msgDiv = document.createElement('div');
  msgDiv.className = `msg ${role}-msg`;

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = role === 'bot' ? '🗳' : '👤';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  
  let sanitized = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, "<br>");
    
  bubble.innerHTML = sanitized;

  msgDiv.appendChild(role === 'bot' ? avatar : bubble);
  msgDiv.appendChild(role === 'bot' ? bubble : avatar);

  chatArea.appendChild(msgDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function appendLoader() {
  const chatArea = document.getElementById('chat-area');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'msg bot-msg';
  
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = '🗳';
  
  const bubble = document.createElement('div');
  bubble.className = 'bubble loading-dots';
  bubble.innerHTML = '<div></div><div></div><div></div>';
  
  msgDiv.appendChild(avatar);
  msgDiv.appendChild(bubble);
  
  chatArea.appendChild(msgDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
  return msgDiv;
}

function quickAsk(question) {
  const chatTabBtn = document.querySelector('.nav-btn[data-tab="chat"]');
  chatTabBtn.click();
  
  const inputEl = document.getElementById('chat-input');
  inputEl.value = question;
  sendMessage();
}

function buildTimeline() {
  const container = document.getElementById('timeline-container');
  container.innerHTML = '';

  ELECTION_PHASES.forEach((phase, index) => {
    const row = document.createElement('div');
    row.className = 'tl-row';

    const spine = document.createElement('div');
    spine.className = 'tl-spine';
    
    const dot = document.createElement('div');
    dot.className = `tl-dot ${phase.dot}`;
    spine.appendChild(dot);

    if (index < ELECTION_PHASES.length - 1) {
      const line = document.createElement('div');
      line.className = 'tl-line';
      spine.appendChild(line);
    }

    const card = document.createElement('div');
    card.className = 'tl-card';
    card.setAttribute('role', 'button');
    card.setAttribute('aria-expanded', 'false');
    card.tabIndex = 0;

    card.innerHTML = `
      <div class="tl-meta">
        <span class="tl-phase">${phase.phase}</span>
        <span class="tl-date">${phase.date}</span>
      </div>
      <h3 class="tl-title">${phase.title}</h3>
      <div class="tl-body">
        <p>${phase.detail}</p>
        <button class="tl-ask-btn">Ask AI about this ↗</button>
      </div>
    `;

    card.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      card.classList.toggle('open');
      card.setAttribute('aria-expanded', !isOpen);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });

    const askBtn = card.querySelector('.tl-ask-btn');
    askBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      quickAsk(phase.ask);
    });

    row.appendChild(spine);
    row.appendChild(card);
    container.appendChild(row);
  });
}

function buildGlossary() {
  const grid = document.getElementById('glossary-grid');
  grid.innerHTML = '';

  GLOSSARY_TERMS.forEach(item => {
    const card = document.createElement('div');
    card.className = 'g-card';
    card.setAttribute('data-term', item.term.toLowerCase());
    card.tabIndex = 0;
    
    card.innerHTML = `
      <h4 class="g-term">${item.term}</h4>
      <p class="g-def">${item.def}</p>
    `;

    card.addEventListener('click', () => {
      quickAsk(`Explain "${item.term}" in plain language with a real-world example related to elections.`);
    });
    
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });

    grid.appendChild(card);
  });

  const searchInput = document.getElementById('glossary-search');
  searchInput.addEventListener('input', (e) => filterGlossary(e.target.value));
}

function filterGlossary(query) {
  const lowerQuery = query.toLowerCase();
  const cards = document.querySelectorAll('.g-card');
  
  cards.forEach(card => {
    const term = card.querySelector('.g-term').textContent.toLowerCase();
    const def = card.querySelector('.g-def').textContent.toLowerCase();
    
    if (term.includes(lowerQuery) || def.includes(lowerQuery)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function buildQuiz() {
  quizState = { index: 0, score: 0, answered: false };
  renderQuestion();
}

function renderQuestion() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';

  if (quizState.index >= QUIZ_QUESTIONS.length) {
    renderScore();
    return;
  }

  const qData = QUIZ_QUESTIONS[quizState.index];

  const card = document.createElement('div');
  card.className = 'q-card';

  card.innerHTML = `
    <div class="q-progress">Question ${quizState.index + 1} of ${QUIZ_QUESTIONS.length}</div>
    <div class="q-text">${qData.q}</div>
    <div class="q-opts" id="q-opts-container"></div>
  `;

  container.appendChild(card);

  const optsContainer = document.getElementById('q-opts-container');
  
  qData.opts.forEach((optText, i) => {
    const btn = document.createElement('button');
    btn.className = 'q-opt';
    btn.textContent = optText;
    
    btn.addEventListener('click', () => checkAnswer(i));
    optsContainer.appendChild(btn);
  });
}

function checkAnswer(selectedIdx) {
  if (quizState.answered) return;
  quizState.answered = true;

  const qData = QUIZ_QUESTIONS[quizState.index];
  const buttons = document.querySelectorAll('.q-opt');
  const card = document.querySelector('.q-card');

  buttons.forEach(btn => btn.disabled = true);

  if (selectedIdx === qData.ans) {
    buttons[selectedIdx].classList.add('correct');
    quizState.score++;
  } else {
    buttons[selectedIdx].classList.add('wrong');
    buttons[qData.ans].classList.add('correct');
  }

  const expDiv = document.createElement('div');
  expDiv.className = 'quiz-exp';
  expDiv.textContent = qData.exp;
  card.appendChild(expDiv);

  setTimeout(() => {
    quizState.index++;
    quizState.answered = false;
    renderQuestion();
  }, 2500);
}

function renderScore() {
  const container = document.getElementById('quiz-container');
  
  let msg = "Keep learning — explore the Timeline and Glossary tabs.";
  if (quizState.score === 5) {
    msg = "Perfect score! You're an election expert! 🎉";
  } else if (quizState.score >= 3) {
    msg = "Great work! You have a solid understanding of elections.";
  }

  container.innerHTML = `
    <div class="q-score-card">
      <div class="q-score">${quizState.score}/${QUIZ_QUESTIONS.length}</div>
      <p class="q-text">${msg}</p>
      <button class="chip" style="margin-top:20px; font-size:1.1rem; padding:10px 20px" onclick="buildQuiz()">Retake Quiz</button>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initChatInput();
  buildTimeline();
  buildGlossary();
  buildQuiz();
});
