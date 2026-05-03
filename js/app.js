// Tab Logic
const navButtons = document.querySelectorAll('nav button');
const tabPanels = document.querySelectorAll('.tab-panel');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all
    navButtons.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.style.display = 'none');
    
    // Add active to clicked
    btn.classList.add('active');
    const tabId = btn.getAttribute('data-tab');
    const tabElement = document.getElementById(`tab-${tabId}`);
    if (tabElement) {
        tabElement.style.display = 'block';
    }
  });
});

// Render Timeline
const timelineContainer = document.getElementById('timeline-container');
if (timelineContainer && typeof ELECTION_PHASES !== 'undefined') {
    ELECTION_PHASES.forEach(phase => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-date">${phase.date}</div>
        <div class="timeline-dot" style="background-color: ${phase.dot}"></div>
        <div class="timeline-content">
          <h3>${phase.title}</h3>
          <p>${phase.detail}</p>
          <button class="ask-btn" style="margin-top:0.5rem; background:none; border:none; color:var(--primary); cursor:pointer; text-decoration:underline;">
            Ask: ${phase.ask}
          </button>
        </div>
      `;
      timelineContainer.appendChild(item);
      
      // Hook up ask button
      item.querySelector('.ask-btn').addEventListener('click', () => {
        const chatTabBtn = document.querySelector('button[data-tab="chat"]');
        if (chatTabBtn) chatTabBtn.click();
        const chatInput = document.getElementById('chat-input');
        if (chatInput) chatInput.value = phase.ask;
        const sendBtn = document.getElementById('send-btn');
        if (sendBtn) sendBtn.click();
      });
    });
}

// Render Glossary
const glossaryContainer = document.getElementById('glossary-container');
if (glossaryContainer && typeof GLOSSARY_TERMS !== 'undefined') {
    GLOSSARY_TERMS.forEach(term => {
      const card = document.createElement('div');
      card.className = 'glossary-card';
      card.innerHTML = `
        <h4>${term.term}</h4>
        <p>${term.def}</p>
      `;
      glossaryContainer.appendChild(card);
    });
}

// Render Quiz
const quizContainer = document.getElementById('quiz-container');
if (quizContainer && typeof QUIZ_QUESTIONS !== 'undefined') {
    QUIZ_QUESTIONS.forEach((qData, index) => {
      const qDiv = document.createElement('div');
      qDiv.className = 'quiz-question';
      
      const optionsHtml = qData.opts.map((opt, i) => `
        <button class="quiz-option" data-qindex="${index}" data-optindex="${i}">${opt}</button>
      `).join('');
    
      qDiv.innerHTML = `
        <h3>${index + 1}. ${qData.q}</h3>
        <div class="quiz-options">
          ${optionsHtml}
        </div>
        <div class="quiz-exp" id="exp-${index}">${qData.exp}</div>
      `;
      quizContainer.appendChild(qDiv);
    });
}

// Quiz Logic
document.querySelectorAll('.quiz-option').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const qIndex = e.target.getAttribute('data-qindex');
    const optIndex = parseInt(e.target.getAttribute('data-optindex'));
    const qData = QUIZ_QUESTIONS[qIndex];
    
    // Disable all options for this question
    const parent = e.target.closest('.quiz-options');
    parent.querySelectorAll('.quiz-option').forEach(b => {
      b.disabled = true;
      if (parseInt(b.getAttribute('data-optindex')) === qData.ans) {
        b.classList.add('correct');
      }
    });

    if (optIndex !== qData.ans) {
      e.target.classList.add('wrong');
    }

    const expElement = document.getElementById(`exp-${qIndex}`);
    if (expElement) expElement.style.display = 'block';
  });
});

// Chat Logic
const chatArea = document.getElementById('chat-area');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const quickChips = document.querySelectorAll('.quick-chips button');

const SYSTEM_PROMPT = "You are a helpful and knowledgeable assistant named ElectionGuide. Answer questions about the election process accurately and concisely.";

async function sendMessage(text) {
  if (!text.trim()) return;

  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.textContent = text;
  if (chatArea) {
      chatArea.appendChild(userMsg);
      chatArea.scrollTop = chatArea.scrollHeight;
  }
  if (chatInput) chatInput.value = '';

  // Add loading message
  const botMsg = document.createElement('div');
  botMsg.className = 'chat-msg bot';
  botMsg.textContent = 'Thinking...';
  if (chatArea) {
      chatArea.appendChild(botMsg);
      chatArea.scrollTop = chatArea.scrollHeight;
  }

  try {
    const API_KEY = 'AIzaSyCVA8Xms6I1t-5EXWROE_2ft-3jmqwkpQ4'; // Using the key from your previous setup
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
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

    if (!response.ok) {
      throw new Error(data.error?.message || `HTTP error! status: ${response.status}`);
    }

    if (data.candidates && data.candidates.length > 0) {
      const reply = data.candidates[0].content.parts[0].text;
      botMsg.innerHTML = reply.replace(/\n/g, '<br>');
    } else {
      throw new Error("No response generated from the model.");
    }
  } catch (error) {
    console.error("Chat Error:", error);
    botMsg.textContent = `Sorry, I couldn't get an answer right now. ${error.message}`;
  }
  
  if (chatArea) {
      chatArea.scrollTop = chatArea.scrollHeight;
  }
}

if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      sendMessage(chatInput.value);
    });
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage(chatInput.value);
      }
    });
}

quickChips.forEach(chip => {
  chip.addEventListener('click', () => {
    sendMessage(chip.textContent);
  });
});
