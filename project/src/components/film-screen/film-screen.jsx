import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import UserBlock from '../user-block/user-block';
import ButtonPlay from '../button-play/button-play';
import ButtonMyList from '../button-my-list/button-my-list';
import FilmsListSimilar from '../films-list-similar/films-list-similar';
import FilmTabs from '../film-tabs/film-tabs';
import {AuthorizationStatus} from '../../const';
import {useSelector} from 'react-redux';
import {getAuthorizationStatus} from '../../store/user/selectors';
import filmProp from './film.prop';

function FilmScreen(props) {
  const {film} = props;
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <ButtonPlay id={film.id} />
                <ButtonMyList film={film} />
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
};

export default FilmScreen;
