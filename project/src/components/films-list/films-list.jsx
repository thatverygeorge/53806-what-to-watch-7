import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SmallFilmCard from '../small-film-card/small-film-card';
import filmProp from '../film-screen/film.prop';

function FilmsList(props) {
  const {films, handleClickOnFilm} = props;
  const [activeFilmID, setActiveFilmID] = useState(-1);

  function handleHoverOnFilm(id) {
    setActiveFilmID(id);
  }

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <SmallFilmCard
          key={film.id}
          film={film}
          activeFilmID={activeFilmID}
          handleClickOnFilm={handleClickOnFilm}
          handleHoverOnFilm={handleHoverOnFilm}
        />))}
    </div>
  );
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(
    filmProp,
  ),
  handleClickOnFilm: PropTypes.func,
};

export default FilmsList;
