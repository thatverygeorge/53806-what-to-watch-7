import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import AddReviewScreen from './add-review-screen';
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

const store = {
  USER: {authorizationStatus: AuthorizationStatus.AUTH},
  FILMS: {
    film: {
      data: FILM,
      isDataLoaded: true,
    },
  },
};

describe('Component: AddReviewScreen', () => {
  it('should render correctly', () => {
    const mockStore = configureStore({preloadedState: store, reducer: rootReducer});
    const history = createMemoryHistory();
    history.push(`/films/${FILM.id}/review`);

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Route path={AppRoute.ADD_REVIEW} exact>
            <AddReviewScreen film={FILM} />
          </Route>
        </Router>
      </Provider>,
    );

    const breadcrumbs = document.querySelectorAll('.breadcrumbs__link');
    expect(breadcrumbs).toHaveLength(2);

    expect(document.querySelector('.film-card__bg img').getAttribute('src')).toBe(FILM.backgroundImage);
    expect(document.querySelector('.film-card__bg img').getAttribute('alt')).toBe(FILM.name);

    expect(document.querySelector('.film-card__poster img').getAttribute('src')).toBe(FILM.posterImage);
    expect(document.querySelector('.film-card__poster img').getAttribute('alt')).toBe(`${FILM.name} poster`);

    expect(document.querySelector('.logo')).toBeInTheDocument();
    expect(document.querySelector('.user-block')).toBeInTheDocument();
    expect(document.querySelector('.add-review__form')).toBeInTheDocument();
  });

  it('should redirect to film page on breadcrumbs click', () => {
    const mockStore = configureStore({preloadedState: store, reducer: rootReducer});
    const history = createMemoryHistory();
    history.push(`/films/${FILM.id}/review`);

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Route path={`/films/${FILM.id}`} exact>
            <h1>This is film page</h1>
          </Route>
          <Route path={AppRoute.ADD_REVIEW} exact>
            <AddReviewScreen film={FILM} />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('This is film page')).not.toBeInTheDocument();
    userEvent.click(document.querySelector('.breadcrumbs__link'));
    expect(screen.getByText('This is film page')).toBeInTheDocument();
  });
});
