import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ButtonShowMore from './button-show-more';
import userEvent from '@testing-library/user-event';

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

  it('should fire callback on click', () => {
    const history = createMemoryHistory();
    const handleShowMoreClick = jest.fn();

    render(
      <Router history={history}>
        <ButtonShowMore handleShowMoreClick={handleShowMoreClick} />
      </Router>,
    );

    userEvent.click((screen.getByRole('button')));
    expect(handleShowMoreClick).toBeCalled();
  });
});
