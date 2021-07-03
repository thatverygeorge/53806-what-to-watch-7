import React, {useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import Header from '../header/header';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import UserBlock from '../user-block/user-block';
import ButtonPlay from '../button-play/button-play';
import FilmsListSimilar from '../films-list-similar/films-list-similar';
import FilmTabs from '../film-tabs/film-tabs';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFilm} from '../../store/api-actions';
import {setIsDataLoaded} from '../../store/action';
import {getFilm} from '../../store/films/selectors';
import {getDataLoadedStatus} from '../../store/films/selectors';
import {getAuthorizationStatus} from '../../store/user/selectors';

function FilmScreen() {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const film = useSelector(getFilm);
  const isDataLoaded = useSelector((state) => getDataLoadedStatus(state, 'film'));
  const {id} = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchFilm(id));
    }

    return () => {
      if (isDataLoaded) {
        dispatch(setIsDataLoaded({key: 'film', isDataLoaded: false}));
      }
    };
  }, [dispatch, id, isDataLoaded]);

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
                <button className="btn btn--list film-card__button" type="button" onClick={() => history.push(AppRoute.MY_LIST)}>
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

export default FilmScreen;
