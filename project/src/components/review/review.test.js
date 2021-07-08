import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Review from './review';

const REVIEW = {
  id: 1,
  user: {
    id: 4,
    name: 'Kate Muir',
  },
  rating: 8.9,
  comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed movies in years.',
  date: '2019-05-08T14:13:56.569Z',
};

describe('Component: Review', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Review review={REVIEW} />
      </Router>,
    );

    expect(screen.getByText(REVIEW.comment)).toBeInTheDocument();
    expect(screen.getByText(REVIEW.user.name)).toBeInTheDocument();
  });
});
