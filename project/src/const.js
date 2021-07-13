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
  FAVORITE: '/favorite',
};

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
};

export const StoreKeys = {
  FILMS: 'films',
  PROMO_FILM: 'promoFilm',
  FILM: 'film',
  REVIEWS: 'reviews',
  SIMILAR: 'similar',
  FAVORITE: 'favorite',
};

export const RatingLabels = {
  BAD: 'Bad',
  NORMAL: 'Normal',
  GOOD: 'Good',
  VERY_GOOD: 'Very Good',
  AWESOME: 'Awesome',
};
