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
        <ButtonShowMore onShowMoreButtonClick={() => {}} />
      </Router>,
    );

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('should fire callback on click', () => {
    const history = createMemoryHistory();
    const onShowMoreButtonClick = jest.fn();

    render(
      <Router history={history}>
        <ButtonShowMore onShowMoreButtonClick={onShowMoreButtonClick} />
      </Router>,
    );

    userEvent.click((screen.getByRole('button')));
    expect(onShowMoreButtonClick).toBeCalled();
  });
});
