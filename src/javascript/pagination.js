import { searchMovies, displayMovies } from './fetchTrendingMovies';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './refs';

const previousButton = document.querySelector('#previous-btn');
const nextButton = document.querySelector('#next-btn');
const paginationList = document.querySelector('#pagination');

let currentPage = 1;
let totalPages = 20;

function updatePaginationButtons() {
  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
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
  const query = refs.searchInputElement.value.trim();
  const searchResults = await searchMovies(query, currentPage);

  if (searchResults.results.length) {
    displayMovies(searchResults);
    totalPages = searchResults.total_pages; // Przypisanie wartości totalPages
    generatePagination(totalPages);
  } else {
    refs.main.innerHTML = '';
    Notify.failure('Oops, there are no movies matching your search query. Please try again.');
  }
}

function generatePagination(totalPages) {
  paginationList.innerHTML = '';

  const maxVisibleButtons = 7;
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
      paginationList.appendChild(createPaginationItem(1, false));
      paginationList.appendChild(createPaginationEllipsis());
    }
  } else {
    firstVisiblePage = currentPage - maxVisibleButtonsHalf + 1;
    lastVisiblePage = currentPage + maxVisibleButtonsHalf - 1;
    paginationList.appendChild(createPaginationItem(1, false));
    paginationList.appendChild(createPaginationEllipsis());
  }

  for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
    const isActive = i === currentPage;
    paginationList.appendChild(createPaginationItem(i, isActive));
  }

  if (lastVisiblePage < totalPages) {
    paginationList.appendChild(createPaginationEllipsis());
  }

  const lastPageItem = createPaginationItem(totalPages, false);
  paginationList.appendChild(lastPageItem);

  updatePaginationButtons();
}

previousButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    performSearch();
  }
});

nextButton.addEventListener('click', () => {
  currentPage++;
  performSearch();
});

generatePagination(totalPages);
