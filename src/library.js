import './sass/main.scss';
import { initModal } from './javascript/modal';
import './javascript/libraryButtons';
import { refs } from './javascript/refs';
import './javascript/footer-modal';
// const main = document.querySelector('#main'); to importujemy z refs

let currentType = 'watched';

const loadWatchedFromLS = key => {
  try {
    const parsedArr = JSON.parse(localStorage.getItem(key));

    if (parsedArr === null) return;

    refs.main.innerHTML = '';
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
                <span id="movie-rating" class="movie-rating">${film.vote_average}</span>
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

refs.userQueue.addEventListener('click', () => {
  refs.main.innerHTML = ' ';
  currentType = 'queue';
  loadWatchedFromLS('queue');
});
refs.userWatched.addEventListener('click', () => {
  refs.main.innerHTML = ' ';
  currentType = 'watched';
  loadWatchedFromLS('watched');
});

function onModalAction(key) {
  const shouldRefresh = currentType === key;
  if (shouldRefresh) {
    loadWatchedFromLS(key);
  }
}

loadWatchedFromLS('watched');
initModal(onModalAction);
