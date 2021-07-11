import React from 'react';
import {render, screen} from '@testing-library/react';
import {Route, Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import FilmScreen from './film-screen';
import rootReducer from '../../store/root-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import userEvent from '@testing-library/user-event';

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

const fakeStoreAUTH = {
  USER: {authorizationStatus: AuthorizationStatus.AUTH},
  FILMS: {
    film: {
      data: FILM,
      isDataLoaded: true,
    },
    similar: {
      data: undefined,
      isDataLoaded: true,
    },
  },
};

const fakeStoreNOAUTH = {
  USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
  FILMS: {
    film: {
      data: FILM,
      isDataLoaded: true,
    },
    similar: {
      data: undefined,
      isDataLoaded: true,
    },
  },
};

describe('Component: FilmScreen', () => {
  it('should render correctly', () => {
    let mockStore = configureStore({preloadedState: fakeStoreAUTH, reducer: rootReducer});
    const history = createMemoryHistory();
    history.push(`/films/${FILM.id}`);

    const {rerender} = render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Route path={AppRoute.FILM} exact>
            <FilmScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(`${FILM.name}`, {exact: true})).toBeInTheDocument();
    expect(screen.getByText(`${FILM.genre}`, {exact: true})).toBeInTheDocument();
    expect(screen.getByText(`${FILM.released}`, {exact: true})).toBeInTheDocument();

    expect(document.querySelector('.logo')).toBeInTheDocument();
    expect(document.querySelector('.film-card__desc')).toBeInTheDocument();
    expect(document.querySelector('.catalog--like-this')).toBeInTheDocument();
    expect(document.querySelector('.page-footer')).toBeInTheDocument();

    expect(screen.getByText('Play', {exact: true})).toBeInTheDocument();
    expect(screen.getByText('My list', {exact: true})).toBeInTheDocument();
    expect(screen.getByText('Add review', {exact: true})).toBeInTheDocument();

    mockStore = configureStore({preloadedState: fakeStoreNOAUTH, reducer: rootReducer});

    rerender(
      <Provider store={mockStore}>
        <Router history={history}>
          <Route path={AppRoute.FILM} exact>
            <FilmScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('Add review', {exact: true})).not.toBeInTheDocument();
  });

  it('should redirect to add review page on link click', () => {
    const mockStore = configureStore({preloadedState: fakeStoreAUTH, reducer: rootReducer});
    const history = createMemoryHistory();
    history.push(`/films/${FILM.id}`);

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Route path={`/films/${FILM.id}/review`} exact>
            <h1>This is add review page</h1>
          </Route>
          <Route path={AppRoute.FILM} exact>
            <FilmScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('This is add review page', {exact: true})).not.toBeInTheDocument();
    userEvent.click((screen.getByText('Add review', {exact: true})));
    expect(screen.getByText('This is add review page', {exact: true})).toBeInTheDocument();
  });
});
