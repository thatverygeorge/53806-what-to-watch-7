export const AppRoute = {
  MAIN: '/',
  SIGN_IN: '/login',
  MY_LIST: '/mylist',
  FILM: '/films/:id/:tab(details|reviews)?',
  ADD_REVIEW: '/films/:id/review',
  PLAYER: '/player/:id',
};

export const Tabs = {
  OVERVIEW: 'overview',
  DETAILS: 'details',
  REVIEWS: 'reviews',
};
