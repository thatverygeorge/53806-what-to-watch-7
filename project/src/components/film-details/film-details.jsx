import React from 'react';
import filmProp from '../film-screen/film.prop';
import {formatRunTimeForFilmDetails} from '../../utils';

function FilmDetails(props) {
  const {film} = props;

  const renderStarring = (starring) =>
    starring.map((star, index, array) =>
      index < array.length - 1 ? <React.Fragment key={star}>{`${star}, `}<br /></React.Fragment> : <React.Fragment key={star}>{star}</React.Fragment>);

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{film.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">{renderStarring(film.starring)}</span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{formatRunTimeForFilmDetails(film.runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{film.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{film.released}</span>
        </p>
      </div>
    </div>
  );
}

FilmDetails.propTypes = {
  film: filmProp,
};

export default FilmDetails;
