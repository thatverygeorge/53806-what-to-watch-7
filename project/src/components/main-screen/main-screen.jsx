import React, {useState, useEffect} from 'react';
import FilmsList from '../films-list/films-list';
import GenresList from '../genres-list/genres-list';
import Footer from '../footer/footer';
import ButtonShowMore from '../button-show-more/button-show-more';
import {useDispatch, useSelector} from 'react-redux';
import {getFilmsByGenre} from '../../utils';
import PromoFilm from '../promo-film/promo-film';
import {changeGenre} from '../../store/action';
import {getFilms} from '../../store/films/selectors';
import {getGenre} from '../../store/util/selectors';

const INITIAL_FILMS_COUNT = 8;
const ADD_FILMS_STEP = 8;
const INITIAL_GENRE = 'All genres';

function MainScreen() {
  const films = useSelector(getFilms);
  const genre = useSelector(getGenre);
  const [filmsCount, setFilmsCount] = useState(INITIAL_FILMS_COUNT);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeGenre(INITIAL_GENRE));
  }, [dispatch]);

  function handleGenreChange(evt) {
    if (evt.target.tagName === 'A') {
      evt.preventDefault();

      if (evt.target.textContent !== genre) {
        setFilmsCount(INITIAL_FILMS_COUNT);
        dispatch(changeGenre(evt.target.textContent));
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

export default MainScreen;
