

import React from 'react';
import filmProp from '../film-screen/film.prop';
import {useHistory} from 'react-router-dom';

function ButtonPlay(props) {
  const {film} = props;
  const history = useHistory();

  return (
    <button className="btn btn--play film-card__button" type="button" onClick={() => history.push(`/player/${film.id}`)}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
}

ButtonPlay.propTypes = {
  film: filmProp,
};

export default ButtonPlay;
