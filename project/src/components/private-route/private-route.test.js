import React from 'react';
import {Router, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from './private-route';

const mockStore = configureStore({});
let history;

describe('Component: PrivateRouter', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push('/private');
  });

  it('should render component for public route, when authorization status is equal NO_AUTH', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.SIGN_IN}><h1>Public Route</h1></Route>
          <PrivateRoute
            exact
            path="/private"
            render={() => (<h1>Private Route</h1>)}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Public Route')).toBeInTheDocument();
    expect(screen.queryByText('Private Route')).not.toBeInTheDocument();
  });

  it('should render component for private route, when authorization status is equal AUTH', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.SIGN_IN}><h1>Public Route</h1></Route>
          <PrivateRoute
            exact
            path="/private"
            render={() => (<h1>Private Route</h1>)}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Private Route')).toBeInTheDocument();
    expect(screen.queryByText('Public Route')).not.toBeInTheDocument();
  });
});
