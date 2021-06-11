import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import AddReviewForm from '../add-review-form/add-review-form';

function AddReviewScreen() {
  const location = useLocation();
  const {film} = location.state;

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
                <Link
                  to={{
                    pathname: `/films/${film.id}`,
                    state: {
                      film: film,
                    },
                  }}
                  className="breadcrumbs__link"
                >
                  {film.name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link
                  to={{
                    pathname: `/films/${film.id}/review`,
                    state: {
                      film: film,
                    },
                  }}
                  className="breadcrumbs__link" film={film}
                >
                  Add review
                </Link>
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
        <AddReviewForm />
      </div>

    </section>
  );
}

export default AddReviewScreen;
