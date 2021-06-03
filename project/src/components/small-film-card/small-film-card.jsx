import React from 'react';
import PropTypes from 'prop-types';

function SmallFilmCard({film}) {
  const {title, src} = film;

  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={src} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{title}</a>
      </h3>
    </article>
  );
}

SmallFilmCard.propTypes = {
  film: PropTypes.object,
};

export default SmallFilmCard;
