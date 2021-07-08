import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Toast from './toast';

const errorMessage = 'An error occurred. Please try again.';

describe('Component: Toast', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Toast text={errorMessage} />
      </Router>,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
