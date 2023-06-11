import './fetchTrendingMovies';

setTimeout(() => {
  const closeBtn = document.querySelector('#modal-close-button');
  let openBtn = document.querySelectorAll('.main__image');
  const modal = document.querySelector('#backdrop');

  const openModal = function () {
    modal.classList.remove('is-hidden');
  };

  const closeModal = function () {
    modal.classList.add('is-hidden');
  };

  openBtn.forEach(item => {
    item.addEventListener('click', openModal);
  });

  closeBtn.addEventListener('click', closeModal);
}, 1000);
