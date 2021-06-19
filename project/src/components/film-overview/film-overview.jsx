import React from 'react';
import filmProp from '../film-screen/film.prop';
import {getRatingLevel} from '../../utils';

function FilmOverview(props) {
  const {film} = props;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating.toString().replace('.', ',')}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingLevel(film.rating)}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director"><strong>Director: {film.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {film.starring.join(', ')}</strong></p>
      </div>
    </>
  );
}

FilmOverview.propTypes = {
  film: filmProp,
};

export default FilmOverview;

