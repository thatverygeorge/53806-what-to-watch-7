import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Footer />
      </Router>,
    );

    expect(screen.getByText('© 2019 What to watch Ltd.')).toBeInTheDocument();
    expect(document.querySelector('.logo')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveClass('logo__link', 'logo__link--light');
  });
});
