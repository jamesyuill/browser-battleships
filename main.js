let isGameRunning = false;
let didBombHit = false;
let bombsAway = 0;
const bombArray = [];
const shipArray = [];
const screenWidth = window.screen.availWidth;
const screenHeight = window.screen.availHeight;
const message = document.getElementById('message');
const buttonDiv = document.getElementById('buttons');
const instructionsDiv = document.getElementById('instructions');
const resetButton = document.getElementById('reset');

//Start Button
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', () => {
  console.log('game started');
  buttonDiv.removeChild(startButton);

  const instructions = document.createElement('p');
  instructions.className = 'message';
  instructions.innerHTML = '<p>Position your ships</p>';
  instructionsDiv.append(instructions);

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
        isGameRunning = false;
      }
    }
  }

  if (!isGameRunning) {
    let resetWindow = window.open(
      'reset.html',
      '',
      `width=200,height=200,left=${screenWidth / 2},top=${screenHeight / 2}`
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
  let seconds = 5;

  const timer = setInterval(() => {
    if (seconds > 0) {
      seconds -= 1;
      message.innerText = seconds;
    }
    if (seconds === 0) {
      clearInterval(timer);
      message.innerText = "You're lucky this time!";
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
