import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Header from '../header/header';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import UserBlock from '../user-block/user-block';
import ButtonPlay from '../button-play/button-play';
import FilmsList from '../films-list/films-list';
import FilmTabs from '../film-tabs/film-tabs';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import {APIRoute, AuthorizationStatus} from '../../const';
import {createAPI} from '../../services/api';
import {adaptToClient} from '../../store/adapter';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

function FilmScreen(props) {
  const {authorizationStatus} = props;
  const [filmState, setFilmState] = useState({
    film: undefined,
    similar: undefined,
    isFetchComplete: false,
  });
  const {film, similar, isFetchComplete} = filmState;

  const {id} = useParams();
  const FILMS_COUNT = 4;

  useEffect(() => {
    (async function() {
      const api = createAPI();
      try {
        const filmResponse = await api.get(`${APIRoute.FILMS}/${id}`);
        setFilmState((prevState) => (
          {
            ...prevState,
            film: adaptToClient(filmResponse.data),
            isFetchComplete: true,
          }
        ));

        const similarResponse = await api.get(`${APIRoute.FILMS}/${id}${APIRoute.SIMILAR}`);
        setFilmState((prevState) => (
          {
            ...prevState,
            similar: similarResponse.data.map((similarFilm) => adaptToClient(similarFilm)),
            isFetchComplete: true,
          }
        ));
      } catch (error) {
        setFilmState((prevState) => (
          {
            ...prevState,
            isFetchComplete: true,
          }
        ));
      }
    })();
  }, [id]);

  if (!film) {
    if(!isFetchComplete) {
      return <LoadingScreen />;
    }

    return <NotFoundScreen />;
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
                {authorizationStatus === AuthorizationStatus.AUTH ? <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link> : ''}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
            </div>

            <FilmTabs film={film} id={film.id} />
          </div>
        </div>
      </section>

      <div className="page-content">
        {(!similar || (similar.length - 1 <= 0)) ? '' :
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <FilmsList films={similar} filmIDToExclude={film.id} filmsCount={FILMS_COUNT} />
          </section>}
        <Footer />
      </div>
    </>
  );
}

FilmScreen.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

export {FilmScreen};
export default connect(mapStateToProps)(FilmScreen);
