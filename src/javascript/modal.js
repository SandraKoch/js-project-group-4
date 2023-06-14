import './fetchTrendingMovies';
import { options } from './fetchTrendingMovies';

const modal = document.querySelector('#backdrop');
const main = document.querySelector('#main');

//opening modal window

const openModal = event => {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  modal.classList.remove('is-hidden');
};

const closeModal = event => {
  event.preventDefault();
  modal.innerHTML = '';
  modal.classList.add('is-hidden');
};

main.addEventListener('click', openModal);
window.addEventListener('keydown', event => {
  // event.preventDefault();
  if (event.code === 'Escape') {
    modal.classList.add('is-hidden');
  }
});
modal.addEventListener('click', event => {
  event.preventDefault();
  if (event.target === modal) {
    modal.classList.add('is-hidden');
  }
});

function fetchMovieInfo(movieId) {
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
    .then(response => response.json())
    .catch(error => console.log(error));
}

main.addEventListener('click', e => {
  console.log(e.target.id);
  fetchMovieInfo(e.target.id)
    .then(movie => {
      console.log(movie);
      fillModal(movie);
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
    <ul class="movie-details__list">
      <li class="movie-details__item">
        <p class="movie-details__aspect">Vote / Votes</p>
        <!--przykładowe wartości-->
        <p id="movie-details__value" class="movie-details__value">
          <span id="movie-rating" class="movie-rating">${movie.vote_average}/</span>/<span
            id="movie-votes"
            class="movie-votes"
            >${movie.vote_count}</span
          >
        </p>
      </li>
      <li class="movie-details__item">
        <p class="movie-details__aspect">Popularity</p>
        <!--przykładowe wartości-->
        <p id="movie-details__value" class="movie-details__value">
          <span id="movie-popularity" class="movie-popularity">${movie.popularity}</span>
        </p>
      </li>
      <li class="movie-details__item">
        <p class="movie-details__aspect">${movie.original_title}</p>
        <!--przykładowe wartości-->
        <p id="movie-details__value" class="movie-details__value">
          <span id="orginal-movie-title" class="orginal-movie-title">Orginal Title</span>
        </p>
      </li>
      <li class="movie-details__item">
        <p class="movie-details__aspect">Genre</p>
        <!--przykładowe wartości-->
        <p id="movie-details__value" class="movie-details__value">
          <span id="movie-genre" class="movie-genre">Wester</span>
        </p>
      </li>
    </ul>
  </div>
  <div class="movie-description">
    <p class="movie-description__about">ABOUT</p>
    <p id="movie-description__description" class="movie-description__description">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. A labore ut quo. Maxime corrupti
      quasi quos sed molestias nisi delectus tempore est, commodi sit repudiandae, dolor
      praesentium veniam. Corrupti maiores voluptate tenetur ullam enim, at deleniti unde
      dignissimos porro dolores perferendis accusantium harum animi reprehenderit obcaecati
      molestiae sunt doloremque earum.
    </p>
  </div>
  <div class="buttons-box">
    <button type="button" id="watched-button" class="watched-button">ADD TO WATCHED</button>
    <button type="button" id="queue-button" class="queue-button">ADD TO QUEUE</button>
  </div>
</div>
</div>`,
  );

  const closeBtn = document.querySelector('#modal-close-button');
  closeBtn.addEventListener('click', closeModal);
}
