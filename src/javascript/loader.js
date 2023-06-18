import { refs } from './refs';
import { API_KEY} from './config';


function showLoader() {
  refs.loader.classList.add('active');
}

function hideLoader() {
  refs.loader.classList.remove('active');
}

function performSearch() {
  const query = refs.searchInputElement.value.trim();
  if (query !== '') {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('loadstart', () => {
      showLoader();
    });

    xhr.addEventListener('loadend', () => {
      hideLoader();
    });

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query,
    )}&api_key=${API_KEY}`;
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
      } else {
        console.error('Wystąpił błąd podczas żądania API.');
      }
    };

    xhr.onerror = function () {
      console.error('Wystąpił błąd podczas żądania API.');
    };
    xhr.send();
  }
}

refs.searchFormElement.addEventListener('submit', function (e) {
  e.preventDefault();
  performSearch();
});

showLoader();

setTimeout(function () {
  hideLoader();
}, 250);

window.addEventListener('beforeunload', function () {
  showLoader();
});
