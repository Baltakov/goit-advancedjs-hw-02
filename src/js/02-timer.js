import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const startButton = document.querySelector('[data-start]');

    const now = new Date();
    if (
      selectedDate > now ||
      (selectedDate.getTime() === now.getTime() &&
        selectedDate.getTime() > now.getTime())
    ) {
      startButton.disabled = false;
    } else {
      startButton.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future.',
        position: 'topRight',
      });
    }
  },
};
flatpickr('#datetime-picker', options);

let isTimerRunning = false;

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector('[data-start]');
  startButton.disabled = true;
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

let countdownInterval;

function startCountdown() {
  const selectedDate = flatpickr.parseDate(
    document.getElementById('datetime-picker').value
  );
  const now = new Date();

  startButton.disabled = true;
  document.getElementById('datetime-picker').disabled = true;
  isTimerRunning = true;

  if (selectedDate <= now) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future.',
      position: 'topRight',
    });
    return;
  }

  const timerFields = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  };

  countdownInterval = setInterval(() => {
    const timeRemaining = selectedDate - now;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      iziToast.success({
        title: 'Countdown Complete',
        message: 'The countdown has reached zero!',
        position: 'topRight',
      });
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeRemaining);

    timerFields.days.textContent = addLeadingZero(days);
    timerFields.hours.textContent = addLeadingZero(hours);
    timerFields.minutes.textContent = addLeadingZero(minutes);
    timerFields.seconds.textContent = addLeadingZero(seconds);

    now.setSeconds(now.getSeconds() + 1);
  }, 1000);
}

function stopCountdown() {
  clearInterval(countdownInterval);
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

startButton.addEventListener('click', startCountdown);
stopButton.addEventListener('click', stopCountdown);
