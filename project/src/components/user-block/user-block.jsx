import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import {logout} from '../../store/api-actions';

function UserBlock(props) {
  const history = useHistory();
  const {authorizationStatus, onLogOut} = props;
  const avatarURL = localStorage.getItem('avatar') ?? '';

  function handleSignOut(evt) {
    evt.preventDefault();

    onLogOut();
  }

  return authorizationStatus === AuthorizationStatus.NO_AUTH ?
    (
      <div className="user-block">
        <Link to={AppRoute.SIGN_IN} className="user-block__link">Sign in</Link>
      </div>
    ) :
    (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar" onClick={() => history.push(AppRoute.MY_LIST)}>
            <img src={avatarURL !== '' ? avatarURL: 'img/avatar.jpg'} alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <Link to={AppRoute.MAIN} className="user-block__link" onClick={handleSignOut}>Sign out</Link>
        </li>
      </ul>
    );
}

UserBlock.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  onLogOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onLogOut() {
    dispatch(logout());
  },
});


export {UserBlock};
export default connect(mapStateToProps, mapDispatchToProps)(UserBlock);
