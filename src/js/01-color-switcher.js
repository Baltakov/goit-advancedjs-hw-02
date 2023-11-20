function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;

let intervalId = null;

function startColorChange() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorChange() {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

startBtn.addEventListener('click', startColorChange);
stopBtn.addEventListener('click', stopColorChange);
