# 🎮 Tic Tac Toe Game

A fun and interactive Tic Tac Toe game built with HTML, CSS, JavaScript, and Node.js!

## ✨ Features

- **Interactive 3x3 Game Board**: Click to place X and O
- **Score Tracking**: Keeps track of wins and draws
- **Responsive Design**: Works on desktop and mobile devices
- **Win Detection**: Automatically detects winning patterns
- **Animations**: Smooth animations and confetti effects on wins
- **Game Controls**: Reset game and reset score buttons
- **Beautiful UI**: Modern gradient design with hover effects

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation & Running

1. **Navigate to the game directory:**
   ```bash
   cd tic-tac-toe
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## 🎯 How to Play

1. The game starts with Player X
2. Click on any empty cell to place your mark
3. Players alternate turns (X and O)
4. First player to get 3 in a row (horizontally, vertically, or diagonally) wins!
5. If all cells are filled without a winner, it's a draw
6. Use "Reset Game" to start a new game
7. Use "Reset Score" to clear the scoreboard

## 🛠️ Development

For development with auto-reload:
```bash
npm run dev
```

## 📁 Project Structure

```
tic-tac-toe/
├── index.html      # Main HTML file
├── style.css       # CSS styling
├── script.js       # Game logic
├── server.js       # Express server
├── package.json    # Dependencies and scripts
└── README.md       # This file
```

## 🎨 Game Features

- **Smart Win Detection**: Checks all possible winning combinations
- **Visual Feedback**: Highlights winning cells with animations
- **Score Persistence**: Tracks wins and draws during the session
- **Mobile Responsive**: Optimized for all screen sizes
- **Confetti Effect**: Celebrates wins with animated confetti
- **Smooth Animations**: CSS transitions for better user experience

## 🌐 API Endpoints

- `GET /` - Main game page
- `GET /api/stats` - Game statistics and information
- `GET /health` - Health check endpoint

## 🎪 Fun Extras

- Console logs with game instructions
- Confetti animation on wins
- Smooth hover effects on cells
- Gradient backgrounds and modern styling
- Responsive design for mobile play

## 📝 License

MIT License - Feel free to modify and distribute!

---

**Enjoy playing Tic Tac Toe! 🎉**