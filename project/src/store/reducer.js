import films from '../mocks/films';
import {ActionType} from './action';

const initialState = {
  genre: 'All genres',
  films: films,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        genre: action.payload,
      };
    default:
      return initialState;
  }
}
