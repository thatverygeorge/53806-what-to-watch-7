import React, {useRef, useState} from 'react';
import Header from '../header/header';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {login} from '../../store/api-actions';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Redirect} from 'react-router-dom';

function SignInScreen(props) {
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();

  const {onSubmit, authorizationStatus} = props;

  if (authorizationStatus !== AuthorizationStatus.NO_AUTH) {
    return <Redirect to={AppRoute.MAIN} />;
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  }

  function handlePasswordChange(evt) {
    evt.target.value ?
      setIsPasswordValid(evt.target.value.split('').some((character) => character !== ' ')) :
      setIsPasswordValid(true);
  }

  return (
    <div className="user-page">
      <Header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={isPasswordValid && handleSubmit}>
          <div className={!isPasswordValid ? 'sign-in__message' : 'visually-hidden'}>
            <p>Please enter a valid password</p>
          </div>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                ref={emailRef}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                required
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                ref={passwordRef}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                required
                onChange={handlePasswordChange}
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

SignInScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    dispatch(login(authData));
  },
});

export {SignInScreen};
export default connect(null, mapDispatchToProps)(SignInScreen);
