import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ButtonShowMore from './button-show-more';

describe('Component: ButtonShowMore', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <ButtonShowMore handleShowMoreClick={() => {}} />
      </Router>,
    );

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });
});
