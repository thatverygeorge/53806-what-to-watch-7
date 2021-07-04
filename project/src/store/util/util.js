import {createReducer} from '@reduxjs/toolkit';
import {changeGenre} from '../action';

const initialState = {
  genre: 'All genres',
};

export const util = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    });
});
