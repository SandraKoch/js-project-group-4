import './sass/main.scss';
import './javascript/modal';
import './javascript/libraryButtons';
import { refs } from './javascript/refs';
// const main = document.querySelector('#main'); to importujemy z refs

const loadWatchedFromLS = key => {
  try {
    const parsedArr = JSON.parse(localStorage.getItem(key));

    if (parsedArr === null) return;
    parsedArr.forEach(film => {
      let movieGenresNames = [];
      const movieGenresID = film.genres;
      movieGenresNames = movieGenresID.map(genre => genre.name).join(', ');
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
                src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${film.title}" />
              <figcaption id="main__caption" class="main__caption">
                <span id="main__movie-name" class="main__movie-name">
                  ${film.original_title}
                </span>
                <div>
                <span id="main__movie-genres" class="main__movie-data">${movieGenresNames}</span>
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
    console.log(`There was a mistake ${e.toString()}`);
  }
};

const userQueue = document.querySelector('#user-queue-btn');
const userWatched = document.querySelector('#user-watched-btn');

userQueue.addEventListener('click', () => {
  refs.main.innerHTML = ' ';
  loadWatchedFromLS('queue');
});
userWatched.addEventListener('click', () => {
  refs.main.innerHTML = ' ';
  loadWatchedFromLS('watched');
});

loadWatchedFromLS('watched');
