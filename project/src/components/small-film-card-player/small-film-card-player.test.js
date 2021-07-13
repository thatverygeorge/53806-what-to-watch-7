import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import SmallFilmCardPlayer from './small-film-card-player';

const FILM = {
  id: 1,
  name: 'Pulp Fiction',
  posterImage: 'img/the-grand-budapest-hotel-poster.jpg',
  previewImage: 'img/pulp-fiction.jpg',
  backgroundImage: 'img/bg-the-grand-budapest-hotel.jpg',
  backgroundColor: '#ffffff',
  videoLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
  previewVideoLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
  description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
  rating: 8.9,
  scoresCount: 1900,
  director: 'Quentin Tarantino',
  starring: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
  runTime: 154,
  genre: 'Crime',
  released: 1994,
  isFavorite: true,
};

describe('Component: SmallFilmCardPlayer', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = () => {};
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
  });


  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <SmallFilmCardPlayer film={FILM} />;
      </Router>,
    );

    expect(document.querySelector('.player__video')).toBeInTheDocument();
    expect(document.querySelector('.player__video').getAttribute('src')).toEqual(FILM.previewVideoLink);
    expect(document.querySelector('.player__video').getAttribute('poster')).toEqual(FILM.previewImage);
  });
});
