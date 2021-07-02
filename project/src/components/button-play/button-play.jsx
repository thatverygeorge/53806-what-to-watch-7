import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';

function ButtonPlay(props) {
  const {id} = props;
  const history = useHistory();

  return (
    <button className="btn btn--play film-card__button" type="button" onClick={() => history.push(`/player/${id}`)}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
}

ButtonPlay.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ButtonPlay;
