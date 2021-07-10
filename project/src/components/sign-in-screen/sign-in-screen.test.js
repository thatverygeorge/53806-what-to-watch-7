import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import SignInScreen from './sign-in-screen';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../../store/root-reducer';
import {AppRoute, AuthorizationStatus} from '../../const';
import userEvent from '@testing-library/user-event';

const stateNOAUTH = {
  USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
};

const stateAUTH = {
  USER: {authorizationStatus: AuthorizationStatus.AUTH},
};

describe('Component: SignInScreen', () => {
  it('should render correctly when authorization status is NO_AUTH', () => {
    const mockStore = configureStore({preloadedState: stateNOAUTH, reducer: rootReducer});
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <SignInScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Sign in', { exact: false, selector: 'h1' })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('user-email'), 'example@mail.ru');
    userEvent.type(screen.getByTestId('user-password'), '123456');

    expect(screen.getByDisplayValue(/example@mail\.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

  it('should redirect to main page when authorization status is AUTH', () => {
    const mockStore = configureStore({preloadedState: stateAUTH, reducer: rootReducer});
    const history = createMemoryHistory();
    history.push('/fake');

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.MAIN}>
              <h1>This is main page</h1>
            </Route>
            <Route>
              <SignInScreen />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('Sign in', { exact: false, selector: 'h1' })).not.toBeInTheDocument();
    expect(screen.getByText('This is main page')).toBeInTheDocument();
  });
});
