import { API_KEY } from './config';

const searchInputElement = document.querySelector('#search-input');
const main = document.querySelector('#main');
let genresArr = [];

// fetch to get the list of genres
const optionsGenres = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTgwNWJlNDdjMjBhOTk3N2QwNjY5MTIwYjZhZGQ0YSIsInN1YiI6IjY0ODIyOWYyZDJiMjA5MDBlYmJmM2RiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QBYkVP1Y4DcB7g5RndWRVtYQ8Tp2I0wKn0TtL28dElE',
  },
};

fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', optionsGenres)
  .then(response => response.json())
  .then(response => {
    genresArr = response.genres;
    console.log('genresArr', genresArr);
  })
  .catch(err => console.error(err));

// fetch to get the list of trending movies
const optionsTrending = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTgwNWJlNDdjMjBhOTk3N2QwNjY5MTIwYjZhZGQ0YSIsInN1YiI6IjY0ODIyOWYyZDJiMjA5MDBlYmJmM2RiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QBYkVP1Y4DcB7g5RndWRVtYQ8Tp2I0wKn0TtL28dElE',
  },
};

fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', optionsTrending)
  .then(response => response.json())
  .then(({ results }) => {
    // console.log(results);
    main.innerHTML = '';
    results.forEach((film, filmIndex) => {
      // console.log(film, filmIndex);
      // if
      main.insertAdjacentHTML(
        'beforeend',
        `
      <ul id="main__list" class="main__list">
    <li id="main__list-item" class="main__list-item">
      <figure id="main__movie" class="main__movie">
        <img id="main__image" class="main__image"
        src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${film.title}" />
        <figcaption id="main__caption" class="main__caption">
          <span id="main__movie-name" class="main__movie-name">
            ${film.original_title}
          </span>
          <span id="main__movie-genres" class="main__movie-genres">
            ${film.genre_ids}
          </span>
        </figcaption>
      </figure>
    </li>
  </ul>
      `,
      );
    });
  })
  .catch(err => console.error(err));
