import React from 'react';
import Header from '../header/header';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import UserBlock from '../user-block/user-block';
import FilmsList from '../films-list/films-list';
import {useSelector} from 'react-redux';
import {getFilms} from '../../store/films/selectors';

function MyListScreen() {
  const films = useSelector(getFilms);

  return (
    <div className="user-page">
      <Header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock />
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList films={films} filmsCount={films.length} />
      </section>

      <Footer />
    </div>
  );
}

export default MyListScreen;
