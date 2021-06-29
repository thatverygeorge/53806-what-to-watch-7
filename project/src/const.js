export const AppRoute = {
  MAIN: '/',
  SIGN_IN: '/login',
  MY_LIST: '/mylist',
  FILM: '/films/:id/:tab(details|reviews)?',
  ADD_REVIEW: '/films/:id/review',
  PLAYER: '/player/:id',
  NOT_FOUND: '/404',
};

export const Tabs = {
  OVERVIEW: 'overview',
  DETAILS: 'details',
  REVIEWS: 'reviews',
};

export const APIRoute = {
  FILMS: '/films',
  LOGIN: '/login',
  LOGOUT: '/logout',
  REVIEWS: '/comments',
  SIMILAR: '/similar',
  PROMO: '/promo',
};

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
};
