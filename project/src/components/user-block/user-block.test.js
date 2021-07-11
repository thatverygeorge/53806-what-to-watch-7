import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import UserBlock from './user-block';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../../store/root-reducer';
import {AppRoute, AuthorizationStatus} from '../../const';
import userEvent from '@testing-library/user-event';

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

  it('should redirect to my list page when user clicks on avatar', () => {
    const mockStore = configureStore({preloadedState: stateAUTH, reducer: rootReducer});
    const history = createMemoryHistory();
    history.push('/fake');

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.MY_LIST} exact>
              <h1>This is my list page</h1>
            </Route>
            <Route>
              <UserBlock />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('This is my list page')).not.toBeInTheDocument();
    userEvent.click(document.querySelector('.user-block__avatar'));
    expect(screen.getByText('This is my list page')).toBeInTheDocument();
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

  it('should redirect to sign in page when user clicks on link', () => {
    const mockStore = configureStore({preloadedState: stateNOAUTH, reducer: rootReducer});
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.SIGN_IN} exact>
              <h1>This is sign in page</h1>
            </Route>
            <Route>
              <UserBlock />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('This is sign in page')).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText('This is sign in page')).toBeInTheDocument();
  });
});
