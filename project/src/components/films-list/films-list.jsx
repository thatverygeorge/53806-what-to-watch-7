import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SmallFilmCard from '../small-film-card/small-film-card';
import filmProp from '../film-screen/film.prop';

function FilmsList(props) {
  const [activeFilmID, setActiveFilmID] = useState(-1);
  const {films, filmToExclude, filmsCount} = props;

  function handleHoverChange(id) {
    setActiveFilmID(id);
  }

  function getFilms() {
    return films.filter((film) => film.id !== filmToExclude.id).slice(0, filmsCount);
  }

  return (
    <div className="catalog__films-list">
      {getFilms().map((film) => (
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
  filmToExclude: filmProp,
  films: PropTypes.arrayOf(
    filmProp,
  ),
  filmsCount: PropTypes.number.isRequired,
};

export default FilmsList;
