import './sass/main.scss';
import './javascript/modal';
import './javascript/fetchTrendingMovies';
import { fetchTrendingMovies } from './javascript/fetchTrendingMovies';
//import './javascript/loader.js';

const main = document.querySelector('#main');
let genresArr = [];

const loadWatchedFromLS = key => {
  try {
    const parsedArr = JSON.parse(localStorage.getItem(key));
    console.log(parsedArr);
    if (parsedArr === null) return;
    parsedArr.forEach(film => {
      console.log(film);
      console.log(genresArr);
      const movieGenres = film.genres
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
    return parsedArr;
  } catch (e) {
    alert(`There was a mistake ${e.toString()}`);
  }
};

const userQueue = document.querySelector('#user-queue-btn');
const userWatched = document.querySelector('#user-watched-btn');

userQueue.addEventListener('click', () => {
  console.log('queue btn');
  main.innerHTML = ' ';
  loadWatchedFromLS('queue');
});
userWatched.addEventListener('click', () => {
  console.log('watched btn');
  main.innerHTML = ' ';
  loadWatchedFromLS('watched');
});

loadWatchedFromLS('watched');
