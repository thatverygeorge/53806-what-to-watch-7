export const ActionType = {
  CHANGE_GENRE: 'changeGenre',
  LOAD_FILMS: 'loadFilms',
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
};
