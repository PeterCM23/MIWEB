const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const pokeball = {
  x: 50,
  y: canvas.height / 2,
  size: 20,
  speedY: 0,
};

const gravity = 0.4;
let jumpForce = -8;
let pipeSpeed = 0; // Velocidad inicial de los tubos
let pipeGap = 200; // Gap inicial entre tubos
let pipeWidth = 50; // Ancho inicial de los tubos
let score = 0;
let isGameStarted = false;
let frames = 0;

const pipes = [];

function calculateJumpForce(score) {
  return -8 + score / 500; // Aumentamos 0.1 en la velocidad de salto por cada 500 puntos
}

canvas.addEventListener("click", () => {
  pokeball.speedY = jumpForce;
});

document.getElementById("start-button").addEventListener("click", startGame);

function increaseScore() {
  score++;
  jumpForce = calculateJumpForce(score);
  pipeSpeed += 0.02; // Incrementamos la velocidad de los tubos en 0.02 por cada punto
}

function generatePipes() {
  const pipeY = Math.random() * (canvas.height - pipeGap);

  pipes.push({
    x: canvas.width,
    y: pipeY,
    height: canvas.height - pipeY,
  });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pokeball.speedY += gravity;
  pokeball.y += pokeball.speedY;

  if (pokeball.y < 0 || pokeball.y > canvas.height - pokeball.size) {
    gameOver();
  }

  if (isGameStarted) {
    // Generar nuevos tubos cada cierto tiempo
    if (frames % 120 === 0) {
      generatePipes();
    }

    // Mover los tubos hacia la izquierda con la velocidad pipeSpeed
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].x -= pipeSpeed;

      if (pipes[i].x + pipeWidth < 0) {
        pipes.splice(i, 1);
      }
    }

    checkCollisions();
    drawPokeball();
    drawPipes();
    drawScore();
    increaseScore();
  }

  frames++;

  requestAnimationFrame(update);
}

const pokeballImage = new Image();
pokeballImage.src = "assets/images/flappy/Poké_Ball_icon.svg.png";
pokeballImage.onload = startGame;

function drawPokeball() {
  ctx.drawImage(
    pokeballImage,
    pokeball.x,
    pokeball.y,
    pokeball.size,
    pokeball.size
  );
}

function drawPipes() {
  for (const pipe of pipes) {
    ctx.fillStyle = "green";
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y);
    ctx.fillRect(pipe.x, pipe.y + pipeGap, pipeWidth, pipe.height);
  }
}

function checkCollisions() {
  if (pokeball.y + pokeball.size > canvas.height) {
    gameOver();
  }

  for (const pipe of pipes) {
    if (
      pokeball.x + pokeball.size > pipe.x &&
      pokeball.x < pipe.x + pipeWidth &&
      (pokeball.y < pipe.y || pokeball.y + pokeball.size > pipe.y + pipeGap)
    ) {
      gameOver();
    }
  }
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText("Puntuación: " + score, 10, 30);
}

const imagenFinal = new Image();
imagenFinal.src = "assets/images/flappy/980846.jpg";

function fadeInAnimation() {
  let alpha = 0;

  function animate() {
    alpha += 0.02;
    tempCtx.clearRect(0, 0, canvas.width, canvas.height);
    tempCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    tempCtx.fillRect(0, 0, canvas.width, canvas.height);

    tempCtx.globalAlpha = alpha;
    tempCtx.drawImage(imagenFinal, 0, 0, canvas.width, canvas.height);
    tempCtx.globalAlpha = 1;

    ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);

    if (alpha < 1) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

function gameOver() {
  isGameStarted = false;

  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext("2d");

  fadeInAnimation();
}

function startGame() {
  isGameStarted = true;
  document.getElementById("welcome").style.display = "none";
  document.getElementById("main-content").style.display = "block";
  canvas.style.display = "block";

  // Ajustar el tamaño del canvas al 100% del viewport
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Ajustar el tamaño del pájaro y otros elementos según el tamaño del canvas
  pokeball.size = 20 * (canvas.width / 800);
  pipeGap = 200 * (canvas.width / 800);
  pipeWidth = 50 * (canvas.width / 800);

  // Iniciar el juego
  requestAnimationFrame(update);
}

// Actualizar el tamaño del canvas cuando se redimensione la ventana
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Ajustar el tamaño del pájaro y otros elementos según el tamaño del canvas
  pokeball.size = 20 * (canvas.width / 800);
  pipeGap = 200 * (canvas.width / 800);
  pipeWidth = 50 * (canvas.width / 800);
});
