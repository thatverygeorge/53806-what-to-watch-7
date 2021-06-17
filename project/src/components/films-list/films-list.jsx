import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SmallFilmCard from '../small-film-card/small-film-card';
import films from '../../mocks/films';
import filmProp from '../film-screen/film.prop';

function FilmsList(props) {
  const [activeFilmID, setActiveFilmID] = useState(-1);
  const {filmToExclude, isSimilarGenre} = props;

  function handleHoverChange(id) {
    setActiveFilmID(id);
  }

  function getFilms() {
    return isSimilarGenre ?
      films.filter((film) => film.genre === filmToExclude.genre && film.name !== filmToExclude.name).slice(0, 4) :
      films.filter((film) => film.name !== filmToExclude.name);
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
  isSimilarGenre: PropTypes.bool.isRequired,
};

export default FilmsList;
