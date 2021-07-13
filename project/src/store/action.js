import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_GENRE: 'data/changeGenre',
  LOAD_FILMS: 'data/loadFilms',
  LOAD_FILM: 'data/loadFilm',
  LOAD_PROMO_FILM: 'data/loadPromoFilm',
  SET_IS_DATA_LOADED: 'data/setIsDataLoaded',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  LOGOUT: 'user/logout',
  REDIRECT_TO_ROUTE: 'app/redirectToRoute',
  LOAD_REVIEWS: 'data/loadReviews',
  LOAD_SIMILAR_FILMS: 'data/loadSimilarFilms',
  LOAD_FAVORITE_FILMS: 'data/loadFavoriteFilms',
};

export const changeGenre = createAction(ActionType.CHANGE_GENRE, (genre) => ({
  payload: genre,
}));

export const loadFilms = createAction(ActionType.LOAD_FILMS, (films) => ({
  payload: films,
}));

export const loadFilm = createAction(ActionType.LOAD_FILM, (film) => ({
  payload: film,
}));

export const loadPromoFilm = createAction(ActionType.LOAD_PROMO_FILM, (film) => ({
  payload: film,
}));

export const loadSimilarFilms = createAction(ActionType.LOAD_SIMILAR_FILMS, (films) => ({
  payload: films,
}));

export const loadReviews = createAction(ActionType.LOAD_REVIEWS, (reviews) => ({
  payload: reviews,
}));

export const loadFavoriteFilms = createAction(ActionType.LOAD_FAVORITE_FILMS, (favorite) => ({
  payload: favorite,
}));

export const setIsDataLoaded = createAction(ActionType.SET_IS_DATA_LOADED, (obj) => ({
  payload: obj,
}));

export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => ({
  payload: status,
}));

export const logout = createAction(ActionType.LOGOUT);

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => ({
  payload: url,
}));
