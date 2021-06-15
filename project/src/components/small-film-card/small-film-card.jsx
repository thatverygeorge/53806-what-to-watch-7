/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import filmProp from '../film-screen/film.prop';

function SmallFilmCard(props) {
  const {film, handleHover, handleClick} = props;

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={()=> handleHover(film)}>
      <div className="small-film-card__image">
        <img src={film.previewImage} alt={film.name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`} onClick={() => handleClick && handleClick(film)}>{film.name}</Link>
      </h3>
    </article>
  );
}

SmallFilmCard.propTypes = {
  film: filmProp,
  handleHover: PropTypes.func.isRequired,
  handleClick: PropTypes.func,
};

export default SmallFilmCard;
