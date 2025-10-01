const express = require('express');
const path = require('path');
const app = express();

// Set the port
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route for the main game page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to get game stats (optional feature)
app.get('/api/stats', (req, res) => {
    res.json({
        message: 'Tic Tac Toe Game Server',
        version: '1.0.0',
        features: [
            'Classic 3x3 grid gameplay',
            'Score tracking',
            'Responsive design',
            'Win detection',
            'Draw detection',
            'Game reset functionality'
        ]
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Start the server
app.listen(PORT, () => {
    console.log('🎮 Tic Tac Toe Game Server Started!');
    console.log(`🌐 Server running at: http://localhost:${PORT}`);
    console.log(`📱 Open your browser and navigate to the URL above`);
    console.log(`⚡ Press Ctrl+C to stop the server`);
    console.log('');
    console.log('🎯 Game Features:');
    console.log('   • Interactive 3x3 game board');
    console.log('   • Real-time score tracking');
    console.log('   • Responsive mobile-friendly design');
    console.log('   • Winning animations and confetti effects');
    console.log('   • Game reset and score reset options');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down Tic Tac Toe server...');
    console.log('Thanks for playing! 🎮');
    process.exit(0);
});