import {ActionCreator} from './action';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {adaptToClient} from './adapter';

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
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
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.redirectToRoute(AppRoute.MAIN)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(ActionCreator.logout()))
);

export const fetchPromoFilm = () => (dispatch, _getState, api) => (
  api.get(APIRoute.PROMO)
    .then(({data}) => dispatch(ActionCreator.loadPromoFilm(adaptToClient(data))))
);

export const fetchFilms = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FILMS)
    .then(({data}) => dispatch(ActionCreator.loadFilms(data.map((film) => adaptToClient(film)))))
    .then(() => dispatch(fetchPromoFilm()))
    .then(() => dispatch(ActionCreator.setIsDataLoaded({key: 'films', isDataLoaded: true})))
);

export const fetchFilm = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}/${id}`)
    .then(({data}) => dispatch(ActionCreator.loadFilm(adaptToClient(data))))
    .then(() => dispatch(ActionCreator.setIsDataLoaded({key: 'film', isDataLoaded: true})))
    .catch(() => dispatch(ActionCreator.setIsDataLoaded({key: 'film', isDataLoaded: true})))
);

export const fetchSimilarFilms = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}/${id}${APIRoute.SIMILAR}`)
    .then(({data}) => dispatch(ActionCreator.loadSimilarFilms(data.map((film) => adaptToClient(film)))))
    .then(() => dispatch(ActionCreator.setIsDataLoaded({key: 'similar', isDataLoaded: true})))
    .catch(() => dispatch(ActionCreator.setIsDataLoaded({key: 'similar', isDataLoaded: true})))
);

export const fetchReviews = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${id}`)
    .then(({data}) => dispatch(ActionCreator.loadReviews(data)))
    .then(() => dispatch(ActionCreator.setIsDataLoaded({key: 'reviews', isDataLoaded: true})))
    .catch(() => dispatch(ActionCreator.setIsDataLoaded({key: 'reviews', isDataLoaded: true})))
);

export const postReview = (id, {rating, comment}, onSuccess, onError) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.REVIEWS}/${id}`, {rating, comment})
    .then(() => onSuccess())
    .catch(() => onError())
);
