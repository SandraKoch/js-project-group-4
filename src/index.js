import './sass/main.scss';
import './javascript/loader.js';
import './javascript/pagination';
import { config } from './javascript/config';
import { initTrendingMovies } from './javascript/fetchTrendingMovies';
import './javascript/modal';
import './javascript/backToTop';
import { initModal } from './javascript/modal';

initTrendingMovies();
initModal();
