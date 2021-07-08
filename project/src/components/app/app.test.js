import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus, AppRoute} from '../../const';
import userEvent from '@testing-library/user-event';
import App from './app';

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

const REVIEW = {
  id: 1,
  user: {
    id: 4,
    name: 'Kate Muir',
  },
  rating: 8.9,
  comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed movies in years.',
  date: '2019-05-08T14:13:56.569Z',
};

const fakeStoreAUTH = {
  USER: {authorizationStatus: AuthorizationStatus.AUTH},
  FILMS: {
    films: {
      data: [
        FILM,
      ],
      isDataLoaded: true,
    },
    promoFilm: FILM,
    film: {
      data: FILM,
      isDataLoaded: true,
    },
    reviews: {
      data: [
        REVIEW,
      ],
      isDataLoaded: true,
    },
    similar: {
      data: [
        FILM,
      ],
      isDataLoaded: true,
    },
    favorite: {
      data: [
        FILM,
      ],
      isDataLoaded: true,
    },
  },
  UTIL: {
    genre: GENRE,
  },
};

const fakeStoreNOAUTH = {
  USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
  FILMS: {
    films: {
      data: [
        FILM,
      ],
      isDataLoaded: true,
    },
    promoFilm: FILM,
    film: {
      data: FILM,
      isDataLoaded: true,
    },
    reviews: {
      data: [
        REVIEW,
      ],
      isDataLoaded: true,
    },
    similar: {
      data: [
        FILM,
      ],
      isDataLoaded: true,
    },
    favorite: {
      data: [
        FILM,
      ],
      isDataLoaded: true,
    },
  },
  UTIL: {
    genre: GENRE,
  },
};

let history = null;
let storeAUTH = null;
let fakeAppAUTH = null;

describe('Application Routing', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    storeAUTH = createFakeStore(fakeStoreAUTH);

    fakeAppAUTH = (
      <Provider store={storeAUTH}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  });

  it('should render "MainScreen" when user navigates to "/"', () => {
    history.push(AppRoute.MAIN);
    render(fakeAppAUTH);

    expect(screen.getByText(FILM.name, { exact: false, selector: 'h2' })).toBeInTheDocument();
    expect(screen.getByText(FILM.genre, { exact: false, selector: 'span' })).toBeInTheDocument();
    expect(screen.getByText(`${FILM.released}`, { exact: false, selector: 'span' })).toBeInTheDocument();
    expect(screen.getByText(GENRE, 'i')).toBeInTheDocument();
  });

  it('should render "SignInScreen" when user navigates to "/login"', () => {
    const createFakeStore = configureStore({});
    const storeNOAUTH = createFakeStore(fakeStoreNOAUTH);

    const fakeAppNOAUTH = (
      <Provider store={storeNOAUTH}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );

    history.push(AppRoute.SIGN_IN);
    render(fakeAppNOAUTH);

    expect(screen.getByText('Sign in', { exact: false, selector: 'h1' })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('user-email'), 'example@mail.ru');
    userEvent.type(screen.getByTestId('user-password'), '123456');

    expect(screen.getByDisplayValue(/example@mail\.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

  it('should render "MyListScreen" when user navigates to "/mylist"', () => {
    history.push(AppRoute.MY_LIST);
    render(fakeAppAUTH);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render "AddReviewScreen" when user navigates to "/films/:id/review"', () => {
    history.push(`/films/${FILM.id}/review`);
    render(fakeAppAUTH);

    expect(screen.getByText(`${FILM.name}`, 'i')).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Rating 10', { exact: true})).toBeInTheDocument();
    expect(screen.getByLabelText('Rating 5', { exact: true})).toBeInTheDocument();
    expect(screen.getByLabelText('Rating 1', { exact: true})).toBeInTheDocument();

    userEvent.click(screen.getByTestId('star-10'));
    userEvent.type(screen.getByTestId('review-text'), REVIEW.comment);

    expect(screen.getByDisplayValue(`${REVIEW.comment}`, 'i')).toBeInTheDocument();
  });

  it('should render "FilmScreen" when user navigates to "/films/:id"', () => {
    history.push(`/films/${FILM.id}`);
    render(fakeAppAUTH);

    expect(screen.getByText(`${FILM.name}`, 'i')).toBeInTheDocument();
    expect(screen.getByText(`${FILM.genre}`, 'i')).toBeInTheDocument();
    expect(screen.getByText(`${FILM.released}`, 'i')).toBeInTheDocument();
    expect(screen.getByText(`${FILM.description}`, 'i')).toBeInTheDocument();
  });

  it('should render "PlayerScreen" when user navigates to "/player/:id"', () => {
    history.push(`/player/${FILM.id}`);
    render(fakeAppAUTH);

    expect(screen.getByText(`${FILM.name}`, 'i')).toBeInTheDocument();
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigates to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeAppAUTH);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to the main page')).toBeInTheDocument();
  });
});
