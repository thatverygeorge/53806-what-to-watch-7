import React from 'react';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import ButtonPlay from '../button-play/button-play';
import ButtonMyList from '../button-my-list/button-my-list';
import {useSelector} from 'react-redux';
import {getPromoFilm} from '../../store/films/selectors';

function PromoFilm() {
  const promoFilm = useSelector(getPromoFilm);

  return (
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
              <ButtonPlay id={promoFilm.id} />
              <ButtonMyList film={promoFilm} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoFilm;
