import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import filmProp from '../film-screen/film.prop';
import {AppRoute} from '../../const';

function GenresList(props) {
  const {films, activeGenre, onGenreChange} = props;

  const genres = new Set(films.map((film) => film.genre));

  return (
    <ul className="catalog__genres-list" onClick={onGenreChange}>
      <li className={`catalog__genres-item ${activeGenre === 'All genres' ? 'catalog__genres-item--active' : ''}`}>
        <Link to={AppRoute.MAIN} className="catalog__genres-link">All genres</Link>
      </li>

      {Array.from(genres).map((genre) => (
        <li className={`catalog__genres-item ${activeGenre === genre ? 'catalog__genres-item--active' : ''}`} key={genre}>
          <Link to={AppRoute.MAIN} className="catalog__genres-link">{genre}</Link>
        </li>
      ))}
    </ul>
  );
}

GenresList.propTypes = {
  films: PropTypes.arrayOf(
    filmProp,
  ),
  activeGenre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func.isRequired,
};

export default GenresList;
