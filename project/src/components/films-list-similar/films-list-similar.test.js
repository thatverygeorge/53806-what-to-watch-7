import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import FilmsListSimilar from './films-list-similar';
import rootReducer from '../../store/root-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

const FILMS = [
  {
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
  },
  {
    id: 2,
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
  },
];

const storeFull = {
  FILMS: {
    similar: {
      data: FILMS,
      isDataLoaded: true,
    },
  },
};

const storeEmpty = {
  FILMS: {
    similar: {
      data: undefined,
      isDataLoaded: true,
    },
  },
};

describe('Component: FilmsListSimilar', () => {
  it('should render correctly', () => {
    let mockStore = configureStore({preloadedState: storeFull, reducer: rootReducer});
    const history = createMemoryHistory();

    const {rerender} = render(
      <Provider store={mockStore}>
        <Router history={history}>
          <FilmsListSimilar id={undefined} />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('More like this list is empty', {exact: true})).not.toBeInTheDocument();
    expect(screen.getByText('More like this', {exact: true})).toBeInTheDocument();
    expect(document.querySelector('.catalog__films-list')).toBeInTheDocument();

    mockStore = configureStore({preloadedState: storeEmpty, reducer: rootReducer});

    rerender(
      <Provider store={mockStore}>
        <Router history={history}>
          <FilmsListSimilar id={undefined} />
        </Router>
      </Provider>,
    );
    expect(screen.queryByText('More like this', {exact: true})).not.toBeInTheDocument();
    expect(screen.getByText('More like this list is empty', {exact: true})).toBeInTheDocument();
    expect(document.querySelector('.catalog__films-list')).not.toBeInTheDocument();
  });
});
