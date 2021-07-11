import React from 'react';
import {render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import NotFoundScreen from './not-found-screen';
import {AppRoute} from '../../const';
import userEvent from '@testing-library/user-event';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <NotFoundScreen />
      </Router>,
    );

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to the main page')).toBeInTheDocument();
  });

  it('should redirect to main page when user clicks on link', () => {
    const history = createMemoryHistory();
    history.push('/fake');

    render(
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.MAIN}>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <NotFoundScreen />
          </Route>
        </Switch>
      </Router>,
    );

    expect(screen.queryByText('This is main page')).not.toBeInTheDocument();
    userEvent.click((screen.getByRole('link')));
    expect(screen.getByText('This is main page')).toBeInTheDocument();
  });
});
