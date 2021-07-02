import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Header from '../header/header';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import UserBlock from '../user-block/user-block';
import ButtonPlay from '../button-play/button-play';
import FilmsListSimilar from '../films-list-similar/films-list-similar';
import FilmTabs from '../film-tabs/film-tabs';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import {AuthorizationStatus} from '../../const';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {fetchFilm} from '../../store/api-actions';
import filmProp from '../film-screen/film.prop';

function FilmScreen(props) {
  const {film, isDataLoaded, loadFilm, setIsDataLoaded, authorizationStatus} = props;
  const {id} = useParams();

  useEffect(() => {
    if (!isDataLoaded) {
      loadFilm(id);
    }

    return () => {
      if (isDataLoaded) {
        setIsDataLoaded(false);
      }
    };
  }, [id, isDataLoaded, loadFilm, setIsDataLoaded]);

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  if (!film || film.id.toString() !== id) {
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
                <ButtonPlay id={film.id} />
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

            <FilmTabs film={film} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <FilmsListSimilar filmIDToExclude={film.id}/>
        <Footer />
      </div>
    </>
  );
}

FilmScreen.propTypes = {
  film: filmProp,
  isDataLoaded: PropTypes.bool.isRequired,
  loadFilm: PropTypes.func.isRequired,
  setIsDataLoaded: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  film: state.film.data,
  similar: state.similar.data,
  isDataLoaded: state.film.isDataLoaded,
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  loadFilm(id) {
    dispatch(fetchFilm(id));
  },
  setIsDataLoaded(bool) {
    dispatch(ActionCreator.setIsDataLoaded({key: 'film', isDataLoaded: bool}));
  },
});

export {FilmScreen};
export default connect(mapStateToProps, mapDispatchToProps)(FilmScreen);
