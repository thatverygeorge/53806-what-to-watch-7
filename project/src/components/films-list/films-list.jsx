import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SmallFilmCard from '../small-film-card/small-film-card';
import filmProp from '../film-screen/film.prop';

function FilmsList(props) {
  const {films, filmsCount} = props;
  const [activeFilmID, setActiveFilmID] = useState(undefined);

  const onFilmCardHoverChange = (id) => {
    setActiveFilmID(id);
  };

  return (
    <div className="catalog__films-list">
      {films.slice(0, filmsCount).map((film) => (
        <SmallFilmCard
          key={film.id}
          film={film}
          isActive={activeFilmID === film.id}
          onFilmCardHoverChange={onFilmCardHoverChange}
        />))}
    </div>
  );
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(
    filmProp,
  ),
  filmsCount: PropTypes.number.isRequired,
};

export default FilmsList;
