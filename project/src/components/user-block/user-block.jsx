import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import {logout} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user/selectors';

function UserBlock() {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const history = useHistory();
  const dispatch = useDispatch();
  const avatarURL = localStorage.getItem('avatar');

  const handleSignOut = (evt) => {
    evt.preventDefault();

    dispatch(logout());
  };

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
            <img src={avatarURL ? avatarURL : 'img/avatar.jpg'} alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <Link to={AppRoute.MAIN} className="user-block__link" onClick={handleSignOut}>Sign out</Link>
        </li>
      </ul>
    );
}

export default UserBlock;
