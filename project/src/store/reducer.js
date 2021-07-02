import {ActionType} from './action';
import {AuthorizationStatus} from '../const';

const initialState = {
  genre: 'All genres',
  films: {
    data: [],
    isDataLoaded: false,
  },
  promoFilm: undefined,
  film: {
    data: undefined,
    isDataLoaded: false,
  },
  reviews: {
    data: undefined,
    isDataLoaded: false,
  },
  similar: {
    data: undefined,
    isDataLoaded: false,
  },
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
        films: {
          ...state.films,
          data: action.payload,
        },
      };
    case ActionType.LOAD_FILM:
      return {
        ...state,
        film: {
          ...state.film,
          data: action.payload,
        },
      };
    case ActionType.LOAD_PROMO_FILM:
      return {
        ...state,
        promoFilm: action.payload,
      };
    case ActionType.LOAD_SIMILAR_FILMS:
      return {
        ...state,
        similar: {
          ...state.similar,
          data: action.payload,
        },
      };
    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          data: action.payload,
        },
      };
    case ActionType.SET_IS_DATA_LOADED:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          isDataLoaded: action.payload.isDataLoaded,
        },
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
