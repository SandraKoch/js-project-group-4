const n=document.getElementById("loader");window.addEventListener("load",(()=>{const e=new XMLHttpRequest;e.addEventListener("loadstart",(()=>{n.classList.add("active")})),e.addEventListener("loadend",(()=>{n.classList.remove("active")})),n.style.display="block",setTimeout((function(){n.style.display="none"}),250)}));const e=document.querySelector("#main");let a=[];(()=>{try{const n=JSON.parse(localStorage.getItem("watched"));if(console.log(n),null===n)return;n.forEach((n=>{console.log(n),console.log(a);const i=n.genres.map((n=>{const e=a.find((e=>e.id===n));return e?e.name.toString():""})).join(", "),t=new Date(n.release_date).toLocaleDateString("en-US",{year:"numeric",month:void 0,day:void 0});e.insertAdjacentHTML("beforeend",`\n        <ul id="main__list" class="main__list">\n          <li id="main__list-item" class="main__list-item">\n            <figure id="main__movie" class="main__movie">\n              <img id="${n.id}" class="main__image"\n                src="https://image.tmdb.org/t/p/w500${n.poster_path}" alt="${n.title}" />\n              <figcaption id="main__caption" class="main__caption">\n                <span id="main__movie-name" class="main__movie-name">\n                  ${n.original_title}\n                </span>\n                <div>\n                <span id="main__movie-genres" class="main__movie-data">${i}</span>\n                <span class="main__movie-data">|</span>\n                <span id="main__movie-release-date" class="main__movie-release-date main__movie-data">\n                ${t}\n                </span>\n                </div>\n              </figcaption>\n            </figure>\n          </li>\n        </ul>\n      `)}))}catch(n){alert(`There was a mistake ${n.toString()}`)}})();
//# sourceMappingURL=library.a76e16fb.js.map
