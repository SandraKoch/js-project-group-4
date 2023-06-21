var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},a=e.parcelRequire0a46;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in t){var a=t[e];delete t[e];var i={id:e,exports:{}};return n[e]=i,a.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){t[e]=n},e.parcelRequire0a46=a);var i=a("eTQlF"),o=a("kKgoE");function s(){i.refs.loader.classList.add("active")}function r(){i.refs.loader.classList.remove("active")}i.refs.searchFormElement.addEventListener("submit",(function(e){e.preventDefault(),function(){const e=i.refs.searchInputElement.value.trim();if(""!==e){const n=new XMLHttpRequest;n.addEventListener("loadstart",(()=>{s()})),n.addEventListener("loadend",(()=>{r()}));const t=`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(e)}&api_key=${o.API_KEY}`;n.open("GET",t,!0),n.setRequestHeader("Content-Type","application/json"),n.onload=function(){if(200===n.status){const e=JSON.parse(n.responseText);console.log(e)}else console.error("Wystąpił błąd podczas żądania API.")},n.onerror=function(){console.error("Wystąpił błąd podczas żądania API.")},n.send()}}()})),s(),setTimeout((function(){r()}),250),window.addEventListener("beforeunload",(function(){s()}));o=a("kKgoE");var l=a("apLMo");i=a("eTQlF"),o=a("kKgoE");let c=[],d=null,p="",m="";async function u(e,n){return p="search",fetch(`https://api.themoviedb.org/3/search/movie?query=${e}&include_adult=false&page=${n}`,o.options).then((e=>e.json())).then((e=>e)).catch((e=>console.error(e)))}function f(e){const n=e.results;i.refs.main.innerHTML="",n.forEach((e=>{const n=e.genre_ids.map((e=>{const n=c.find((n=>n.id===e));return n?n.name.toString():""})).join(", "),t=new Date(e.release_date).toLocaleDateString("en-US",{year:"numeric",month:void 0,day:void 0});i.refs.main.insertAdjacentHTML("beforeend",`\n      <li id="main__element" class="main__element">\n        <div id="main__item" class="main__item">\n          <figure id="main__movie" class="main__movie">\n            <img id="${e.id}" class="main__image"\n              src="${e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"https://github.com/SandraKoch/js-project-group-4/blob/main/src/images/no-image-here.png?raw=true"}" alt="${e.title}" />\n            <figcaption id="main__caption" class="main__caption">\n              <span id="main__movie-name" class="main__movie-name">\n                ${e.original_title}\n              </span>\n              <div>\n              <span id="main__movie-genres" class="main__movie-data">${n}</span>\n              <span class="main__movie-data">|</span>\n              <span id="main__movie-release-date" class="main__movie-release-date main__movie-data">\n                ${t}\n              </span>\n              </div>\n            </figcaption>\n          </figure>\n        </li>\n      </ul>`)}))}function g(e=1){return p="popular",fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${e}`,o.options).then((e=>e.json())).catch((e=>console.error(e)))}async function h(e,n){p="genre";const t=await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${e}&include_adult=false&page=${n}`,o.options);return await t.json()}l=a("apLMo"),i=a("eTQlF");let v=1,_=20;function y(e,n){const t=document.createElement("li"),a=document.createElement("button");return a.classList.add("pagination__element","pagination__element--button"),a.textContent=e,a.addEventListener("click",(()=>{e!==v&&(v=e,L()),scroll(0,0)})),n&&a.classList.add("active"),t.appendChild(a),t}function E(){const e=document.createElement("li"),n=document.createElement("span");return n.classList.add("pagination__element","pagination__element--ellipsis"),n.textContent="...",e.appendChild(n),e}async function L(){const e=p;let n;if("search"===e){const e=m;n=await u(e,v)}else if("popular"===e)n=await g(v);else{const e=d;n=await h(e,v)}n.results.length?(f(n),_=n.total_pages,b(_)):(i.refs.main.innerHTML="",l.Notify.failure("Oops, there are no movies matching your search query. Please try again."))}function b(e){const n=Math.min(e,500);i.refs.paginationList.innerHTML="";const t=Math.floor(2.5);let a,o;v<=t?(a=1,o=Math.min(5,n)):v>n-t?(a=1,o=n,n>5&&(a=n-5+1,i.refs.paginationList.appendChild(y(1,!1)),i.refs.paginationList.appendChild(E()))):(a=v-t+1,o=v+t-1,i.refs.paginationList.appendChild(y(1,!1)),i.refs.paginationList.appendChild(E()));for(let e=a;e<=o;e++){const n=e===v;i.refs.paginationList.appendChild(y(e,n))}o<n&&i.refs.paginationList.appendChild(E());const s=y(n,!1);i.refs.paginationList.appendChild(s),i.refs.previousButton.disabled=1===v,i.refs.nextButton.disabled=v===_}i.refs.previousButton.addEventListener("click",(()=>{v>1&&(v--,L()),scroll(0,0)})),i.refs.nextButton.addEventListener("click",(()=>{v++,L(),scroll(0,0)})),b(_),a("kKgoE");var w=a("1Go4p");window.addEventListener("scroll",(function(){var e=document.getElementById("back-to-top");window.scrollY>250?e.style.display="block":e.style.display="none"})),window.addEventListener("DOMContentLoaded",(function(){document.getElementById("back-to-top").addEventListener("click",(function(e){e.preventDefault(),document.querySelector("#header").scrollIntoView({behavior:"smooth"})}))}));w=a("1Go4p");a("j30ED"),Promise.all([fetch("https://api.themoviedb.org/3/genre/movie/list?language=en",o.options).then((e=>e.json())).catch((e=>console.error(e))),g()]).then((e=>{const[n,t]=e;c=n.genres,i.refs.main.innerHTML="",f(t),b(t.total_pages);const a=document.getElementById("genres");c.forEach((e=>{const n=document.createElement("button");n.classList.add("button"),n.textContent=e.name,n.addEventListener("click",(async()=>{d=e.id;const n=await h(d,1);f(n),b(n.total_pages)})),a.appendChild(n)}))})),i.refs.searchFormElement&&i.refs.searchFormElement.addEventListener("submit",(async e=>{e.preventDefault();const n=i.refs.searchInputElement.value.trim();m=n;const t=await u(n,1);b(t.total_pages),""!==n?(!function(e){if(e.results.length){f(e);const n=e.total_results;l.Notify.success(`Hooray! You have found ${n} movies matching your query`)}else l.Notify.failure("Oops, there are no movies matching your search query. Please try again.")}(t),document.getElementById("genres").style.display="none"):l.Notify.info("Please, enter the movie name to start search")})),(0,w.initModal)();
//# sourceMappingURL=index.f32282e4.js.map