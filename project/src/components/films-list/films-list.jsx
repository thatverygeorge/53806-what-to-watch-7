/* eslint-disable no-console */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import SmallFilmCard from '../small-film-card/small-film-card';
import filmProp from '../film-screen/film.prop';

function FilmsList(props) {
  const {films, handleClick} = props;
  const [filmID, setFilmID] = useState(0);

  function handleHover(film) {
    setFilmID(film.id);
  }

  useEffect(() => {
    console.log(filmID);
  });

  return (
    <div className="catalog__films-list">
      {films.map((film) => <SmallFilmCard key={film.id} film={film} handleHover={handleHover} handleClick={handleClick} />)}
    </div>
  );
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(
    filmProp,
  ),
  handleClick: PropTypes.func,
};

export default FilmsList;
