import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import SignInScreen from './sign-in-screen';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../../store/root-reducer';
import {AuthorizationStatus} from '../../const';
import userEvent from '@testing-library/user-event';

const state = {
  USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
};

describe('Component: SignInScreen', () => {
  it('should render correctly', () => {
    const mockStore = configureStore({preloadedState: state, reducer: rootReducer});
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <SignInScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Sign in', { exact: false, selector: 'h1' })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('user-email'), 'example@mail.ru');
    userEvent.type(screen.getByTestId('user-password'), '123456');

    expect(screen.getByDisplayValue(/example@mail\.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
});
