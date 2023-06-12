window.addEventListener("load",(function(){var e=document.getElementById("loader");e.style.display="block",setTimeout((function(){e.style.display="none"}),1e3)}));const e=document.getElementById("previous-btn"),i=document.getElementById("next-btn"),n=document.getElementById("pagination"),t=20;let a=1;function o(){n.innerHTML="",a>3&&(s(1),a>4&&l());const o=Math.max(a-2,1),c=Math.min(a+2,t);for(let e=o;e<=c;e++)s(e);a<18&&(a<17&&l(),s(t)),e.disabled=1===a,i.disabled=a===t}function s(e){const i=document.createElement("li"),t=document.createElement("button");t.innerText=e,t.classList.add("pagination__element"),e===a&&t.classList.add("pagination__element--active"),t.addEventListener("click",(()=>{a=e,o()})),i.appendChild(t),n.appendChild(i)}function l(){const e=document.createElement("li"),i=document.createElement("span");i.innerText="...",e.appendChild(i),n.appendChild(e)}o(),e.addEventListener("click",(()=>{a>1&&(a--,o())})),i.addEventListener("click",(()=>{a<t&&(a++,o())}));document.querySelector("#search-input");const c=document.querySelector("#main");let d=[];fetch("https://api.themoviedb.org/3/genre/movie/list?language=en",{method:"GET",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTgwNWJlNDdjMjBhOTk3N2QwNjY5MTIwYjZhZGQ0YSIsInN1YiI6IjY0ODIyOWYyZDJiMjA5MDBlYmJmM2RiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QBYkVP1Y4DcB7g5RndWRVtYQ8Tp2I0wKn0TtL28dElE"}}).then((e=>e.json())).then((e=>{d=e.genres,console.log("genresArr",d)})).catch((e=>console.error(e)));const m={method:"GET",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTgwNWJlNDdjMjBhOTk3N2QwNjY5MTIwYjZhZGQ0YSIsInN1YiI6IjY0ODIyOWYyZDJiMjA5MDBlYmJmM2RiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QBYkVP1Y4DcB7g5RndWRVtYQ8Tp2I0wKn0TtL28dElE"}};fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US",m).then((e=>e.json())).then((({results:e})=>{c.innerHTML="",e.forEach(((e,i)=>{console.log(e,i);const n=e.genre_ids.map((e=>{const i=d.find((i=>i.id===e));return i?i.name:""})).join(", "),t=new Date(e.release_date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});c.insertAdjacentHTML("beforeend",`\n        <ul id="main__list" class="main__list">\n          <li id="main__list-item" class="main__list-item">\n            <figure id="main__movie" class="main__movie">\n              <img id="${e.id}" class="main__image"\n                src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.title}" />\n              <figcaption id="main__caption" class="main__caption">\n                <span id="main__movie-name" class="main__movie-name">\n                  ${e.original_title}\n                </span>\n                <span id="main__movie-release-date" class="main__movie-release-date">\n                  ${t}\n                </span>\n                <span id="main__movie-genres" class="main__movie-genres">\n                  ${n}\n                </span>\n              </figcaption>\n            </figure>\n          </li>\n        </ul>\n      `)}))})).catch((e=>console.error(e)));const r=document.querySelector("#main");setTimeout((()=>{const e=document.querySelector("#modal-close-button");let i=document.querySelectorAll(".main__image");const n=document.querySelector("#backdrop"),t=function(){n.classList.remove("is-hidden")};i.forEach((e=>{e.addEventListener("click",t)})),e.addEventListener("click",(function(){n.classList.add("is-hidden")}))}),1e3),r.addEventListener("click",(e=>{var i;console.log(e.target.id),(i=e.target.id,fetch(`https://api.themoviedb.org/3/movie/${i}`,m).then((e=>e.json())).catch((e=>console.log(e)))).then((e=>{console.log(e),function(e){modal.innerHTML="",modal.insertAdjacentHTML("beforeend",`<button id="modal-close-button" class="modal-close-button">\n  <svg class="close-button" width="30px" height="30px">\n    <use href="./images/close.svg#close"></use>\n  </svg>\n</button>\n<div id="image-box" class="image-box">\n  <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" id="image-box__image" class="image-box__image" />\n</div>\n<div id="movie-info" class="movie-info">\n  <h2 id="movie-title" class="movie-title">${e.title}</h2>\n\n  <div class="movie-details">\n    <ul class="movie-details__list">\n      <li class="movie-details__item">\n        <p class="movie-details__aspect">Vote / Votes</p>\n\n        \x3c!--przykładowe wartości--\x3e\n        <p id="movie-details__value" class="movie-details__value">\n          <span id="movie-rating" class="movie-rating">${e.vote_average}/</span>/<span\n            id="movie-votes"\n            class="movie-votes"\n            >${e.vote_count}</span\n          >\n        </p>\n      </li>\n\n      <li class="movie-details__item">\n        <p class="movie-details__aspect">Popularity</p>\n        \x3c!--przykładowe wartości--\x3e\n        <p id="movie-details__value" class="movie-details__value">\n          <span id="movie-popularity" class="movie-popularity">${e.popularity}</span>\n        </p>\n      </li>\n\n      <li class="movie-details__item">\n        <p class="movie-details__aspect">${e.original_title}</p>\n        \x3c!--przykładowe wartości--\x3e\n        <p id="movie-details__value" class="movie-details__value">\n          <span id="orginal-movie-title" class="orginal-movie-title">Orginal Title</span>\n        </p>\n      </li>\n\n      <li class="movie-details__item">\n        <p class="movie-details__aspect">Genre</p>\n        \x3c!--przykładowe wartości--\x3e\n        <p id="movie-details__value" class="movie-details__value">\n          <span id="movie-genre" class="movie-genre">Wester</span>\n        </p>\n      </li>\n    </ul>\n  </div>\n  <div class="movie-description">\n    <p class="movie-description__about">ABOUT</p>\n    <p id="movie-description__description" class="movie-description__description">\n      Lorem ipsum dolor sit amet consectetur adipisicing elit. A labore ut quo. Maxime corrupti\n      quasi quos sed molestias nisi delectus tempore est, commodi sit repudiandae, dolor\n      praesentium veniam. Corrupti maiores voluptate tenetur ullam enim, at deleniti unde\n      dignissimos porro dolores perferendis accusantium harum animi reprehenderit obcaecati\n      molestiae sunt doloremque earum.\n    </p>\n  </div>\n  <div class="buttons-box">\n    <button type="button" id="watched-button" class="watched-button">ADD TO WATCHED</button>\n    <button type="button" id="queue-button" class="queue-button">ADD TO QUEUE</button>\n  </div>\n</div>`)}(e)})).catch((e=>console.log(e)))}));
//# sourceMappingURL=index.26c1ee9b.js.map
