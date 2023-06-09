import { API_KEY, ACCESS_TOKEN, PAGE } from './config';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './refs';
import { options } from './config';
import { generatePagination } from './pagination';

let genresArr = [];
let currentGenreId = null;
let currentFetchType = '';
let currentQuery = '';

export function getCurrentQuery() {
  return currentQuery;
}

export function getCurrentGenreId() {
  return currentGenreId;
}

export function getCurrentFetchType() {
  return currentFetchType;
}

export async function searchMovies(query, page) {
  currentFetchType = 'search';
  return fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&page=${page}`,
    options,
  )
    .then(response => response.json())
    .then(jsonResponse => {
      return jsonResponse;
    })
    .catch(err => console.error(err));
}

export function displayMovies(results) {
  const moviesArr = results.results;
  refs.main.innerHTML = '';

  moviesArr.forEach(film => {
    // console.log('film.poster_path', film.poster_path);

    const movieGenres = film.genre_ids
      .map(genreId => {
        const genre = genresArr.find(genre => genre.id === genreId);
        return genre ? genre.name.toString() : '';
      })
      .join(', ');

    const releaseDate = new Date(film.release_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: undefined,
      day: undefined,
    });

    refs.main.insertAdjacentHTML(
      'beforeend',
      `
      <li id="main__element" class="main__element">
        <div id="main__item" class="main__item">
          <figure id="main__movie" class="main__movie">
            <img id="${film.id}" class="main__image"
              src="${
                film.poster_path
                  ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                  : `https://github.com/SandraKoch/js-project-group-4/blob/main/src/images/no-image-here.png?raw=true`
              }" alt="${film.title}" />
            <figcaption id="main__caption" class="main__caption">
              <span id="main__movie-name" class="main__movie-name">
                ${film.original_title}
              </span>
              <div>
              <span id="main__movie-genres" class="main__movie-data">${movieGenres}</span>
              <span class="main__movie-data">|</span>
              <span id="main__movie-release-date" class="main__movie-release-date main__movie-data">
                ${releaseDate}
              </span>
              </div>
            </figcaption>
          </figure>
        </li>
      </ul>`,
    );
  });
}

export function fetchPopular(page = 1) {
  currentFetchType = 'popular';
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`,
    options,
  )
    .then(response => response.json())
    .catch(err => console.error(err));
}

export function initTrendingMovies() {
  const PAGE = 1; // Ustaw odpowiednią wartość strony

  function fetchGenres() {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then(response => response.json())
      .catch(err => console.error(err));
  }

  Promise.all([fetchGenres(), fetchPopular()]).then(res => {
    // console.log('res', res);
    const [genresRes, popularRes] = res;
    //first promise
    genresArr = genresRes.genres;
    //second promise
    refs.main.innerHTML = '';

    // console.log(popularRes, 'popularRes');

    displayMovies(popularRes);
    generatePagination(popularRes.total_pages);

    // Create genre buttons
    const genresContainer = document.getElementById('genres');
    genresArr.forEach(genre => {
      const button = document.createElement('button');
      button.classList.add('button');
      button.textContent = genre.name;
      button.addEventListener('click', async () => {
        currentGenreId = genre.id;
        const data = await searchMoviesByGenre(currentGenreId, PAGE); // Przekazanie wartości strony
        displayMovies(data);
        generatePagination(data.total_pages);
      });
      genresContainer.appendChild(button);
    });
  });

  if (refs.searchFormElement) {
    refs.searchFormElement.addEventListener('submit', async e => {
      e.preventDefault();
      const trimmedInputValue = refs.searchInputElement.value.trim();
      currentQuery = trimmedInputValue;
      const foundMovies = await searchMovies(trimmedInputValue, PAGE);

      generatePagination(foundMovies.total_pages);
      if (trimmedInputValue !== '') {
        handleResults(foundMovies);
        const genresContainer = document.getElementById('genres');
        genresContainer.style.display = 'none';
      } else {
        Notify.info('Please, enter the movie name to start search');
      }
    });
  }
}

export async function searchMoviesByGenre(genreId, page) {
  currentFetchType = 'genre';
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&include_adult=false&page=${page}`,
    options,
  );
  return await response.json();
  // displayMovies(data);
}

function handleResults(apiObject) {
  if (apiObject.results.length) {
    displayMovies(apiObject);
    const total = apiObject.total_results;
    Notify.success(`Hooray! You have found ${total} movies matching your query`);
  } else {
    Notify.failure('Oops, there are no movies matching your search query. Please try again.');
  }
}
