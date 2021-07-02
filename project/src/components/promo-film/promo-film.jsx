import React from 'react';
import Header from '../header/header';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import ButtonPlay from '../button-play/button-play';
import filmProp from '../film-screen/film.prop';
import {connect} from 'react-redux';

function PromoFilm(props) {
  const {promoFilm} = props;

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header>
        <Logo />

        <UserBlock />
      </Header>

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
              <button className="btn btn--list film-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

PromoFilm.propTypes = {
  promoFilm: filmProp,
};

const mapStateToProps = (state) => ({
  promoFilm: state.promoFilm,
});

export {PromoFilm};
export default connect(mapStateToProps)(PromoFilm);