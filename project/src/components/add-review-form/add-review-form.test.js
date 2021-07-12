import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import AddReviewForm from './add-review-form';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../../store/root-reducer';
import userEvent from '@testing-library/user-event';

const fakeID = 1;
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

describe('Component: AddReviewForm', () => {
  it('should render correctly', () => {
    const mockStore = configureStore({reducer: rootReducer});
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <AddReviewForm id={fakeID} />
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText('Rating 10', { exact: true})).toBeInTheDocument();
    expect(screen.getByLabelText('Rating 5', { exact: true})).toBeInTheDocument();
    expect(screen.getByLabelText('Rating 1', { exact: true})).toBeInTheDocument();
    expect(screen.getByRole('button').hasAttribute('disabled')).toBe(true);

    userEvent.click(screen.getByTestId('star-10'));
    userEvent.type(screen.getByTestId('review-text'), REVIEW.comment);

    expect(screen.getByDisplayValue(`${REVIEW.comment}`, 'i')).toBeInTheDocument();
    expect(screen.getByRole('button').hasAttribute('disabled')).toBe(false);
    expect(screen.getByRole('button').textContent).toBe('Post');

    fireEvent(document.querySelector('.add-review__form'), new Event('submit'));
  });
});
