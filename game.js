const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const blockCharacter = {
  x: 50,
  y: canvas.height - 50,
  width: 32,
  height: 32,
  speed: 5,
  velocityY: 0,
  onGround: false
};

const gravity = 0.5;
const jumpAcceleration = 10;

const redBlocks = [];
const redBlockWidth = 32;
const redBlockHeight = 32;
const redBlockSpeed = 3;

function drawBlockCharacter() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(blockCharacter.x, blockCharacter.y, blockCharacter.width, blockCharacter.height);
}

function updateBlockCharacter(deltaTime) {
  if (blockCharacter.onGround) {
    if (keyPressed(38)) {
      blockCharacter.velocityY -= jumpAcceleration * deltaTime;
      blockCharacter.onGround = false;
    }
  }

  blockCharacter.velocityY += gravity * deltaTime;
  blockCharacter.y += blockCharacter.velocityY * deltaTime;

  if (blockCharacter.y + blockCharacter.height > canvas.height) {
    blockCharacter.y = canvas.height - blockCharacter.height;
    blockCharacter.velocityY = 0;
    blockCharacter.onGround = true;
  }

  function keyPressed(keyCode) {
    return (keyCode >= 37 && keyCode <= 40) && (keyCode === 38 && blockCharacter.onGround);
  }
}

function drawRedBlocks() {
  ctx.fillStyle = 'red';
  for (let i = 0; i < redBlocks.length; i++) {
    const redBlock = redBlocks[i];
    ctx.fillRect(redBlock.x, redBlock.y, redBlockWidth, redBlockHeight);
  }
}

function updateRedBlocks() {
  for (let i = 0; i < redBlocks.length; i++) {
    const redBlock = redBlocks[i];
    redBlock.x += redBlockSpeed;

    if (redBlock.x + redBlockWidth < 0) {
      redBlock.x = canvas.width;
      redBlock.y = Math.floor(Math.random() * (canvas.height - redBlockHeight));
    }

    if (collide(blockCharacter, redBlock)) {
      console.log('Collision!');
    }
  }

  function collide(a, b) {
    return (a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y);
  }
}

function main() {
  const deltaTime = 1 / 60; // assuming 60 FPS

  updateBlockCharacter(deltaTime);
  updateRedBlocks();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBlockCharacter();
  drawRedBlocks();

  requestAnimationFrame(main);
}

main();

function createRedBlock() {
  redBlocks.push({
    x: canvas.width,
    y: Math.floor(Math.random() * (canvas.height - redBlockHeight))
  });
}

setInterval(createRedBlock, 1000);
