import React from 'react';
import filmProp from '../film-screen/film.prop';

function FilmDetails(props) {
  const {film} = props;

  function formatRunTime(runTime) {
    const hours = Math.floor(runTime / 60);
    const minutes = runTime % 60 > 9 ? runTime % 60 : `0${runTime % 60}`;

    if (hours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0 || minutes === '00') {
      return `${hours}h`;
    }

    return `${hours}h ${minutes}m`;
  }

  function renderStarring(starring) {
    return starring.map((star, index, array) => {
      const key = `${film.id}-${index}`;
      return index < array.length - 1 ? <React.Fragment key={key}>{`${star}, `}<br /></React.Fragment> : <React.Fragment key={key}>{star}</React.Fragment>;
    });
  }

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
          <span className="film-card__details-value">{formatRunTime(film.runTime)}</span>
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
