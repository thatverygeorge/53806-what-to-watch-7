import {AppRoute, AuthorizationStatus, StoreKeys} from '../const';
import {
  changeGenre,
  setIsDataLoaded,
  ActionType,
  loadFilm,
  loadFilms,
  loadPromoFilm,
  loadReviews,
  loadFavoriteFilms,
  requireAuthorization,
  loadSimilarFilms,
  logout,
  redirectToRoute
} from './action';

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

describe('Actions', () => {
  it('action creator for changing genre returns correct action', () => {
    const expectedAction = {
      type: ActionType.CHANGE_GENRE,
      payload: 'All genres',
    };

    expect(changeGenre(GENRE)).toEqual(expectedAction);
  });

  it('action creator for changing genre returns correct action when genre is undefined', () => {
    const expectedAction = {
      type: ActionType.CHANGE_GENRE,
      payload: undefined,
    };

    expect(changeGenre(undefined)).toEqual(expectedAction);
  });

  it('action creator for setting is data loaded status returns correct action when isDataLoaded equals true', () => {
    const expectedAction = {
      type: ActionType.SET_IS_DATA_LOADED,
      payload: {
        key: StoreKeys.FILMS,
        isDataLoaded: true,
      },
    };

    expect(setIsDataLoaded({key: StoreKeys.FILMS, isDataLoaded: true})).toEqual(expectedAction);
  });

  it('action creator for setting is data loaded status returns correct action  when isDataLoaded equals false', () => {
    const expectedAction = {
      type: ActionType.SET_IS_DATA_LOADED,
      payload: {
        key: StoreKeys.FAVORITE,
        isDataLoaded: false,
      },
    };

    expect(setIsDataLoaded({key: StoreKeys.FAVORITE, isDataLoaded: false})).toEqual(expectedAction);
  });

  it('action creator for loading film returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOAD_FILM,
      payload: FILM,
    };

    expect(loadFilm(FILM)).toEqual(expectedAction);
  });

  it('action creator for loading film returns correct action when film is undefined', () => {
    const expectedAction = {
      type: ActionType.LOAD_FILM,
      payload: undefined,
    };

    expect(loadFilm(undefined)).toEqual(expectedAction);
  });

  it('action creator for loading films returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOAD_FILMS,
      payload: [
        FILM,
        FILM,
      ],
    };

    expect(loadFilms([FILM, FILM])).toEqual(expectedAction);
  });

  it('action creator for loading films returns correct action when array is empty', () => {
    const expectedAction = {
      type: ActionType.LOAD_FILMS,
      payload: [],
    };

    expect(loadFilms([])).toEqual(expectedAction);
  });

  it('action creator for loading films returns correct action when array is undefined', () => {
    const expectedAction = {
      type: ActionType.LOAD_FILMS,
      payload: undefined,
    };

    expect(loadFilms(undefined)).toEqual(expectedAction);
  });

  it('action creator for loading promo film returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOAD_PROMO_FILM,
      payload: FILM,
    };

    expect(loadPromoFilm(FILM)).toEqual(expectedAction);
  });

  it('action creator for loading promo film returns correct action when film is undefined', () => {
    const expectedAction = {
      type: ActionType.LOAD_PROMO_FILM,
      payload: undefined,
    };

    expect(loadPromoFilm(undefined)).toEqual(expectedAction);
  });

  it('action creator for loading similar films returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOAD_SIMILAR_FILMS,
      payload: [
        FILM,
        FILM,
      ],
    };

    expect(loadSimilarFilms([FILM, FILM])).toEqual(expectedAction);
  });

  it('action creator for loading similar films returns correct action when array is empty', () => {
    const expectedAction = {
      type: ActionType.LOAD_SIMILAR_FILMS,
      payload: [],
    };

    expect(loadSimilarFilms([])).toEqual(expectedAction);
  });

  it('action creator for loading similar films returns correct action when array is undefined', () => {
    const expectedAction = {
      type: ActionType.LOAD_SIMILAR_FILMS,
      payload: undefined,
    };

    expect(loadSimilarFilms(undefined)).toEqual(expectedAction);
  });

  it('action creator for loading reviews returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: [
        REVIEW,
        REVIEW,
      ],
    };

    expect(loadReviews([REVIEW, REVIEW])).toEqual(expectedAction);
  });

  it('action creator for loading reviews returns correct action when array is empty', () => {
    const expectedAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: [],
    };

    expect(loadReviews([])).toEqual(expectedAction);
  });

  it('action creator for loading reviews returns correct action when array is undefined', () => {
    const expectedAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: undefined,
    };

    expect(loadReviews(undefined)).toEqual(expectedAction);
  });

  it('action creator loading favorite films returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOAD_FAVORITE_FILMS,
      payload: [
        FILM,
        FILM,
      ],
    };

    expect(loadFavoriteFilms([FILM, FILM])).toEqual(expectedAction);
  });

  it('action creator loading favorite films returns correct action when array is empty', () => {
    const expectedAction = {
      type: ActionType.LOAD_FAVORITE_FILMS,
      payload: [],
    };

    expect(loadFavoriteFilms([])).toEqual(expectedAction);
  });

  it('action creator loading favorite films returns correct action when array is undefined', () => {
    const expectedAction = {
      type: ActionType.LOAD_FAVORITE_FILMS,
      payload: undefined,
    };

    expect(loadFavoriteFilms(undefined)).toEqual(expectedAction);
  });

  it('action creator authorization returns correct action when authorization status is equal AUTH', () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    };

    expect(requireAuthorization(AuthorizationStatus.AUTH)).toEqual(expectedAction);
  });

  it('action creator authorization returns correct action when authorization status is equal NO_AUTH', () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    };

    expect(requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual(expectedAction);
  });

  it('action creator for logout returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOGOUT,
    };

    expect(logout()).toEqual(expectedAction);
  });

  it('action creator for redirect to route returns correct action', () => {
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: AppRoute.MAIN,
    };

    expect(redirectToRoute(AppRoute.MAIN)).toEqual(expectedAction);
  });
});
