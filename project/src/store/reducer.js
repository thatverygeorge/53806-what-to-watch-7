import {ActionType} from './action';
import {AuthorizationStatus} from '../const';

const initialState = {
  genre: 'All genres',
  films: [],
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
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
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };
    default:
      return state;
  }
}
