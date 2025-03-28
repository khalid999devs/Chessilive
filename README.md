# Chessilive (A Chess.com Clone)

## Description

Chessilive is a real-time, web-based chess platform inspired by Chess.com. It allows players to compete in live chess matches, track their progress, and enjoy a seamless multiplayer experience. The system is designed to handle real-time interactions and scale efficiently for a large number of users.

## Demo

![Demo](demo.gif)

## Features

- **Real-time Multiplayer**: Play chess games with friends or random opponents in real-time.
- **User Authentication**: Secure login and registration system.
- **Matchmaking**: Automatically pair players based on their availability.
- **Game History**: View past games and analyze moves.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## System Design

### Software Architecture

- **Frontend**: Built with React.js for a dynamic and responsive user interface.
- **Backend**: Node.js with Express.js for handling API requests and game logic.
- **WebSocket**: Used for real-time communication between players.

### Real-Time System

- WebSocket ensures low-latency communication for real-time gameplay.
- State synchronization between clients and the server ensures consistency.

### Scaling

- Horizontal scaling of the backend using load balancers.
- Caching in server for fast responses.

## File Structure

```
ChessMultiplayer/
│
├── frontend/          # React.js frontend code
├── backend/           # Node.js & Express Js backend code
└── README.md          # Project documentation
```

## How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/khalid999devs/Chessilive.git
   cd Chessilive
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Start the development servers:

   ```bash
   # In one terminal, start the backend
   cd backend
   npm run dev

   # In another terminal, start the frontend
   cd frontend
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.
