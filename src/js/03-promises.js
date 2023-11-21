import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  let delay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));
  const amount = Number(formData.get('amount'));

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        iziToast.success({
          title: 'Success',
          message: `Fulfilled promise ${position} in ${delay}ms`,
        });
        console.log(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          title: 'Error',
          message: `Rejected promise ${position} in ${delay}ms`,
        });
        console.log(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
});
