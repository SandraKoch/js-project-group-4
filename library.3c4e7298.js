const e={method:"GET",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTgwNWJlNDdjMjBhOTk3N2QwNjY5MTIwYjZhZGQ0YSIsInN1YiI6IjY0ODIyOWYyZDJiMjA5MDBlYmJmM2RiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QBYkVP1Y4DcB7g5RndWRVtYQ8Tp2I0wKn0TtL28dElE"}},i={searchFormElement:document.querySelector("#search-form"),searchInputElement:document.querySelector("#search-input"),main:document.querySelector("#main"),loader:document.querySelector("#loader")},t=document.querySelector("#backdrop"),n=()=>{t.innerHTML="",t.classList.add("is-hidden")};i.main.addEventListener("click",(e=>{"IMG"===e.target.nodeName&&t.classList.remove("is-hidden")})),window.addEventListener("keydown",(e=>{"Escape"===e.code&&t.classList.add("is-hidden"),t.innerHTML=""})),t.addEventListener("click",(e=>{e.target===modal&&t.classList.add("is-hidden"),t.innerHTML=""})),i.main.addEventListener("click",(i=>{var s;(s=i.target.id,fetch(`https://api.themoviedb.org/3/movie/${s}`,e).then((e=>e.json())).catch((e=>console.log(e)))).then((e=>{!function(e){t.insertAdjacentHTML("beforeend",`<div id="modal" class="modal">\n    <button id="modal-close-button" class="modal-close-button">\n    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <g id="close">\n    <path id="Vector 1" d="M8 8L22 22" stroke="black" stroke-width="2"/>\n    <path id="Vector 2" d="M8 22L22 8" stroke="black" stroke-width="2"/>\n    </g>\n    </svg>\n    </button>\n    <div class="modal-content">\n<div id="image-box" class="image-box">\n  <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" id="image-box__image" class="image-box__image" />\n</div>\n<div id="movie-info" class="movie-info">\n  <h2 id="movie-title" class="movie-title">${e.title}</h2>\n  <div class="movie-details">\n    <ul class="movie-details__list movie-details__list-aspects">\n      <li class="movie-details__item-aspect">\n        <p class="movie-details__aspect">Vote / Votes</p>\n      </li>\n      <li class="movie-details__item-aspect">\n        <p class="movie-details__aspect">Popularity</p>\n      </li>\n      <li class="movie-details__item-aspect">\n        <p class="movie-details__aspect">Orginal Title</p>\n      </li>\n      <li class="movie-details__item-aspect">\n        <p class="movie-details__aspect">Genre</p>\n      </li>\n    </ul>\n    <ul class="movie-details__list">\n      <li class="movie-details__item-value">\n        <p id="movie-details__value" class="movie-details__value">\n          <span id="movie-rating" class="movie-rating">${e.vote_average}</span> / <span\n            id="movie-votes"\n            class="movie-votes"\n            >${e.vote_count}</span\n          >\n        </p>\n      </li>\n      <li class="movie-details__item-value">\n        <p id="movie-details__value" class="movie-details__value">\n          <span id="movie-popularity" class="movie-popularity">${e.popularity}</span>\n        </p>\n      </li>\n      <li class="movie-details__item-value">\n        <p id="movie-details__value" class="movie-details__value">\n          <span id="orginal-movie-title" class="orginal-movie-title">${e.original_title}</span>\n        </p>\n      </li>\n      <li class="movie-details__item-value">\n        <p id="movie-details__value" class="movie-details__value">\n          <span id="movie-genre" class="movie-genre">${e.genres[0].name}</span>\n        </p>\n      </li>\n    </ul>\n  </div>\n  <div class="movie-description">\n    <p class="movie-description__about">ABOUT</p>\n    <p id="movie-description__description" class="movie-description__description">${e.overview}</p>\n  </div>\n  <div class="buttons-box">\n    <button type="button" id="watched-button" class="watched-button button">ADD TO WATCHED</button>\n    <button type="button" id="queue-button" class="queue-button button">ADD TO QUEUE</button>\n  </div>\n</div>\n<div>\n</div>\n<div class="scroll-down"></div>`);document.querySelector("#modal").addEventListener("click",(e=>{e.stopPropagation()}));document.querySelector("#modal-close-button").addEventListener("click",n)}(e),a(e)})).catch((e=>console.log(e)))}));const a=e=>{const i=document.querySelector("#watched-button"),t=document.querySelector("#queue-button"),n=(e,i)=>{let t=JSON.parse(localStorage.getItem(i));if(null===t&&(t=[]),t.find((i=>i.id===e.id)))return void console.log("Is on list");console.log(e.id),t.push(e),console.log(t);const n=JSON.stringify(t);localStorage.setItem(i,n)};i.addEventListener("click",(()=>{n(e,"watched")})),t.addEventListener("click",(()=>{n(e,"queue")}))},s=document.querySelector("#user-watched-btn"),o=document.querySelector("#user-queue-btn");s.addEventListener("focus",(()=>{o.classList.remove("button--active"),s.classList.add("button--active")})),o.addEventListener("focus",(()=>{s.classList.remove("button--active"),o.classList.add("button--active")}));let l=[];const c=e=>{try{const t=JSON.parse(localStorage.getItem(e));if(console.log(t),null===t)return;return t.forEach((e=>{console.log(e),console.log(l);const t=e.genres.map((e=>{const i=l.find((i=>i.id===e));return i?i.name.toString():""})).join(", "),n=new Date(e.release_date).toLocaleDateString("en-US",{year:"numeric",month:void 0,day:void 0});i.main.insertAdjacentHTML("beforeend",`\n        <ul id="main__list" class="main__list">\n          <li id="main__list-item" class="main__list-item">\n            <figure id="main__movie" class="main__movie">\n              <img id="${e.id}" class="main__image"\n                src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.title}" />\n              <figcaption id="main__caption" class="main__caption">\n                <span id="main__movie-name" class="main__movie-name">\n                  ${e.original_title}\n                </span>\n                <div>\n                <span id="main__movie-genres" class="main__movie-data">${t}</span>\n                <span class="main__movie-data">|</span>\n                <span id="main__movie-release-date" class="main__movie-release-date main__movie-data">\n                ${n}\n                </span>\n                </div>\n              </figcaption>\n            </figure>\n          </li>\n        </ul>\n      `)})),t}catch(e){alert(`There was a mistake ${e.toString()}`)}},d=document.querySelector("#user-queue-btn"),m=document.querySelector("#user-watched-btn");d.addEventListener("click",(()=>{console.log("queue btn"),i.main.innerHTML=" ",c("queue")})),m.addEventListener("click",(()=>{console.log("watched btn"),i.main.innerHTML=" ",c("watched")})),c("watched");
//# sourceMappingURL=library.3c4e7298.js.map
