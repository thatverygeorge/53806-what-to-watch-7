import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import FilmsList from '../films-list/films-list';
import GenresList from '../genres-list/genres-list';
import Footer from '../footer/footer';
import ButtonShowMore from '../button-show-more/button-show-more';
import filmProp from '../film-screen/film.prop';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {getFilmsByGenre} from '../../utils';
import PromoFilm from '../promo-film/promo-film';

const INITIAL_FILMS_COUNT = 8;
const ADD_FILMS_STEP = 8;
const INITIAL_GENRE = 'All genres';

function MainScreen(props) {
  const {films, genre, onGenreChange} = props;
  const [filmsCount, setFilmsCount] = useState(INITIAL_FILMS_COUNT);

  useEffect(() => {
    onGenreChange(INITIAL_GENRE);
  }, [onGenreChange]);

  function handleGenreChange(evt) {
    if (evt.target.tagName === 'A') {
      evt.preventDefault();

      if (evt.target.textContent !== genre) {
        setFilmsCount(INITIAL_FILMS_COUNT);
        onGenreChange(evt.target.textContent);
      }
    }
  }

  function handleShowMoreClick() {
    setFilmsCount((prevFilmsCount) => prevFilmsCount + ADD_FILMS_STEP);
  }

  return (
    <>
      <PromoFilm />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList films={films} activeGenre={genre} handleGenreChange={handleGenreChange} />

          <FilmsList films={getFilmsByGenre(films, genre)} filmsCount={filmsCount} />

          <div className="catalog__more">
            {!(filmsCount >= getFilmsByGenre(films, genre).length) && <ButtonShowMore handleShowMoreClick={handleShowMoreClick} />}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

MainScreen.propTypes = {
  genre: PropTypes.string.isRequired,
  films: PropTypes.arrayOf(
    filmProp,
  ),
  onGenreChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: state.films.data,
  genre: state.genre,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChange(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
});

export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
