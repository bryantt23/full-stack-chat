# Chat Application Project Requirements

## Version 0: Static HTML Page
**Objective**: Create a simple static HTML page with basic styling.

**Requirements**:
- Set up a basic HTML file with a structure for a chat application.
- Include a CSS file for basic styling.

**Tasks**:
- Create `index.html` with a header, chat window, and input field.
- Create `styles.css` to style the chat window and input field.

## Version 1: Basic React Setup
**Objective**: Set up a React application.

**Requirements**:
- Initialize a React project using Create React App.
- Create basic components for the chat application.

**Tasks**:
- Install `create-react-app` and set up the project.
- Create `Chat` and `Message` components.
- Render a static list of messages in the `Chat` component.

## Version 2: Backend Setup
**Objective**: Set up a Node.js server with Express.

**Requirements**:
- Initialize a Node.js project.
- Set up Express and create basic routes.
- Create a simple API endpoint to fetch messages.

**Tasks**:
- Install Node.js and Express.
- Create a basic Express server in `server.js`.
- Set up a `/api/messages` endpoint that returns a static list of messages.

## Version 3: MongoDB Integration
**Objective**: Integrate MongoDB with the backend.

**Requirements**:
- Set up a MongoDB database.
- Create Mongoose models for chat messages.
- Modify the `/api/messages` endpoint to fetch messages from the database.

**Tasks**:
- Install and set up MongoDB locally or use a cloud service like MongoDB Atlas.
- Install Mongoose and create a `Message` model.
- Update the `/api/messages` endpoint to fetch messages from MongoDB.

## Version 4: Fetch and Display Messages
**Objective**: Fetch messages from the backend and display them in the React app.

**Requirements**:
- Implement API calls in the React app to fetch messages.
- Display the fetched messages in the chat window.

**Tasks**:
- Use `axios` or `fetch` to call the `/api/messages` endpoint in the `Chat` component.
- Update the `Chat` component to render messages fetched from the backend.

## Version 5: Sending Messages
**Objective**: Implement the ability to send messages.

**Requirements**:
- Create an API endpoint to send messages.
- Handle form submission in React to post new messages to the backend.
- Update the chat window in real-time to include new messages.

**Tasks**:
- Create a `/api/messages` POST endpoint to save new messages to MongoDB.
- Add a form in the `Chat` component for sending messages.
- Handle form submission to post new messages to the backend and update the chat window.
