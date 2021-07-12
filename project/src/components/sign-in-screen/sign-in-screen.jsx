import React, {useState} from 'react';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../store/api-actions';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Redirect} from 'react-router-dom';
import {getAuthorizationStatus} from '../../store/user/selectors';

function SignInScreen() {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  if (authorizationStatus !== AuthorizationStatus.NO_AUTH) {
    return <Redirect to={AppRoute.MAIN} />;
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    const email = formData.get('user-email');
    const password = formData.get('user-password');

    const isPasswordValid = password.split('').some((character) => character !== ' ');

    if (isPasswordValid) {
      dispatch(login({
        email,
        password,
      }))
        .catch(() => setIsError(true));
    } else {
      setIsError(true);
    }
  };

  const handleInput = () => {
    setIsError(false);
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onInput={handleInput} onSubmit={handleSubmit}>
          {isError ?
            <div className="sign-in__message">
              <p>An error occurred. Please check your email or password and try again.</p>
            </div> : ''}
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                required
                data-testid="user-email"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                required
                data-testid="user-password"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default SignInScreen;
