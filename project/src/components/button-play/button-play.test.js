import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ButtonPlay from './button-play';

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
});
