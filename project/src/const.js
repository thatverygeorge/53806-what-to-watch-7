export const AppRoute = {
  MAIN: '/',
  SIGN_IN: '/login',
  MY_LIST: '/mylist',
  FILM: '/films/:id',
  FILM_DETAILS_OR_REVIEWS: '/films/:id/:tab(details|reviews)',
  ADD_REVIEW: '/films/:id/review',
  PLAYER: '/player/:id',
};

export const Tabs = {
  OVERVIEW: 'overview',
  DETAILS: 'details',
  REVIEWS: 'reviews',
};
