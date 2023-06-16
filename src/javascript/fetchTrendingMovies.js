// import { API_KEY } from './config';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTgwNWJlNDdjMjBhOTk3N2QwNjY5MTIwYjZhZGQ0YSIsInN1YiI6IjY0ODIyOWYyZDJiMjA5MDBlYmJmM2RiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QBYkVP1Y4DcB7g5RndWRVtYQ8Tp2I0wKn0TtL28dElE';
let PAGE = 1;

export const searchFormElement = document.querySelector('#search-form');
export const searchInputElement = document.querySelector('#search-input');
export const main = document.querySelector('#main');
let genresArr = [];

// move to separate file
export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + ACCESS_TOKEN,
  },
};

//search movies
export async function searchMovies(query, page) {
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
  console.log(genresArr, 'genresArr');
  const moviesArr = results.results;
  main.innerHTML = '';
  moviesArr.forEach(film => {
    console.log('film.poster_path', film.poster_path);
    main.insertAdjacentHTML(
      'beforeend',
      `
      <ul id="main__list" class="main__list">
        <li id="main__list-item" class="main__list-item">
          <figure id="main__movie" class="main__movie">
            <img id="${film.id}" class="main__image"
              src="${
                film.poster_path
                  ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                  : `http://localhost:1234/header-background-primary-768.91f8ed7a.png`
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

export function initTrendingMovies() {
  function fetchGenres() {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then(response => response.json())
      .catch(err => console.error(err));
  }

  function fetchPopular() {
    return fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
      .then(response => response.json())
      .catch(err => console.error(err));
  }

  // function findGenreById()

  Promise.all([fetchGenres(), fetchPopular()]).then(res => {
    console.log('res', res);
    const [genresRes, popularRes] = res;
    //first promise
    genresArr = genresRes.genres;
    //second promise
    main.innerHTML = '';
    console.log(popularRes, 'popularRes');
    popularRes.results.forEach((film, filmIndex) => {
      // Get the genre names based on genre IDs
      const movieGenres = film.genre_ids
        .map(genreId => {
          const genre = genresArr.find(genre => genre.id === genreId);
          return genre ? genre.name.toString() : '';
        })
        .join(', ');

      // Format the release date
      const releaseDate = new Date(film.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: undefined,
        day: undefined,
      });

      // drawMovieCards();

      main.insertAdjacentHTML(
        'beforeend',
        `
              <ul id="main__list" class="main__list">
                <li id="main__list-item" class="main__list-item">
                  <figure id="main__movie" class="main__movie">
                    <img id="${film.id}" class="main__image"
                      src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${film.title}" />
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
              </ul>
            `,
      );
    });
  });

  function displayMovies(results) {
    console.log(genresArr, 'genresArr');
    const moviesArr = results.results;
    main.innerHTML = '';
    moviesArr.forEach(film => {
      // console.log('film.poster_path', film.poster_path);
      // drawMovieCards();
      main.insertAdjacentHTML(
        'beforeend',
        `
        <ul id="main__list" class="main__list">
          <li id="main__list-item" class="main__list-item">
            <figure id="main__movie" class="main__movie">
              <img id="${film.id}" class="main__image"
                src="${
                  film.poster_path
                    ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                    : `http://localhost:1234/header-background-primary-768.91f8ed7a.png`
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
        </ul>
      `,
      );
    });
  }

  if (searchFormElement) {
    searchFormElement.addEventListener('submit', async e => {
      e.preventDefault();
      const trimmedInputValue = searchInputElement.value.trim();
      const foundMovies = await searchMovies(trimmedInputValue, PAGE);
      // console.log(foundMovies, 'foundMovies');

      if (trimmedInputValue !== '') {
        handleResults(foundMovies);
      } else {
        Notify.info('Please, enter the movie name to start search');
      }
    });
  }

  function handleResults(apiObject) {
    if (apiObject.results.length) {
      displayMovies(apiObject);
      // console.log(object, 'object');
      const total = apiObject.total_results;
      Notify.success(`Hooray! You have found ${total} movies matching your query`);
    } else {
      Notify.failure('Oops, there are no movies matching your search query. Please try again.');
    }
  }
}
