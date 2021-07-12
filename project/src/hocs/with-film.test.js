import React from 'react';
import {render, screen} from '@testing-library/react';
import withFilm from './with-film';
import {AppRoute, AuthorizationStatus} from '../const';
import rootReducer from '../store/root-reducer';
import FilmScreen from '../components/film-screen/film-screen';
import {configureStore} from '@reduxjs/toolkit';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';

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

const fakeStore = {
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

describe('HOC: withFilm', () => {
  it('component should render correctly when used with HOC', () => {
    const FilmScreenWrapped = withFilm(FilmScreen);
    const mockStore = configureStore({preloadedState: fakeStore, reducer: rootReducer});
    const history = createMemoryHistory();
    history.push(`/films/${FILM.id}`);

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Route path={AppRoute.FILM} exact>
            <FilmScreenWrapped film={FILM} />
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
  });
});
