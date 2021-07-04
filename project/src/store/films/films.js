import {createReducer} from '@reduxjs/toolkit';
import {
  loadFavoriteFilms,
  loadFilm,
  loadFilms,
  loadPromoFilm,
  loadReviews,
  loadSimilarFilms,
  setIsDataLoaded
} from '../action';

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
  favorite: {
    data: undefined,
    isDataLoaded: false,
  },
};

export const films = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state, action) => {
      state.films.data = action.payload;
    })
    .addCase(loadFilm, (state, action) => {
      state.film.data = action.payload;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similar.data = action.payload;
    })
    .addCase(loadFavoriteFilms, (state, action) => {
      state.favorite.data = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews.data = action.payload;
    })
    .addCase(setIsDataLoaded, (state, action) => {
      state[action.payload.key].isDataLoaded = action.payload.isDataLoaded;
    });
});
