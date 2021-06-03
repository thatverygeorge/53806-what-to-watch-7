import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const FILMS_TITLES = [
  'Fantastic Beasts: The Crimes of Grindelwald',
  'Bohemian Rhapsody',
  'Macbeth',
  'Aviator',
  'We need to talk about Kevin',
  'What We Do in the Shadows',
  'Revenant',
  'Johnny English',
  'Shutter Island',
  'Pulp Fiction',
  'No Country for Old Men',
  'Snatch',
  'Moonrise Kingdom',
  'Seven Years in Tibet',
  'Midnight Special',
  'War of the Worlds',
  'Dardjeeling Limited',
  'Orlando',
  'Mindhunter',
  'Midnight Special',
];

const FILMS_IMAGES = [
  'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
  'img/bohemian-rhapsody.jpg',
  'img/macbeth.jpg',
  'img/aviator.jpg',
  'img/we-need-to-talk-about-kevin.jpg',
  'img/what-we-do-in-the-shadows.jpg',
  'img/revenant.jpg',
  'img/johnny-english.jpg',
  'img/shutter-island.jpg',
  'img/pulp-fiction.jpg',
  'img/no-country-for-old-men.jpg',
  'img/snatch.jpg',
  'img/moonrise-kingdom.jpg',
  'img/seven-years-in-tibet.jpg',
  'img/midnight-special.jpg',
  'img/war-of-the-worlds.jpg',
  'img/dardjeeling-limited.jpg',
  'img/orlando.jpg',
  'img/mindhunter.jpg',
  'img/midnight-special.jpg',
];

const PROMO_FILM = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: 2014,
  src: 'img/the-grand-budapest-hotel-poster.jpg',
};

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
