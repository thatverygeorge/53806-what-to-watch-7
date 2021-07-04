import {AuthorizationStatus} from '../../const';
import {requireAuthorization, logout} from '../action';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

export const user = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(logout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
    });
});
