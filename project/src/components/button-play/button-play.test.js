import React from 'react';
import {render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ButtonPlay from './button-play';
import userEvent from '@testing-library/user-event';

const fakeID = 1;

describe('Component: ButtonPlay', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <ButtonPlay id={fakeID} />
      </Router>,
    );

    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  it('should redirect to player page on click', () => {
    const history = createMemoryHistory();
    history.push('/fake');

    render(
      <Router history={history}>
        <Switch>
          <Route path={`/player/${fakeID}`}>
            <h1>This is player page</h1>
          </Route>
          <Route>
            <ButtonPlay id={fakeID} />
          </Route>
        </Switch>
      </Router>,
    );

    expect(screen.queryByText('This is player page')).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText('This is player page')).toBeInTheDocument();
  });
});
