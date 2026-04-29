cat > js/app.js << 'ENDOFFILE'
const SYSTEM_PROMPT = "You are ElectionGuide, a friendly nonpartisan expert on elections. Explain clearly in 3-6 sentences. Never endorse candidates or parties.";
let quizState = { index: 0, score: 0, answered: false };
function initNavigation() {
  const navBtns = document.querySelectorAll(".nav-btn");
  const panels = document.querySelectorAll(".tab-panel");
  const hero = document.getElementById("hero-section");
  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      navBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.getAttribute("data-tab");
      panels.forEach(p => p.style.display = "none");
      document.getElementById("tab-" + tab).style.display = "block";
      hero.style.display = tab !== "chat" ? "none" : "block";
    });
  });
}
ENDOFFILE