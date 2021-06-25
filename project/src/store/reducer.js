import {ActionType} from './action';

const initialState = {
  genre: 'All genres',
  films: [],
  isDataLoaded: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        genre: action.payload,
      };
    case ActionType.LOAD_FILMS:
      return {
        ...state,
        films: action.payload,
        isDataLoaded: true,
      };
    default:
      return initialState;
  }
}
