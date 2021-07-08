import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import UserBlock from './user-block';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../../store/root-reducer';
import {AuthorizationStatus} from '../../const';

const stateAUTH = {
  USER: {authorizationStatus: AuthorizationStatus.AUTH},
};

const stateNOAUTH = {
  USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
};

describe('Component: UserBlock', () => {
  it('should render correctly when authorization status is equal AUTH', () => {
    const mockStore = configureStore({preloadedState: stateAUTH, reducer: rootReducer});
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <UserBlock />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should render correctly when authorization status is equal NO_AUTH', () => {
    const mockStore = configureStore({preloadedState: stateNOAUTH, reducer: rootReducer});
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <UserBlock />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
