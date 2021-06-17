import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import filmProp from '../film-screen/film.prop';
import VideoPlayer from '../video-player/video-player';

function SmallFilmCard(props) {
  const {film, isActive, handleHoverChange} = props;

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={() => handleHoverChange(film.id)} onMouseLeave={() => handleHoverChange(-1)}>
      <div className="small-film-card__image">
        {!isActive ? <img src={film.previewImage} alt={film.name} width="280" height="175" /> : <VideoPlayer film={film} />}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

SmallFilmCard.propTypes = {
  film: filmProp,
  isActive: PropTypes.bool.isRequired,
  handleHoverChange: PropTypes.func.isRequired,
};

export default SmallFilmCard;
