let isGameRunning = false;
let didBombHit = false;
let bombsAway = 0;
let secondsDelay = 7000;
const bombArray = [];
const shipArray = [];
const screenWidth = window.screen.availWidth;
const screenHeight = window.screen.availHeight;
const message = document.getElementById('message');
const timerDiv = document.getElementById('timer');
const buttonDiv = document.getElementById('buttons');
const instructionsDiv = document.getElementById('instructions');
const resetButton = document.getElementById('reset');
const instructions = document.createElement('p');

//Start Button
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', () => {
  console.log('game started');
  buttonDiv.removeChild(startButton);

  instructions.className = 'message';
  instructions.innerHTML = '<p>Position your ships</p>';
  instructionsDiv.append(instructions);

  isGameRunning = true;
  displayShips(5);
  gameLoop();
});

const displayShips = (numOfShips) => {
  let x = screenWidth / numOfShips;
  let y = screenHeight / 2;
  for (let i = 0; i < numOfShips; i++) {
    let ship = window.open(
      'ship.html',
      '',
      `width=100,height=125,left=${x},top=${y}`
    );
    shipArray.push(ship);
    x += 180;
  }
};

function gameLoop() {
  if (isGameRunning && bombsAway < 1) {
    countDown();
    setTimeout(fireBomb, secondsDelay);
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
        instructions.innerHTML = '<p>I hit your ship!</p>';
        isGameRunning = false;
      }
    }
  }

  if (!isGameRunning) {
    let resetWindow = window.open(
      'reset.html',
      '',
      `width=100,height=100,left=0,top=0`
    );
    resetWindow.addEventListener('click', () => {
      closeAllWindows(shipArray);
      closeAllWindows(bombArray);
      resetWindow.close();
    });
  }
  if (isGameRunning) {
    requestAnimationFrame(gameLoop);
  }
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

//countdown to bomb time!
const countDown = () => {
  let timerWindow = window.open(
    'timer.html',
    '',
    `top=0,left=0,width=100,height=100`
  );

  let seconds = secondsDelay / 1000;
  timerWindow.onload = function () {
    timerWindow.document.getElementById('timer').innerText = seconds;
  };
  const timer = setInterval(() => {
    if (seconds > 0) {
      seconds -= 1;

      timerWindow.document.getElementById('timer').innerText = seconds;
    }
    if (seconds === 0) {
      clearInterval(timer);
      timerWindow.close();
      isGameRunning = false;
    }
  }, 1000);
};

//closes all open windows
function closeAllWindows(windowArray) {
  for (const window in windowArray) {
    windowArray[window].close();
  }
}
