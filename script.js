class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = {
            X: 0,
            O: 0,
            draws: 0
        };

        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        this.initializeGame();
    }

    initializeGame() {
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerElement = document.getElementById('current-player');
        this.gameStatusElement = document.getElementById('game-status');
        this.resetGameButton = document.getElementById('reset-game');
        this.resetScoreButton = document.getElementById('reset-score');

        // Score elements
        this.xWinsElement = document.getElementById('x-wins');
        this.oWinsElement = document.getElementById('o-wins');
        this.drawsElement = document.getElementById('draws');

        this.bindEvents();
        this.updateDisplay();
    }

    bindEvents() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });

        this.resetGameButton.addEventListener('click', () => this.resetGame());
        this.resetScoreButton.addEventListener('click', () => this.resetScore());
    }

    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }

        this.makeMove(index);
    }

    makeMove(index) {
        this.board[index] = this.currentPlayer;
        this.updateCellDisplay(index);

        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
    }

    updateCellDisplay(index) {
        const cell = this.cells[index];
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
    }

    checkWin() {
        return this.winningConditions.some(condition => {
            const [a, b, c] = condition;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winningCells = condition;
                return true;
            }
            return false;
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.highlightWinningCells();
        this.gameStatusElement.textContent = `Player ${this.currentPlayer} Wins! 🎉`;
        this.gameStatusElement.className = 'game-status win';
        this.updateScoreDisplay();
    }

    handleDraw() {
        this.gameActive = false;
        this.scores.draws++;
        this.gameStatusElement.textContent = 'It\'s a Draw! 🤝';
        this.gameStatusElement.className = 'game-status draw';
        this.updateScoreDisplay();
    }

    highlightWinningCells() {
        this.winningCells.forEach(index => {
            this.cells[index].classList.add('winning');
        });
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentPlayerElement.textContent = this.currentPlayer;
        this.currentPlayerElement.style.color = this.currentPlayer === 'X' ? '#e53e3e' : '#3182ce';
    }

    updateScoreDisplay() {
        this.xWinsElement.textContent = this.scores.X;
        this.oWinsElement.textContent = this.scores.O;
        this.drawsElement.textContent = this.scores.draws;
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningCells = null;

        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });

        this.gameStatusElement.textContent = '';
        this.gameStatusElement.className = 'game-status';
        this.updateDisplay();
    }

    resetScore() {
        this.scores = {
            X: 0,
            O: 0,
            draws: 0
        };
        this.updateScoreDisplay();
    }

    // Add some randomness for computer player (optional feature)
    makeRandomMove() {
        const emptyCells = this.board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
        if (emptyCells.length > 0) {
            const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.makeMove(randomIndex);
        }
    }
}

// Add some fun animations and effects
function addConfetti() {
    // Simple confetti effect (you can enhance this)
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.borderRadius = '50%';

            document.body.appendChild(confetti);

            const fallDuration = Math.random() * 3000 + 2000;
            confetti.animate([
                { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
            ], {
                duration: fallDuration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            setTimeout(() => {
                if (document.body.contains(confetti)) {
                    document.body.removeChild(confetti);
                }
            }, fallDuration);
        }, i * 100);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new TicTacToe();

    // Add confetti effect on wins
    const originalHandleWin = game.handleWin.bind(game);
    game.handleWin = function () {
        originalHandleWin();
        addConfetti();
    };

    console.log('🎮 Tic Tac Toe Game Loaded!');
    console.log('📋 Game Rules:');
    console.log('   • Players take turns placing X and O');
    console.log('   • First to get 3 in a row wins');
    console.log('   • Click Reset Game to play again');
    console.log('   • Click Reset Score to clear the scoreboard');
});