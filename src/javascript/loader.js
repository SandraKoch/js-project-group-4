const loader = document.getElementById('loader');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

function showLoader() {
  loader.classList.add('active');
}

function hideLoader() {
  loader.classList.remove('active');
}

function performSearch() {
  const query = searchInput.value.trim();
  if (query !== '') {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('loadstart', () => {
      showLoader();
    });

    xhr.addEventListener('loadend', () => {
      hideLoader();
    });

    const apiKey = '81805be47c20a9977d0669120b6add4a';

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query,
    )}&api_key=${apiKey}`;
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

searchForm.addEventListener('submit', function (e) {
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
