var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},i=e.parcelRequire0a46;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in a){var i=a[e];delete a[e];var t={id:e,exports:{}};return n[e]=t,i.call(t.exports,t,t.exports),t.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,n){a[e]=n},e.parcelRequire0a46=i),i("1Go4p");const t=document.querySelector("#user-watched-btn"),s=document.querySelector("#user-queue-btn");t.addEventListener("focus",(()=>{s.classList.remove("button--active"),t.classList.add("button--active")})),s.addEventListener("focus",(()=>{t.classList.remove("button--active"),s.classList.add("button--active")}));var o=i("eTQlF");const r=e=>{try{const n=JSON.parse(localStorage.getItem(e));if(null===n)return;return n.forEach((e=>{let n=[];n=e.genres.map((e=>e.name)).join(", ");const a=new Date(e.release_date).toLocaleDateString("en-US",{year:"numeric",month:void 0,day:void 0});o.refs.main.insertAdjacentHTML("beforeend",`\n        <li id="main__element" class="main__element">\n          <div id="main__item" class="main__item">\n            <figure id="main__movie" class="main__movie">\n              <img id="${e.id}" class="main__image"\n                src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.title}" />\n              <figcaption id="main__caption" class="main__caption">\n                <span id="main__movie-name" class="main__movie-name">\n                  ${e.original_title}\n                </span>\n                <div>\n                <span id="main__movie-genres" class="main__movie-data">${n}</span>\n                <span class="main__movie-data">|</span>\n                <span id="main__movie-release-date" class="main__movie-release-date main__movie-data">\n                ${a}\n                </span>\n                </div>\n              </figcaption>\n            </figure>\n          </li>\n        </ul>\n      `)})),n}catch(e){console.log(`There was a mistake ${e.toString()}`)}},d=document.querySelector("#user-queue-btn"),c=document.querySelector("#user-watched-btn");d.addEventListener("click",(()=>{o.refs.main.innerHTML=" ",r("queue")})),c.addEventListener("click",(()=>{o.refs.main.innerHTML=" ",r("watched")})),r("watched");
//# sourceMappingURL=library.fef1ae1f.js.map