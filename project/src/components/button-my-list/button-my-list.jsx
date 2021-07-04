/* eslint-disable no-console */
import React from 'react';
import filmProp from '../film-screen/film.prop';

function ButtonMyList(props) {
  const {film} = props;

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={() => console.log('click')}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={film.isFavorite ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
    </button>
  );
}

ButtonMyList.propTypes = {
  film: filmProp,
};

export default ButtonMyList;
