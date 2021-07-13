import {APIRoute, AppRoute, AuthorizationStatus, StoreKeys} from '../const';
import {
  loadFilm,
  loadFilms,
  loadPromoFilm,
  loadReviews,
  loadSimilarFilms,
  redirectToRoute,
  requireAuthorization,
  logout as closeSession,
  setIsDataLoaded,
  loadFavoriteFilms
} from './action';
import {adaptToClient} from './adapter';

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('avatar', data.avatar_url);
      localStorage.setItem('name', data.name);
      localStorage.setItem('email', data.email);
    })
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.MAIN)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(closeSession()))
    .catch(() => {
      localStorage.removeItem('token');
      dispatch(closeSession());
    })
);

export const fetchPromoFilm = () => (dispatch, _getState, api) => (
  api.get(APIRoute.PROMO)
    .then(({data}) => dispatch(loadPromoFilm(adaptToClient(data))))
);

export const fetchFilms = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FILMS)
    .then(({data}) => dispatch(loadFilms(data.map((film) => adaptToClient(film)))))
    .then(() => dispatch(fetchPromoFilm()))
    .then(() => dispatch(setIsDataLoaded({key: StoreKeys.FILMS, isDataLoaded: true})))
);

export const fetchFilm = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}/${id}`)
    .then(({data}) => dispatch(loadFilm(adaptToClient(data))))
    .then(() => dispatch(setIsDataLoaded({key: StoreKeys.FILM, isDataLoaded: true})))
    .catch(() => dispatch(setIsDataLoaded({key: StoreKeys.FILM, isDataLoaded: true})))
);

export const fetchSimilarFilms = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}/${id}${APIRoute.SIMILAR}`)
    .then(({data}) => dispatch(loadSimilarFilms(data.map((film) => adaptToClient(film)))))
    .then(() => dispatch(setIsDataLoaded({key: StoreKeys.SIMILAR, isDataLoaded: true})))
    .catch(() => dispatch(setIsDataLoaded({key: StoreKeys.SIMILAR, isDataLoaded: true})))
);

export const fetchFavoriteFilms = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FAVORITE)
    .then(({data}) => dispatch(loadFavoriteFilms(data.map((film) => adaptToClient(film)))))
    .then(() => dispatch(setIsDataLoaded({key: StoreKeys.FAVORITE, isDataLoaded: true})))
    .catch(() => dispatch(setIsDataLoaded({key: StoreKeys.FAVORITE, isDataLoaded: true})))
);

export const fetchReviews = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${id}`)
    .then((response) => dispatch(loadReviews(response.data)))
    .then(() => dispatch(setIsDataLoaded({key: StoreKeys.REVIEWS, isDataLoaded: true})))
    .catch(() => dispatch(setIsDataLoaded({key: StoreKeys.REVIEWS, isDataLoaded: true})))
);

export const postReview = (id, {rating, comment}) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.REVIEWS}/${id}`, {rating, comment})
);

export const postFavorite = (id, status) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.FAVORITE}/${id}/${status}`)
);
