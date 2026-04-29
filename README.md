# ElectionGuide

**Vertical**: Civic Education

## Approach and Logic
ElectionGuide is a single-page vanilla web application designed to help users understand the complex electoral process. 

It uses a tabbed navigation system that displays different interactive components:
- **Chat Interface**: Powered by the Gemini 2.0 Flash API to answer any election-related questions dynamically. It includes quick-chips for commonly asked questions.
- **Timeline**: An expandable timeline detailing the 8 major phases of an election. Each phase can be explored, and a direct "Ask AI" button bridges the timeline context to the chatbot.
- **Glossary**: A searchable list of 20 common election terms. Clicking a card automatically asks the AI for more details.
- **Quiz**: A 5-question knowledge check that reinforces learning. Options turn green/red immediately to provide feedback, automatically advancing to the next question.
- **Translate**: Google Translate integration for accessibility.

## How the Solution Works
- The UI is entirely built with HTML and CSS using CSS variables for consistent theming. 
- The javascript is separated into `data.js` containing the constant content arrays, and `app.js` containing the global application logic.
- We utilize vanilla DOM manipulation and string concatenation (no ES Modules or template literals) for maximum compatibility.
- Interaction between components is done via a central `quickAsk()` function which orchestrates moving to the chat tab and initiating a message.

## Assumptions Made
- The app runs in a modern web browser supporting `fetch` and async/await.
- Users have an active internet connection to reach the Gemini API and Google Translate.
- The user is interested in the US Electoral process, as indicated by the content in `data.js`.
