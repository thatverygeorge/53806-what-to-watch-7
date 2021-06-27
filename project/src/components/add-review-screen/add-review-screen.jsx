import React from 'react';
import {Link, Redirect, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import filmProp from '../film-screen/film.prop';
import Header from '../header/header';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import AddReviewForm from '../add-review-form/add-review-form';
import {AppRoute} from '../../const';

function AddReviewScreen(props) {
  const {id} = useParams();
  const {films} = props;
  const film = films.find((currentFilm) => currentFilm.id.toString() === id);

  if (!film) {
    return <Redirect to={AppRoute.NOT_FOUND} />;
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
        <AddReviewForm />
      </div>

    </section>
  );
}

AddReviewScreen.propTypes = {
  films: PropTypes.arrayOf(
    filmProp,
  ),
};

export default AddReviewScreen;
