const watchedBtn = document.querySelector('#user-watched-btn');
const queueBtn = document.querySelector('#user-queue-btn');

watchedBtn.addEventListener('focus', () => {
  queueBtn.classList.remove('button--active');
  watchedBtn.classList.add('button--active');
});

queueBtn.addEventListener('focus', () => {
  watchedBtn.classList.remove('button--active');
  queueBtn.classList.add('button--active');
});
