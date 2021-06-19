import React from 'react';
import PropTypes from 'prop-types';
import FilmsList from '../films-list/films-list';
import GenresList from '../genres-list/genres-list';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import UserBlock from '../user-block/user-block';
import ButtonPlay from '../button-play/button-play';
import filmProp from '../film-screen/film.prop';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {getFilmsByGenre} from '../../utils';

function MainScreen(props) {
  const {films, genre, onGenreChange} = props;
  const promoFilm = films[0];
  const FILMS_COUNT = 8;

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />

          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={`${promoFilm.name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <ButtonPlay film={promoFilm} />
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList films={films} activeGenre={genre} onGenreChange={onGenreChange} />

          <FilmsList films={getFilmsByGenre(films, genre)} filmToExclude={promoFilm} filmsCount={FILMS_COUNT} />

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
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
  genre: state.genre,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChange(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
});

export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
