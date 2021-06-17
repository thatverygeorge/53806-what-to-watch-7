import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SmallFilmCard from '../small-film-card/small-film-card';
import filmProp from '../film-screen/film.prop';

function FilmsList(props) {
  const {films} = props;
  const [activeFilmID, setActiveFilmID] = useState(-1);

  function handleHoverChange(id) {
    setActiveFilmID(id);
  }

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
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
};

export default FilmsList;
