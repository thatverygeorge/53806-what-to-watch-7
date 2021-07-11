import React from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory} from 'react-router-dom';
import filmProp from '../film-screen/film.prop';
import SmallFilmCardPlayer from '../small-film-card-player/small-film-card-player';

function SmallFilmCard(props) {
  const history = useHistory();
  const {film, isActive, onFilmCardHoverChange} = props;

  return (
    <article
      style={{cursor: 'pointer'}}
      className="small-film-card catalog__films-card"
      onClick={() => history.push(`/films/${film.id}`)}
      onMouseEnter={() => onFilmCardHoverChange(film.id)}
      onMouseLeave={() => onFilmCardHoverChange(undefined)}
    >
      <div className="small-film-card__image">
        {!isActive ? <img src={film.previewImage} alt={film.name} width="280" height="175" /> : <SmallFilmCardPlayer film={film} />}
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${film.id}`} className="small-film-card__link">{film.name}</Link>
      </h3>
    </article>
  );
}

SmallFilmCard.propTypes = {
  film: filmProp,
  isActive: PropTypes.bool.isRequired,
  onFilmCardHoverChange: PropTypes.func.isRequired,
};

export default SmallFilmCard;
