// import './fetchTrendingMovies';
import { options } from './fetchTrendingMovies';
import { refs } from './refs';

const modal = document.querySelector('#backdrop');
// const main = document.querySelector('#main'); to importujemy z refs

const openModal = event => {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  modal.classList.remove('is-hidden');
};

const closeModal = () => {
  modal.innerHTML = '';
  modal.classList.add('is-hidden');
};

refs.main.addEventListener('click', openModal);
window.addEventListener('keydown', event => {
  if (event.code === 'Escape') {
    modal.classList.add('is-hidden');
  }
  modal.innerHTML = '';
});

modal.addEventListener('click', event => {
  if (event.target === modal) {
    modal.classList.add('is-hidden');
  }
  modal.innerHTML = '';
});

//is it necessary to create a new fetch ?

function fetchMovieInfo(movieId) {
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
    .then(response => response.json())
    .catch(error => console.log(error));
}

refs.main.addEventListener('click', e => {
  fetchMovieInfo(e.target.id)
    .then(movie => {
      fillModal(movie);
      watchedQueue(movie);
    })
    .catch(error => console.log(error));
});

function fillModal(movie) {
  modal.insertAdjacentHTML(
    'beforeend',
    `<div id="modal" class="modal">
    <button id="modal-close-button" class="modal-close-button">
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="close">
    <path id="Vector 1" d="M8 8L22 22" stroke="black" stroke-width="2"/>
    <path id="Vector 2" d="M8 22L22 8" stroke="black" stroke-width="2"/>
    </g>
    </svg>
    </button>
<div id="image-box" class="image-box">
  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" id="image-box__image" class="image-box__image" />
</div>
<div id="movie-info" class="movie-info">
  <h2 id="movie-title" class="movie-title">${movie.title}</h2>
  <div class="movie-details">
    <ul class="movie-details__list movie-details__list-aspects">
      <li class="movie-details__item-aspect">
        <p class="movie-details__aspect">Vote / Votes</p>
      </li>
      <li class="movie-details__item-aspect">
        <p class="movie-details__aspect">Popularity</p>
      </li>
      <li class="movie-details__item-aspect">
        <p class="movie-details__aspect">Orginal Title</p>
      </li>
      <li class="movie-details__item-aspect">
        <p class="movie-details__aspect">Genre</p>
      </li>
    </ul>
    <ul class="movie-details__list">
      <li class="movie-details__item-value">
        <p id="movie-details__value" class="movie-details__value">
          <span id="movie-rating" class="movie-rating">${movie.vote_average}</span> / <span
            id="movie-votes"
            class="movie-votes"
            >${movie.vote_count}</span
          >
        </p>
      </li>
      <li class="movie-details__item-value">
        <p id="movie-details__value" class="movie-details__value">
          <span id="movie-popularity" class="movie-popularity">${movie.popularity}</span>
        </p>
      </li>
      <li class="movie-details__item-value">
        <p id="movie-details__value" class="movie-details__value">
          <span id="orginal-movie-title" class="orginal-movie-title">${movie.original_title}</span>
        </p>
      </li>
      <li class="movie-details__item-value">
        <p id="movie-details__value" class="movie-details__value">
          <span id="movie-genre" class="movie-genre">${movie.genres[0].name}</span>
        </p>
      </li>
    </ul>
  </div>
  <div class="movie-description">
    <p class="movie-description__about">ABOUT</p>
    <p id="movie-description__description" class="movie-description__description">${movie.overview}</p>
  </div>
  <div class="buttons-box">
    <button type="button" id="watched-button" class="watched-button button">ADD TO WATCHED</button>
    <button type="button" id="queue-button" class="queue-button button">ADD TO QUEUE</button>
  </div>
</div>
</div>`,
  );

  const modalWindow = document.querySelector('#modal');
  modalWindow.addEventListener('click', event => {
    event.stopPropagation();
  });

  const closeBtn = document.querySelector('#modal-close-button');
  closeBtn.addEventListener('click', closeModal);
}

const watchedQueue = movie => {
  const watchedBtn = document.querySelector('#watched-button');
  const queueBtn = document.querySelector('#queue-button');

  const addToLS = (movie, key) => {
    let watchedArr = JSON.parse(localStorage.getItem(key));
    if (watchedArr === null) watchedArr = [];
    if (watchedArr.find(movieInArr => movieInArr.id === movie.id)) {
      console.log('Is on list');
      return;
    }
    console.log(movie.id);
    watchedArr.push(movie);
    console.log(watchedArr);
    const jsonMovie = JSON.stringify(watchedArr);
    localStorage.setItem(key, jsonMovie);
  };

  watchedBtn.addEventListener('click', () => {
    addToLS(movie, 'watched');
  });
  queueBtn.addEventListener('click', () => {
    addToLS(movie, 'queue');
  });
};
