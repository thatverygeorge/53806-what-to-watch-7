import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import filmProp from '../film-screen/film.prop';
import VideoPlayer from '../video-player/video-player';

function SmallFilmCard(props) {
  const {film, activeFilmID, handleHoverOnFilm, handleClickOnFilm} = props;

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={()=> handleHoverOnFilm(film.id)} onMouseLeave={()=> handleHoverOnFilm(-1)}>
      <div className="small-film-card__image">
        {film.id !== activeFilmID ? <img src={film.previewImage} alt={film.name} width="280" height="175" /> : <VideoPlayer film={film} />}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`} onClick={() => handleClickOnFilm && handleClickOnFilm(film)}>{film.name}</Link>
      </h3>
    </article>
  );
}

SmallFilmCard.propTypes = {
  film: filmProp,
  activeFilmID: PropTypes.number.isRequired,
  handleHoverOnFilm: PropTypes.func.isRequired,
  handleClickOnFilm: PropTypes.func,
};

export default SmallFilmCard;
