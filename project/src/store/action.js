export const ActionType = {
  CHANGE_GENRE: 'changeGenre',
  LOAD_FILMS: 'loadFilms',
  LOAD_FILM: 'loadFilm',
  LOAD_PROMO_FILM: 'loadPromoFilm',
  SET_IS_DATA_LOADED: 'setIsDataLoaded',
  REQUIRED_AUTHORIZATION: 'requiredAuthorization',
  LOGOUT: 'logout',
  REDIRECT_TO_ROUTE: 'redirectToRoute',
  POST_REVIEW: 'postReview',
  LOAD_REVIEWS: 'loadReviews',
  LOAD_SIMILAR_FILMS: 'loadSimilarFilms',
};

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),
  loadFilm: (film) => ({
    type: ActionType.LOAD_FILM,
    payload: film,
  }),
  loadPromoFilm: (film) => ({
    type: ActionType.LOAD_PROMO_FILM,
    payload: film,
  }),
  loadSimilarFilms: (film) => ({
    type: ActionType.LOAD_SIMILAR_FILMS,
    payload: film,
  }),
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  }),
  setIsDataLoaded: (obj) => ({
    type: ActionType.SET_IS_DATA_LOADED,
    payload: obj,
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
};
