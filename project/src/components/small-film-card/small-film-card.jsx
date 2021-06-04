import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function SmallFilmCard({film}) {
  const {title, src} = film;

  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={src} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to="/films/1">{title}</Link>
      </h3>
    </article>
  );
}

SmallFilmCard.propTypes = {
  film: PropTypes.object.isRequired,
};

export default SmallFilmCard;
