import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Logo from './logo';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Logo />
      </Router>,
    );

    expect(document.querySelector('.logo__letter--1').textContent).toEqual('W');
    expect(document.querySelector('.logo__letter--2').textContent).toEqual('T');
    expect(document.querySelector('.logo__letter--3').textContent).toEqual('W');
  });
});
