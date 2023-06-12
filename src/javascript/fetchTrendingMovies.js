import { API_KEY } from './config';

const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTgwNWJlNDdjMjBhOTk3N2QwNjY5MTIwYjZhZGQ0YSIsInN1YiI6IjY0ODIyOWYyZDJiMjA5MDBlYmJmM2RiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QBYkVP1Y4DcB7g5RndWRVtYQ8Tp2I0wKn0TtL28dElE';
let PAGE = 1;

const searchFormElement = document.querySelector('#search-form');
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
    // console.log('genresArr', genresArr);
  })
  .catch(err => console.error(err));

// fetch to get the list of trending movies
export const optionsTrending = {
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
  })
  .catch(err => console.error(err));

//search images

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTgwNWJlNDdjMjBhOTk3N2QwNjY5MTIwYjZhZGQ0YSIsInN1YiI6IjY0ODIyOWYyZDJiMjA5MDBlYmJmM2RiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QBYkVP1Y4DcB7g5RndWRVtYQ8Tp2I0wKn0TtL28dElE',
  },
};

async function searchImages(query, page) {
  // const response = await fetch(`https://api.themoviedb.org/3/search/keyword?query=${query}&PAGE=${page}`, options);
  return fetch('https://api.themoviedb.org/3/search/keyword?query=CAR&page=1', options)
    .then(response => response.json())
    .then(jsonResponse => {
      console.log(jsonResponse);

      return jsonResponse;
    })
    .catch(err => console.error(err));
}

searchFormElement.addEventListener('submit', async e => {
  e.preventDefault();
  const trimmedInputValue = searchInputElement.value.trim();
  const foundImages = await searchImages(trimmedInputValue, PAGE);
  console.log('foundImages', foundImages);
});
