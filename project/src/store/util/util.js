import {ActionType} from '../action';

const initialState = {
  genre: 'All genres',
};

export const util = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        genre: action.payload,
      };
    default:
      return state;
  }
};
