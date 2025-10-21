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

// Particles System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.getElementById('particles');
        this.init();
    }

    init() {
        // Create continuous floating particles
        setInterval(() => {
            if (this.particles.length < 15) {
                this.createParticle();
            }
        }, 800);

        // Clean up old particles
        setInterval(() => {
            this.cleanupParticles();
        }, 1000);
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size between 2-8px
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';

        // Random colors (cyan, pink, yellow)
        const colors = ['rgba(0, 255, 255, 0.6)', 'rgba(255, 107, 107, 0.6)', 'rgba(255, 255, 0, 0.6)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        // Random animation duration
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';

        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    cleanupParticles() {
        this.particles = this.particles.filter(particle => {
            if (!particle.parentNode) {
                return false;
            }
            return true;
        });
    }

    createWinExplosion(cellElement) {
        const rect = cellElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';

            const angle = (i * 30) * Math.PI / 180;
            const distance = 50 + Math.random() * 30;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;

            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.animationDelay = (i * 0.1) + 's';

            document.body.appendChild(sparkle);

            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new TicTacToe();
    const particles = new ParticleSystem();

    // Add sparkle effects on wins
    const originalHandleWin = game.handleWin.bind(game);
    game.handleWin = function () {
        originalHandleWin();

        // Create explosion effect on winning cells
        this.winningConditions.forEach(condition => {
            if (condition.every(index => this.board[index] === this.currentPlayer)) {
                condition.forEach(index => {
                    const cell = this.cells[index];
                    particles.createWinExplosion(cell);
                });
            }
        });
    };

    // Add sound effect simulation (visual feedback)
    const originalHandleCellClick = game.handleCellClick.bind(game);
    game.handleCellClick = function (index) {
        originalHandleCellClick(index);

        // Add ripple effect
        const cell = this.cells[index];
        if (cell.textContent && !cell.classList.contains('winning')) {
            cell.style.transform = 'scale(1.1)';
            setTimeout(() => {
                cell.style.transform = '';
            }, 200);
        }
    };

    console.log('✨ Neon Tic Tac Toe Game Loaded!');
    console.log('🎮 Enhanced with particles and animations');
    console.log('📋 Game Rules:');
    console.log('   • Players take turns placing X and O');
    console.log('   • First to get 3 in a row wins');
    console.log('   • Enjoy the neon glow effects!');
});