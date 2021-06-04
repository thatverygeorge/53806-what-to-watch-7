import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {FILMS_TITLES, FILMS_IMAGES, PROMO_FILM} from './const';

const films = FILMS_TITLES.map((title, i) => ({title, src: FILMS_IMAGES[i]}));

ReactDOM.render(
  <React.StrictMode>
    <App
      promoFilm={PROMO_FILM}
      films={films}
    />
  </React.StrictMode>,
  document.getElementById('root'),
);
