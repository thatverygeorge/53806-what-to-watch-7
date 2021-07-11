import React from 'react';
import {render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Logo from './logo';
import {AppRoute} from '../../const';
import userEvent from '@testing-library/user-event';

let history;

describe('Component: Logo', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Logo />
      </Router>,
    );

    expect(document.querySelector('.logo__letter--1').textContent).toEqual('W');
    expect(document.querySelector('.logo__letter--2').textContent).toEqual('T');
    expect(document.querySelector('.logo__letter--3').textContent).toEqual('W');

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to main screen when user clicks on link', () => {
    history.push('/fake');

    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.MAIN} exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <Logo />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText('This is main page')).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText('This is main page')).toBeInTheDocument();
  });
});
