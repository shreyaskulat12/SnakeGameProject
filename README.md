<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body> 
    <div class="game-container">
        <div id="countdown"></div>
        <canvas id="gameCanvas"></canvas>
        <div class="controls">
            <label for="speedControl">Speed: <span id="speedDisplay">5</span></label>
            <input type="range" id="speedControl" min="1" max="10" value="5">
            <button id="startBtn">Start Game</button>
            <button id="pauseBtn">Pause Game</button>
            <button id="restartBtn">Restart Game</button>
            <p>Score: <span id="score">0</span></p>
        </div>
    </div>
    <audio id="gameOverSound" src="gameOverSound.wav"></audio>
    <audio id="biteSound" src="biteSound.mp3"></audio>
    <audio id="startSound" src="startSound.mp3"></audio>
    <audio id="pauseSound" src="pauseSound.mp3"></audio>
    <audio id="restartSound" src="restartSound.mp3"></audio>
    <script src="script.js"></script>
</body>
</html>
