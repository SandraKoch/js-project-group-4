const modal = document.querySelector('#backdrop');
const closeBtn = document.querySelector('#modal-close-button');
const openBtn = document.querySelector('#main');

const openModal = event => {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  modal.classList.remove('is-hidden');
};

const closeModal = event => {
  event.preventDefault();

  modal.classList.add('is-hidden');
};

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('keydown', event => {
  event.preventDefault();
  if (event.code === 'Escape') {
    modal.classList.add('is-hidden');
  }
});
modal.addEventListener('click', event => {
  event.preventDefault();
  if (event.target === modal) {
    modal.classList.add('is-hidden');
  }
});
