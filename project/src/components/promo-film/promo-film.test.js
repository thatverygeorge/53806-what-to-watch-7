import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import PromoFilm from './promo-film';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../../store/root-reducer';

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

const state = {
  FILMS: {
    promoFilm: FILM,
  },
};

describe('Component: PromoFilm', () => {
  it('should render correctly', () => {
    const mockStore = configureStore({preloadedState: state, reducer: rootReducer});
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <PromoFilm />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(FILM.name)).toBeInTheDocument();
    expect(screen.getByText(FILM.genre)).toBeInTheDocument();
    expect(screen.getByText(FILM.released)).toBeInTheDocument();
  });
});
