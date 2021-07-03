import {ActionType} from '../action';

const initialState = {
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
};

export const films = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
