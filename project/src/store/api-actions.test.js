import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../services/api';
import {ActionType} from './action';
import {
  checkAuth,
  fetchFavoriteFilms,
  fetchFilm,
  fetchFilms,
  fetchPromoFilm,
  fetchReviews,
  fetchSimilarFilms,
  login,
  logout,
  postFavorite,
  postReview
} from './api-actions';
import {APIRoute, AppRoute, AuthorizationStatus, StoreKeys} from '../const';

let api = null;

describe('Async actions', () => {
  beforeAll(() => {
    api = createAPI(() => {});
  });

  it('should make a correct API call to GET /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200, [{fake: true}]);

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });

  it('should make a correct API call to POST /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: 'test@test.ru', password: '123456'};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, [{fake: true}]);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.MAIN,
        });
      });
  });

  it('should make a correct API call to DELETE /logout', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    Storage.prototype.removeItem = jest.fn();

    apiMock
      .onDelete(APIRoute.LOGOUT)
      .reply(204, [{fake: true}]);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOGOUT,
        });

        expect(Storage.prototype.removeItem).toBeCalledTimes(1);
        expect(Storage.prototype.removeItem).nthCalledWith(1, 'token');
      });
  });

  it('should make a correct API call to GET /films', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = fetchFilms();

    apiMock
      .onGet(APIRoute.FILMS)
      .reply(200, [{fake: true}]);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: [{fake: true}],
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, expect.any(Function));

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_IS_DATA_LOADED,
          payload: {key: StoreKeys.FILMS, isDataLoaded: true},
        });
      });
  });

  it('should make a correct API call to GET /promo', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoFilmLoader = fetchPromoFilm();

    apiMock
      .onGet(APIRoute.PROMO)
      .reply(200, {fake: true});

    return promoFilmLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_FILM,
          payload: {fake: true},
        });
      });
  });

  it('should make a correct API call to GET /films/:id', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeID = 1;
    const filmLoader = fetchFilm(fakeID);

    apiMock
      .onGet(`${APIRoute.FILMS}/${fakeID}`)
      .reply(200, {fake: true});

    return filmLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILM,
          payload: {fake: true},
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_IS_DATA_LOADED,
          payload: {key: StoreKeys.FILM, isDataLoaded: true},
        });
      });
  });

  it('should make a correct API call to GET /films/:id/similar', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeID = 1;
    const similarFilmsLoader = fetchSimilarFilms(fakeID);

    apiMock
      .onGet(`${APIRoute.FILMS}/${fakeID}${APIRoute.SIMILAR}`)
      .reply(204, [{fake: true}]);

    return similarFilmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_SIMILAR_FILMS,
          payload: [{fake: true}],
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_IS_DATA_LOADED,
          payload: {key: StoreKeys.SIMILAR, isDataLoaded: true},
        });
      });
  });

  it('should make a correct API call to GET /favorite', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteFilmsLoader = fetchFavoriteFilms();

    apiMock
      .onGet(APIRoute.FAVORITE)
      .reply(200, [{fake: true}]);

    return favoriteFilmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITE_FILMS,
          payload: [{fake: true}],
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_IS_DATA_LOADED,
          payload: {key: StoreKeys.FAVORITE, isDataLoaded: true},
        });
      });
  });

  it('should make a correct API call to GET /comments/:film_id', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeID = 1;
    const reviewsLoader = fetchReviews(fakeID);

    apiMock
      .onGet(`${APIRoute.REVIEWS}/${fakeID}`)
      .reply(200, [{fake: true}]);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: [{fake: true}],
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_IS_DATA_LOADED,
          payload: {key: StoreKeys.REVIEWS, isDataLoaded: true},
        });
      });
  });

  it('should make a correct API call to POST /comments/:film_id', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeID = 1;
    const fakeReview = {
      rating: 0,
      comment: '',
    };
    const reviewLoader = postReview(fakeID, fakeReview, () => {}, () => {});

    apiMock
      .onPost(`${APIRoute.REVIEWS}/${fakeID}`, fakeReview)
      .reply(200, [{fake: true}]);

    return reviewLoader(dispatch, () => {}, api);
  });

  it('should make a correct API call to POST /favorite/:film_id/:status', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeID = 1;
    const fakeStatus = 1;
    const favoriteLoader = postFavorite(fakeID, fakeStatus);

    apiMock
      .onPost(`${APIRoute.FAVORITE}/${fakeID}/${fakeStatus}`)
      .reply(200, {fake: true});

    return favoriteLoader(dispatch, () => {}, api);
  });
});
