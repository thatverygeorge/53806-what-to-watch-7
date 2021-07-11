import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ButtonMyList from './button-my-list';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../../store/root-reducer';
import {AppRoute, AuthorizationStatus} from '../../const';
import userEvent from '@testing-library/user-event';

const FAVORITE_FILM = {
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

const NOT_FAVORITE_FILM = {
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
  isFavorite: false,
};

const store = {
  USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
};

describe('Component: ButtonMyList', () => {
  it('should render correctly when film is favorite', () => {
    const mockStore = configureStore({reducer: rootReducer});
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <ButtonMyList film={FAVORITE_FILM} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(document.querySelector('use').getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toEqual('#in-list');
  });

  it('should render correctly when film is not favorite', () => {
    const mockStore = configureStore({reducer: rootReducer});
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <ButtonMyList film={NOT_FAVORITE_FILM} />
        </Router>
      </Provider>,
    );

    expect(document.querySelector('use').getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toEqual('#add');
  });

  it('should redirect to sign in page when authorization status is equal NO_AUTH', () => {
    const mockStore = configureStore({preloadedState: store, reducer: rootReducer});
    const history = createMemoryHistory();
    history.push('/fake');

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.SIGN_IN} exact>
              <h1>This is sign in page</h1>
            </Route>
            <Route>
              <ButtonMyList film={FAVORITE_FILM} />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('This is sign in page')).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText('This is sign in page')).toBeInTheDocument();
  });
});
