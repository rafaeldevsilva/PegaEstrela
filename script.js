// script.js
let score = 0;
let time = 30;
let gameInterval;
let highscore = localStorage.getItem('highscore') || 0;  // Pega o recorde do localStorage, se existir

const scoreSpan = document.getElementById('score');
const timeSpan = document.getElementById('time');
const gameArea = document.getElementById('game-area');
const startButton = document.getElementById('start-button');
const highscoreSpan = document.getElementById('highscore');
const currentScoreSpan = document.getElementById('current-score');

highscoreSpan.textContent = highscore; // Atualiza a tabela com o recorde

function startGame() {
  score = 0;
  time = 30;
  scoreSpan.textContent = score;
  timeSpan.textContent = time;
  startButton.disabled = true;

  // Gera estrelas aleatoriamente
  gameInterval = setInterval(() => {
    if (time <= 0) {
      endGame();
      return;
    }

    time--;
    timeSpan.textContent = time;

    // Adiciona uma estrela no jogo
    createStar();
  }, 1000);
}

function endGame() {
  clearInterval(gameInterval);

  // Verifica se a pontuação atual é maior que o recorde
  if (score > highscore) {
    highscore = score;
    localStorage.setItem('highscore', highscore);  // Atualiza o recorde no localStorage
    highscoreSpan.textContent = highscore;  // Atualiza a tabela com o novo recorde
  }

  currentScoreSpan.textContent = score;  // Atualiza a tabela com a pontuação atual
  startButton.disabled = false;
}

function createStar() {
  const star = document.createElement('div');
  star.className = 'star';

  // Posição aleatória
  const x = Math.random() * (gameArea.clientWidth - 30);
  const y = Math.random() * (gameArea.clientHeight - 30);

  star.style.left = `${x}px`;
  star.style.top = `${y}px`;

  // Clique na estrela
  star.addEventListener('click', () => {
    score++;
    scoreSpan.textContent = score;
    star.remove();
  });

  // Remove a estrela após 1.5s
  setTimeout(() => star.remove(), 1500);

  gameArea.appendChild(star);
}

startButton.addEventListener('click', startGame);

// script.js
const resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', () => {
  localStorage.removeItem('highscore');  // Remove o recorde do localStorage
  highscore = 0;                        // Reseta o recorde na variável
  highscoreSpan.textContent = highscore; // Atualiza o valor na tabela
  alert('Recorde reiniciado com sucesso!');
});
