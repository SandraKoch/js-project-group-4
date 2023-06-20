// import './fetchTrendingMovies';
import { options } from './config';
import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const backdrop = document.querySelector('#backdrop');
// const main = document.querySelector('#main'); to importujemy z refs
// const watchedBtn = document.querySelector('#watched-button');
// const queueBtn = document.querySelector('#queue-button');

const openModal = event => {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  backdrop.classList.remove('is-hidden');
  backdrop.classList.add('opening-modal');
};

const closeModal = () => {
  backdrop.innerHTML = '';
  backdrop.classList.add('is-hidden');
  backdrop.classList.remove('opening-modal');
};

refs.main.addEventListener('click', openModal);
window.addEventListener('keydown', event => {
  if (event.code === 'Escape') {
    backdrop.classList.add('is-hidden');
    backdrop.classList.remove('opening-modal');
  }
  backdrop.innerHTML = '';
});

backdrop.addEventListener('click', event => {
  if (event.target === backdrop) {
    backdrop.classList.add('is-hidden');
    backdrop.classList.remove('opening-modal');
  }
  backdrop.innerHTML = '';
});

//is it necessary to create a new fetch ?

function fetchMovieInfo(movieId) {
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
    .then(response => response.json())
    .catch(error => console.log(error));
}

refs.main.addEventListener('click', e => {
  if (e.target.nodeName === 'IMG') {
    fetchMovieInfo(e.target.id)
      .then(movie => {
        fillModal(movie);
        watchedQueue(movie);
        recognitionWatchFromLS(movie);
        recognitionQueueFromLS(movie);
      })
      .catch(error => console.log(error));
  }
});

function fillModal(movie) {
  backdrop.insertAdjacentHTML(
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
    <div class="modal-content">
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
<div>
</div>
<div class="scroll-down"></div>`,
  );

  const modalWindow = document.querySelector('#modal');
  modalWindow.addEventListener('click', event => {
    event.stopPropagation();
  });

  const closeBtn = document.querySelector('#modal-close-button');
  closeBtn.addEventListener('click', closeModal);

  const trailerBtn = document.querySelector('#image-box__image');
  trailerBtn.addEventListener('click', () => {
    openTrailer(movie.id);
  });
}
function openTrailer(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options)
    .then(response => response.json())
    .then(data => {
      const trailers = data.results;
      if (trailers.length > 0) {
        const trailerKey = trailers[0].key;
        const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
        window.open(trailerUrl, '_blank');
      } else {
        Notify.info('Trailer is not available.');
      }
    })
    .catch(error => console.log(error));
}
const saveToLS = movie => {
  watchedArr.push(movie);
  const jsonMovie = JSON.stringify(watchedArr);
  localStorage.setItem(key, jsonMovie);
};

const loadFromLS = key => {
  let arr = JSON.parse(localStorage.getItem(key));
  if (arr === null) arr = [];
  return arr;
};

const recognitionWatchFromLS = movie => {
  const watchedBtn = document.querySelector('#watched-button');
  const watchedArr = loadFromLS('watched');
  watchedBtn.innerHTML = 'ADD TO WATCHED';
  if (watchedArr.find(movieInArr => movieInArr.id === movie.id)) {
    watchedBtn.innerHTML = 'REMOVE FROM WATCHED';
  }
};

const recognitionQueueFromLS = movie => {
  const queueBtn = document.querySelector('#queue-button');
  const queueArr = loadFromLS('queue');
  queueBtn.innerHTML = 'ADD TO QUEUE';
  if (queueArr.find(movieInArr => movieInArr.id === movie.id)) {
    queueBtn.innerHTML = 'REMOVE FROM QUEUE';
  }
};
const watchedQueue = movie => {
  const watchedBtn = document.querySelector('#watched-button');
  const queueBtn = document.querySelector('#queue-button');
  let watchedArr = [];

  const addToLS = (movie, key) => {
    const arr = loadFromLS(key);
    let newArr = [];
    if (arr.find(movieInArr => movieInArr.id === movie.id) !== undefined) {
      newArr = arr.filter(film => film.id !== movie.id);
      const jsonMovie = JSON.stringify(newArr);
      localStorage.setItem(key, jsonMovie);
      Notify.info(`Film removed from yours ${key} list`);
    } else {
      const updatedArr = [...arr, movie];
      const jsonMovie = JSON.stringify(updatedArr);
      localStorage.setItem(key, jsonMovie);
      Notify.success(`Film added to yours ${key} list`);
    }
  };

  watchedBtn.addEventListener('click', () => {
    addToLS(movie, 'watched');
    recognitionWatchFromLS(movie);
  });
  queueBtn.addEventListener('click', () => {
    addToLS(movie, 'queue');
    recognitionQueueFromLS(movie);
  });
};

