import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Header from '../header/header';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import AddReviewForm from '../add-review-form/add-review-form';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import {adaptToClient} from '../../store/adapter';
import {APIRoute} from '../../const';
import {createAPI} from '../../services/api';

function AddReviewScreen() {
  const {id} = useParams();
  const [filmState, setFilmState] = useState({
    film: undefined,
    isFetchComplete: false,
  });
  const {film, isFetchComplete} = filmState;

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
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header className="page-header">
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
        </Header>

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
