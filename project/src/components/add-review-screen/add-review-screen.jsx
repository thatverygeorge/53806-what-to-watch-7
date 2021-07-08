import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import AddReviewForm from '../add-review-form/add-review-form';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFilm} from '../../store/api-actions';
import {setIsDataLoaded} from '../../store/action';
import {getFilm} from '../../store/films/selectors';
import {getDataLoadedStatus} from '../../store/films/selectors';
import {StoreKeys} from '../../const';

function AddReviewScreen() {
  const film = useSelector(getFilm);
  const isDataLoaded = useSelector((state) => getDataLoadedStatus(state, StoreKeys.FILM));
  const {id} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchFilm(id));
    }

    return () => {
      if (isDataLoaded) {
        dispatch(setIsDataLoaded({key: StoreKeys.FILM, isDataLoaded: false}));
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
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`/films/${film.id}/review`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm id={id} />
      </div>

    </section>
  );
}

export default AddReviewScreen;
