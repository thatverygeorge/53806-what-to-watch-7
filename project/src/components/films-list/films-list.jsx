import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SmallFilmCard from '../small-film-card/small-film-card';
import filmProp from '../film-screen/film.prop';
import {excludeFilm} from '../../utils';

function FilmsList(props) {
  const {films, filmIDToExclude, filmsCount} = props;
  const [activeFilmID, setActiveFilmID] = useState(undefined);

  function handleHoverChange(id) {
    setActiveFilmID(id);
  }

  return (
    <div className="catalog__films-list">
      {excludeFilm(films, filmIDToExclude).slice(0, filmsCount).map((film) => (
        <SmallFilmCard
          key={film.id}
          film={film}
          isActive={activeFilmID === film.id}
          handleHoverChange={handleHoverChange}
        />))}
    </div>
  );
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(
    filmProp,
  ),
  filmsCount: PropTypes.number.isRequired,
  filmIDToExclude: PropTypes.number,
};

export default FilmsList;
