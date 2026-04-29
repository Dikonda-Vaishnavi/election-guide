cat > js/app.js << 'EOF'
const SYSTEM_PROMPT = `You are ElectionGuide, a friendly and nonpartisan expert assistant on election processes. Explain elections clearly and simply. Keep answers 3-6 sentences. Never endorse candidates or parties. Default to general/US elections if no country specified. Always be warm and encouraging.`;

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
      document.getElementById('tab-' + tabName).style.display = 'block';
      heroSection.style.display = tabName !== 'chat' ? 'none' : 'block';
    });
  });
}

function initChatInput() {
  document.getElementById('send-btn').addEventListener('click', sendMessage);
  document.getElementById('chat-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
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
  const loader = appendLoader();
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAVUqs7HDl1KU5jCvSAZ7LdkJt18-KybWI', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: text }] }],
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }
      })
    });
    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
    loader.remove();
    appendMessage(reply, 'bot');
  } catch (error) {
    console.error(error);
    loader.remove();
    appendMessage('Sorry, something went wrong. Please try again.', 'bot');
  } finally {
    sendBtn.disabled = false;
  }
}

function appendMessage(text, role) {
  const chatArea = document.getElementById('chat-area');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'msg ' + role + '-msg';
  const avatar = document.createElement('div');
  avatar.className = 'avatar ' + (role === 'bot' ? 'bot-av' : 'user-av');
  avatar.textContent = role === 'bot' ? '🗳' : '👤';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  bubble.innerHTML = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>') + '<div class="msg-time">' + time + '</div>';
  msgDiv.appendChild(avatar);
  msgDiv.appendChild(bubble);
  chatArea.appendChild(msgDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function appendLoader() {
  const chatArea = document.getElementById('chat-area');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'msg bot-msg';
  msgDiv.innerHTML = '<div class="avatar bot-av">🗳</div><div class="bubble"><div class="loading-dots"><span></span><span></span><span></span></div></div>';
  chatArea.appendChild(msgDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
  return msgDiv;
}

function quickAsk(question) {
  document.querySelector('.nav-btn[data-tab="chat"]').click();
  document.getElementById('chat-input').value = question;
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
    dot.className = 'tl-dot ' + phase.dot;
    spine.appendChild(dot);
    if (index < ELECTION_PHASES.length - 1) {
      const line = document.createElement('div');
      line.className = 'tl-line';
      spine.appendChild(line);
    }
    const card = document.createElement('div');
    card.className = 'tl-card';
    card.tabIndex = 0;
    card.innerHTML = '<div class="tl-meta"><span class="tl-phase">' + phase.phase + '</span><span class="tl-date">' + phase.date + '</span></div><div class="tl-title">' + phase.title + '</div><div class="tl-body"><p>' + phase.detail + '</p><button class="tl-ask-btn">Ask AI about this</button></div>';
    card.addEventListener('click', () => card.classList.toggle('open'));
    card.querySelector('.tl-ask-btn').addEventListener('click', (e) => { e.stopPropagation(); quickAsk(phase.ask); });
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
    card.innerHTML = '<div class="g-term">' + item.term + '</div><div class="g-def">' + item.def + '</div>';
    card.addEventListener('click', () => quickAsk('Explain "' + item.term + '" in plain language with a real-world example related to elections.'));
    grid.appendChild(card);
  });
}

function filterGlossary(query) {
  document.querySelectorAll('.g-card').forEach(card => {
    const match = card.querySelector('.g-term').textContent.toLowerCase().includes(query.toLowerCase()) || card.querySelector('.g-def').textContent.toLowerCase().includes(query.toLowerCase());
    card.style.display = match ? '' : 'none';
  });
}

function buildQuiz() {
  quizState = { index: 0, score: 0, answered: false };
  renderQuestion();
}

function renderQuestion() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';
  if (quizState.index >= QUIZ_QUESTIONS.length) { renderScore(); return; }
  const qData = QUIZ_QUESTIONS[quizState.index];
  const card = document.createElement('div');
  card.className = 'quiz-card';
  card.innerHTML = '<div class="quiz-progress">Question ' + (quizState.index + 1) + ' of ' + QUIZ_QUESTIONS.length + '</div><div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + Math.round((quizState.index / QUIZ_QUESTIONS.length) * 100) + '%"></div></div><div class="quiz-q">' + qData.q + '</div><div class="quiz-opts" id="quiz-opts-container"></div><div class="quiz-exp" id="quiz-exp" style="display:none">' + qData.exp + '</div>';
  container.appendChild(card);
  qData.opts.forEach((optText, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = optText;
    btn.addEventListener('click', () => checkAnswer(i));
    document.getElementById('quiz-opts-container').appendChild(btn);
  });
}

function checkAnswer(selectedIdx) {
  if (quizState.answered) return;
  quizState.answered = true;
  const qData = QUIZ_QUESTIONS[quizState.index];
  const buttons = document.querySelectorAll('.quiz-opt');
  buttons.forEach(btn => btn.disabled = true);
  if (selectedIdx === qData.ans) { buttons[selectedIdx].classList.add('correct'); quizState.score++; }
  else { buttons[selectedIdx].classList.add('wrong'); buttons[qData.ans].classList.add('correct'); }
  document.getElementById('quiz-exp').style.display = 'block';
  setTimeout(() => { quizState.index++; quizState.answered = false; renderQuestion(); }, 2500);
}

function renderScore() {
  const container = document.getElementById('quiz-container');
  let msg = "Keep learning — explore the Timeline and Glossary tabs.";
  if (quizState.score === 5) msg = "Perfect score! You are an election expert!";
  else if (quizState.score >= 3) msg = "Great work! You have a solid understanding of elections.";
  container.innerHTML = '<div class="quiz-card quiz-score-screen"><div class="quiz-score-num">' + quizState.score + '/' + QUIZ_QUESTIONS.length + '</div><div class="quiz-score-label">' + msg + '</div><button class="quiz-retake" onclick="buildQuiz()">Retake Quiz</button></div>';
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initChatInput();
  buildTimeline();
  buildGlossary();
  buildQuiz();
});
EOF