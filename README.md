# ElectionGuide

ElectionGuide is an interactive, AI-powered single-page web application designed to help users understand the democratic process, from primaries to vote certification. Built for the Virtual-PromptWars Hackathon · Challenge 2.

## Chosen Vertical
**Civic Education / Public Information Assistant**

## Approach & Logic
- **Architecture**: A pure Vanilla JavaScript, CSS, and HTML static single-page application. No build steps or complex frameworks ensure maximum portability and ease of setup.
- **AI Integration**: The app connects directly to the Anthropic Claude API to power a conversational agent. The system prompt is heavily scoped to force concise, nonpartisan explanations limited to election processes.
- **Components**: The app offers five main views—an AI chat, a visual timeline, a searchable glossary, a quiz, and a translation hub. This structure breaks down complex information into various learning modalities.
- **Security Decisions**: User inputs are heavily sanitized by escaping HTML entities before injection into the DOM to prevent Cross-Site Scripting (XSS). Note: In a production environment, API keys should be hidden behind a backend proxy to prevent exposure.

## How the Solution Works

### File Structure
| Path | Description |
|------|-------------|
| `index.html` | The single page layout housing the header, hero, and all tab panels. |
| `css/style.css` | Design specifications, CSS variables, animations, and responsive layout. |
| `js/data.js` | Global constants holding all static data: election phases, glossary terms, and quiz questions. |
| `js/app.js` | Application logic governing navigation, chat functionality, DOM generation, and the quiz engine. |
| `README.md` | Project documentation. |

### Features
| Feature | Details |
|---------|---------|
| **AI Assistant** | Conversational chat interface powered by Claude. Includes quick-question chips for easy use. |
| **Interactive Timeline** | Expandable cards detailing the 8 major election phases, connected directly to the AI for deeper questions. |
| **Searchable Glossary** | Grid of 20 key election terms that filter instantly and can be queried to the AI. |
| **Knowledge Quiz** | A 5-question automated quiz testing user comprehension with instant feedback. |
| **Language Translation** | Built-in Google Translate integration for widespread accessibility. |

### Tech Stack
- **HTML5**
- **Vanilla CSS3** (CSS Variables, Flexbox, Grid, Animations)
- **Vanilla JavaScript** (ES6+, Fetch API, DOM Manipulation)
- **Anthropic API** (Claude 3.5 Sonnet)
- **Google Services** (Google Translate Widget, Google Fonts: Playfair Display & DM Sans)

## Assumptions Made
- **Deployment**: The app is designed to be hosted as a static site (e.g., GitHub Pages, Netlify).
- **API Key**: The Anthropic API call is mocked or assumes that the key is handled at the platform level (via proxy or header injection in production) to meet the "no API key hardcoded" requirement while working entirely from the browser.
- **Browser**: The user is accessing the site via a modern web browser supporting ES6, CSS variables, and the Fetch API.

## Accessibility
- **Semantic HTML**: Proper use of `<header>`, `<main>`, `<section>`, and `<nav>`.
- **Keyboard Navigation**: All interactive elements (timeline cards, glossary terms, quiz options) are accessible via the `Tab` key and triggerable using `Enter` or `Space`.
- **Focus Indicators**: Explicit `:focus-visible` outlines defined globally to assist users navigating with a keyboard.
- **ARIA Attributes**: Use of `role="button"`, `aria-expanded`, and `aria-label` to provide context to screen readers.
- **Screen Reader Text**: Utility class `.sr-only` is provided for visually hidden context.

## Running Locally
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/election-guide.git
   ```
2. Navigate to the project directory:
   ```bash
   cd election-guide
   ```
3. Open `index.html` in your preferred web browser. No server is required!

## Testing
To verify the application functions properly, perform the following manual test steps:
1. **Navigation**: Click each tab (Ask, Timeline, Glossary, Quiz, Translate) and verify the active panel changes and the Hero section hides appropriately.
2. **Chat Tab**: Type a message and hit "Send" or the "Enter" key. Observe the API call process (loading dots appear, button disables). Click a quick-question chip and verify it auto-sends.
3. **Timeline Tab**: Click a card to expand the explanation. Click "Ask AI about this ↗" and verify it switches to the chat tab and submits the question.
4. **Glossary Tab**: Type in the search box to verify real-time filtering of the term cards. Click a term and verify it asks the AI for a plain language explanation.
5. **Quiz Tab**: Click an answer for each question. Verify it highlights correctly/incorrectly, provides an explanation, and auto-advances after 2.5 seconds. Check the final score message.
6. **Translate Tab**: Select a language from the Google Translate widget and verify the page content translates.
