import React from 'react';
import {Link, Redirect, useParams} from 'react-router-dom';
import Header from '../header/header';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import UserBlock from '../user-block/user-block';
import ButtonPlay from '../button-play/button-play';
import FilmsList from '../films-list/films-list';
import FilmTabs from '../film-tabs/film-tabs';
import {getFilmsByGenre} from '../../utils';
import PropTypes from 'prop-types';
import filmProp from '../film-screen/film.prop';
import {AppRoute} from '../../const';

function FilmScreen(props) {
  const {id} = useParams();
  const {films} = props;
  const film = films.find((currentFilm) => currentFilm.id.toString() === id);
  const FILMS_COUNT = 4;

  if (!film) {
    return <Redirect to={AppRoute.NOT_FOUND} />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header>
            <Logo />

            <UserBlock />
          </Header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <ButtonPlay film={film} />
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
            </div>

            <FilmTabs film={film} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className={`catalog catalog--like-this ${getFilmsByGenre(films, film.genre).length - 1 <= 0 ? 'visually-hidden' : ''}`}>
          <h2 className="catalog__title">More like this</h2>

          <FilmsList films={getFilmsByGenre(films, film.genre)} filmIDToExclude={film.id} filmsCount={FILMS_COUNT} />
        </section>

        <Footer />
      </div>
    </>
  );
}

FilmScreen.propTypes = {
  films: PropTypes.arrayOf(
    filmProp,
  ),
};

export default FilmScreen;
