import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {
  loadFilm,
  loadFilms,
  loadPromoFilm,
  loadReviews,
  loadSimilarFilms,
  redirectToRoute,
  requireAuthorization,
  logout as closeSession,
  setIsDataLoaded
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
);

export const fetchPromoFilm = () => (dispatch, _getState, api) => (
  api.get(APIRoute.PROMO)
    .then(({data}) => dispatch(loadPromoFilm(adaptToClient(data))))
);

export const fetchFilms = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FILMS)
    .then(({data}) => dispatch(loadFilms(data.map((film) => adaptToClient(film)))))
    .then(() => dispatch(fetchPromoFilm()))
    .then(() => dispatch(setIsDataLoaded({key: 'films', isDataLoaded: true})))
);

export const fetchFilm = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}/${id}`)
    .then(({data}) => dispatch(loadFilm(adaptToClient(data))))
    .then(() => dispatch(setIsDataLoaded({key: 'film', isDataLoaded: true})))
    .catch(() => dispatch(setIsDataLoaded({key: 'film', isDataLoaded: true})))
);

export const fetchSimilarFilms = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}/${id}${APIRoute.SIMILAR}`)
    .then(({data}) => dispatch(loadSimilarFilms(data.map((film) => adaptToClient(film)))))
    .then(() => dispatch(setIsDataLoaded({key: 'similar', isDataLoaded: true})))
    .catch(() => dispatch(setIsDataLoaded({key: 'similar', isDataLoaded: true})))
);

export const fetchReviews = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${id}`)
    .then(({data}) => dispatch(loadReviews(data)))
    .then(() => dispatch(setIsDataLoaded({key: 'reviews', isDataLoaded: true})))
    .catch(() => dispatch(setIsDataLoaded({key: 'reviews', isDataLoaded: true})))
);
