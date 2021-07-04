import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {postFavorite} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user/selectors';
import filmProp from '../film-screen/film.prop';

function ButtonMyList(props) {
  const {film} = props;
  const history = useHistory();
  const [isFavorite, setIsFavorite] = useState(film.isFavorite);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  const handleMyListClick = (evt) => {
    evt.preventDefault();

    if (authorizationStatus !== AuthorizationStatus.AUTH) {
      history.push(AppRoute.SIGN_IN);
    } else {
      setIsFavorite((prevState) => {
        const status = prevState ? 0 : 1;
        dispatch(postFavorite(film.id, status));
        return !prevState;
      });
    }
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleMyListClick}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={isFavorite ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
    </button>
  );
}

ButtonMyList.propTypes = {
  film: filmProp,
};

export default ButtonMyList;
