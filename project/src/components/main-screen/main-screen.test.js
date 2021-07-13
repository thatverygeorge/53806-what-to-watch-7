import React from 'react';
import {render, screen} from '@testing-library/react';
import {Route, Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import MainScreen from './main-screen';
import rootReducer from '../../store/root-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';

const GENRE = 'All genres';

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

const FILMS = new Array(10).fill(null).map((_, i) => {
  const film = Object.assign({}, FILM);
  film.id = i;

  return film;
});

const storeFull = {
  USER: {authorizationStatus: AuthorizationStatus.AUTH},
  FILMS: {
    films: {
      data: FILMS,
      isDataLoaded: true,
    },
    promoFilm: FILM,
  },
  UTIL: {
    genre: GENRE,
  },
};

const storeEmpty = {
  USER: {authorizationStatus: AuthorizationStatus.AUTH},
  FILMS: {
    films: {
      data: [],
      isDataLoaded: true,
    },
    promoFilm: FILM,
  },
  UTIL: {
    genre: GENRE,
  },
};

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    let mockStore = configureStore({preloadedState: storeFull, reducer: rootReducer});
    const history = createMemoryHistory();
    history.push(AppRoute.MAIN);

    const {rerender} = render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Route path={AppRoute.MAIN} exact>
            <MainScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(document.querySelector('.film-card')).toBeInTheDocument();
    expect(document.querySelector('.catalog__genres-list')).toBeInTheDocument();
    expect(document.querySelector('.catalog__films-list')).toBeInTheDocument();
    expect(document.querySelector('.page-footer')).toBeInTheDocument();

    expect(screen.getByText(FILM.name, { exact: false, selector: 'h2' })).toBeInTheDocument();
    expect(screen.getByText(FILM.genre, { exact: false, selector: 'span' })).toBeInTheDocument();
    expect(screen.getByText(`${FILM.released}`, { exact: false, selector: 'span' })).toBeInTheDocument();
    expect(screen.getByText(GENRE, 'i')).toBeInTheDocument();
    expect(screen.getByText('Show more')).toBeInTheDocument();

    mockStore = configureStore({preloadedState: storeEmpty, reducer: rootReducer});

    rerender(
      <Provider store={mockStore}>
        <Router history={history}>
          <Route path={AppRoute.MAIN} exact>
            <MainScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('Show more')).not.toBeInTheDocument();
  });
});
