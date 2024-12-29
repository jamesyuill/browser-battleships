let isGameRunning = false;
let didBombHit = false;
let bombsAway = 0;
const bombArray = [];
const shipArray = [];
const screenWidth = window.screen.availWidth;
const screenHeight = window.screen.availHeight;
const message = document.getElementById('message');

//Start Button
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', () => {
  console.log('game started');
  isGameRunning = true;
  displayShips(5);
  gameLoop();
});

const displayShips = (numOfShips) => {
  for (let i = 0; i < numOfShips; i++) {
    let x = Math.random() * screenWidth - 200;
    let y = Math.random() * screenHeight - 200;
    let ship = window.open(
      'ship.html',
      '',
      `width=100,height=125,left=${x},top=${y}`
    );
    shipArray.push(ship);
  }
};

function gameLoop() {
  if (isGameRunning && bombsAway < 1) {
    countDown();
    setTimeout(fireBomb, 5000);
    bombsAway++;
  }

  for (let i = 0; i < shipArray.length; i++) {
    let shipX = shipArray[i].screenX;
    let shipY = shipArray[i].screenY;
    let ship = { x: shipX, y: shipY };
    if (bombArray.length) {
      let bomb = { x: bombArray[0].screenX, y: bombArray[0].screenY };
      const isAHit = doesBombIntersect(ship, bomb);
      if (isAHit) {
        message.innerText = 'I hit your ship!';
      }
    }
  }

  requestAnimationFrame(gameLoop);
}

function fireBomb() {
  let x = Math.random() * screenWidth - 200;
  let y = Math.random() * screenHeight - 200;
  let bomb = window.open(
    'bomb.html',
    '',
    `width=100,height=125,left=${x},top=${y}`
  );
  bombArray.push(bomb);
}

//function for does Bomb intersect
const doesBombIntersect = (shipPos, bombPos) => {
  const { x: shipX, y: shipY } = shipPos;
  const { x: bombX, y: bombY } = bombPos;

  let intersectingOnX = false;
  let intersectingOnY = false;

  if (
    (bombX > shipX && bombX < shipX + 146) ||
    (bombX + 146 > shipX && bombX + 146 < shipX + 146)
  ) {
    intersectingOnX = true;
  } else {
    intersectingOnX = false;
  }

  if (
    (bombY > shipY && bombY < shipY + 170) ||
    (bombY + 170 > shipY && bombY + 170 < shipY + 170)
  ) {
    intersectingOnY = true;
  } else {
    intersectingOnY = false;
  }

  if (intersectingOnX && intersectingOnY) {
    console.log('we have a hit bitch!');
    return true;
  } else {
    return false;
  }
};

const countDown = () => {
  let seconds = 5;

  const timer = setInterval(() => {
    if (seconds > 0) {
      seconds -= 1;
      message.innerText = seconds;
    }
    if (seconds === 0) {
      clearInterval(timer);
      message.innerText = "You're lucky this time!";
    }
  }, 1000);
};
