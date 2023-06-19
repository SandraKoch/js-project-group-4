import {
  searchMovies,
  displayMovies,
  fetchPopular,
  getCurrentFetchType,
  searchMoviesByGenre,
  getCurrentGenreId,
  getCurrentQuery,
} from './fetchTrendingMovies';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './refs';

let currentPage = 1;
let totalPages = 20;

function updatePaginationButtons() {
  refs.previousButton.disabled = currentPage === 1;
  refs.nextButton.disabled = currentPage === totalPages;
}

function createPaginationItem(pageNumber, isActive) {
  const listItem = document.createElement('li');
  const button = document.createElement('button');
  button.classList.add('pagination__element', 'pagination__element--button');
  button.textContent = pageNumber;
  button.addEventListener('click', () => {
    if (pageNumber !== currentPage) {
      currentPage = pageNumber;
      performSearch();
    }
    scroll(0, 0);
  });

  if (isActive) {
    button.classList.add('active');
  }

  listItem.appendChild(button);
  return listItem;
}

function createPaginationEllipsis() {
  const listItem = document.createElement('li');
  const ellipsisSpan = document.createElement('span');
  ellipsisSpan.classList.add('pagination__element', 'pagination__element--ellipsis');
  ellipsisSpan.textContent = '...';
  listItem.appendChild(ellipsisSpan);
  return listItem;
}

async function performSearch() {
  const currentFetchType = getCurrentFetchType();
  console.log('current', currentFetchType);

  let searchResults;

  if (currentFetchType === 'search') {
    const currentQuery = getCurrentQuery();
    searchResults = await searchMovies(currentQuery, currentPage);
  } else if (currentFetchType === 'popular') {
    searchResults = await fetchPopular(currentPage);
  } else {
    const genreId = getCurrentGenreId();
    searchResults = await searchMoviesByGenre(genreId, currentPage);
  }

  if (searchResults.results.length) {
    displayMovies(searchResults);
    totalPages = searchResults.total_pages; // Przypisanie wartości totalPages
    generatePagination(totalPages);
  } else {
    refs.main.innerHTML = '';
    Notify.failure('Oops, there are no movies matching your search query. Please try again.');
  }
}

export function generatePagination(pages) {
  //API limitation adjustment
  const totalPages = Math.min(pages, 500);

  refs.paginationList.innerHTML = '';

  let maxVisibleButtons = 5;
  const maxVisibleButtonsHalf = Math.floor(maxVisibleButtons / 2);

  let firstVisiblePage, lastVisiblePage;

  if (currentPage <= maxVisibleButtonsHalf) {
    firstVisiblePage = 1;
    lastVisiblePage = Math.min(maxVisibleButtons, totalPages);
  } else if (currentPage > totalPages - maxVisibleButtonsHalf) {
    firstVisiblePage = 1;
    lastVisiblePage = totalPages;
    if (totalPages > maxVisibleButtons) {
      firstVisiblePage = totalPages - maxVisibleButtons + 1;
      refs.paginationList.appendChild(createPaginationItem(1, false));
      refs.paginationList.appendChild(createPaginationEllipsis());
    }
  } else {
    firstVisiblePage = currentPage - maxVisibleButtonsHalf + 1;
    lastVisiblePage = currentPage + maxVisibleButtonsHalf - 1;
    refs.paginationList.appendChild(createPaginationItem(1, false));
    refs.paginationList.appendChild(createPaginationEllipsis());
  }

  for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
    const isActive = i === currentPage;
    refs.paginationList.appendChild(createPaginationItem(i, isActive));
  }

  if (lastVisiblePage < totalPages) {
    refs.paginationList.appendChild(createPaginationEllipsis());
  }

  const lastPageItem = createPaginationItem(totalPages, false);
  refs.paginationList.appendChild(lastPageItem);

  updatePaginationButtons();
}

refs.previousButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    performSearch();
  }
  scroll(0, 0);
});

refs.nextButton.addEventListener('click', () => {
  currentPage++;
  performSearch();
  scroll(0, 0);
});

generatePagination(totalPages);
