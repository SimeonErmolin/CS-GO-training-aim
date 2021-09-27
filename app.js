const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list');
const timeElement = document.querySelector('#time');
const board = document.querySelector('#board');
const restart = document.querySelector('#restart');
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
})

restart.addEventListener('click', () => location.reload());

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  // setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    let seconds = current % 60;
    let minutes = current / 60 % 60;

    if (minutes < 10 && seconds < 10) {
      current = `0${Math.trunc(minutes)}:0${seconds}`;
    } else if (minutes < 10) {
      current = `0${Math.trunc(minutes)}:${seconds}`;
    } else if (seconds < 10) {
      current = `${Math.trunc(minutes)}:0${seconds}`;
    }else {
      current = `${Math.trunc(minutes)}:${seconds}`;
    }


    setTime(current)
  }
}

function setTime(value) {
  timeElement.innerHTML = `${value}`;
}

function finishGame() {
  board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
  timeElement.parentNode.classList.add('hide');
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const {width, height} = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = `${randomColor()}`;
  board.append(circle);
}

function randomColor() {
  const colors = ['red', 'green', 'yellow', 'pink', 'purple', 'blue', 'orange', 'whiteblue'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
