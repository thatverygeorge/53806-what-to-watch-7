import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import PlayerScreen from './player-screen';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../../store/root-reducer';
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

const state = {
  USER: {authorizationStatus: AuthorizationStatus.AUTH},
  FILMS: {
    film: {
      data: FILM,
      isDataLoaded: true,
    },
  },
};

describe('Component: PlayerScreen', () => {
  it('should render correctly', () => {
    const mockStore = configureStore({preloadedState: state, reducer: rootReducer});
    const history = createMemoryHistory();
    history.push(`/player/${FILM.id}`);

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Route exact path={AppRoute.PLAYER}>
            <PlayerScreen film={FILM} />
          </Route>
        </Router>
      </Provider>,
    );

    expect(document.querySelector('.player__exit')).toBeInTheDocument();
    expect(document.querySelector('.player__video')).toBeInTheDocument();
  });

  it('should redirect to main page when user clicks on exit button', () => {
    const mockStore = configureStore({preloadedState: state, reducer: rootReducer});
    const history = createMemoryHistory();
    history.push(`/player/${FILM.id}`);

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.MAIN}>
              <h1>This is main page</h1>
            </Route>
            <Route exact path={AppRoute.PLAYER}>
              <PlayerScreen film={FILM} />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('This is main page')).not.toBeInTheDocument();
    userEvent.click((document.querySelector('.player__exit')));
    expect(screen.getByText('This is main page')).toBeInTheDocument();
  });
});
