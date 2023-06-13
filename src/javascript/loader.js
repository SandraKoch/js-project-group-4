const loader = document.getElementById('loader');

function showLoader() {
  loader.classList.add('active');
}

function hideLoader() {
  loader.classList.remove('active');
}

window.addEventListener('load', () => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('loadstart', () => {
    showLoader();
  });

  xhr.addEventListener('loadend', () => {
    hideLoader();
  });
  loader.style.display = 'block';

  setTimeout(function () {
    loader.style.display = 'none';
  }, 250);
});
