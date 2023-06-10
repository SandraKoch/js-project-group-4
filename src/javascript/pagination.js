const previousBtn = document.getElementById('previous-btn');
const nextBtn = document.getElementById('next-btn');
const paginationList = document.getElementById('pagination');

const totalPages = 20;
let currentPage = 1;

function generatePagination() {
  paginationList.innerHTML = '';

  if (currentPage > 3) {
    createPaginationButton(1);
    if (currentPage > 4) {
      createEllipsisButton();
    }
  }

  const startPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(currentPage + 2, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    createPaginationButton(i);
  }

  if (currentPage < totalPages - 2) {
    if (currentPage < totalPages - 3) {
      createEllipsisButton();
    }
    createPaginationButton(totalPages);
  }

  previousBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

function createPaginationButton(pageNumber) {
  const li = document.createElement('li');
  const button = document.createElement('button');
  button.innerText = pageNumber;
  button.classList.add('pagination__element');

  if (pageNumber === currentPage) {
    button.classList.add('pagination__element--active');
  }

  button.addEventListener('click', () => {
    currentPage = pageNumber;
    generatePagination();
  });

  li.appendChild(button);
  paginationList.appendChild(li);
}

function createEllipsisButton() {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerText = '...';
  li.appendChild(span);
  paginationList.appendChild(li);
}

generatePagination();

// Dodaj obsługę kliknięcia w strzałki
previousBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    generatePagination();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    generatePagination();
  }
});