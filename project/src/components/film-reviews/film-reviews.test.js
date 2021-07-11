import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import FilmReviews from './film-reviews';
import rootReducer from '../../store/root-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

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

const REVIEWS = [
  {
    id: 1,
    user: {
      id: 3,
      name: 'Kate Muir',
    },
    rating: 8.9,
    comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed movies in years.',
    date: '2019-05-08T14:13:56.569Z',
  },
  {
    id: 2,
    user: {
      id: 4,
      name: 'Kate Muir',
    },
    rating: 8.9,
    comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed movies in years.',
    date: '2019-05-08T14:13:56.569Z',
  },
];

const storeFull = {
  FILMS: {
    film: {
      data: FILM,
      isDataLoaded: true,
    },
    reviews: {
      data: REVIEWS,
      isDataLoaded: true,
    },
  },
};

const storeEmpty = {
  FILMS: {
    film: {
      data: FILM,
      isDataLoaded: true,
    },
    reviews: {
      data: undefined,
      isDataLoaded: true,
    },
  },
};

describe('Component: FilmReviews', () => {
  it('should render correctly', () => {
    let mockStore = configureStore({preloadedState: storeFull, reducer: rootReducer});
    const history = createMemoryHistory();

    const {rerender} = render(
      <Provider store={mockStore}>
        <Router history={history}>
          <FilmReviews />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('Reviews list is empty', {exact: true})).not.toBeInTheDocument();
    expect(document.querySelector('.film-card__reviews')).toBeInTheDocument();

    mockStore = configureStore({preloadedState: storeEmpty, reducer: rootReducer});

    rerender(
      <Provider store={mockStore}>
        <Router history={history}>
          <FilmReviews />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('Reviews list is empty', {exact: true})).toBeInTheDocument();
    expect(document.querySelector('.film-card__reviews')).not.toBeInTheDocument();
  });
});
