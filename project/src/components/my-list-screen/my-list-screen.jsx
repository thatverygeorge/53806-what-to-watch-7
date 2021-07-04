import React, {useEffect} from 'react';
import Header from '../header/header';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import UserBlock from '../user-block/user-block';
import FilmsList from '../films-list/films-list';
import LoadingScreen from '../loading-screen/loading-screen';
import {useDispatch, useSelector} from 'react-redux';
import {getDataLoadedStatus, getFavoriteFilms} from '../../store/films/selectors';
import {setIsDataLoaded} from '../../store/action';
import {fetchFavoriteFilms} from '../../store/api-actions';

function MyListScreen() {
  const films = useSelector(getFavoriteFilms);
  const isDataLoaded = useSelector((state) => getDataLoadedStatus(state, 'favorite'));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchFavoriteFilms());
    }

    return () => {
      if (isDataLoaded) {
        dispatch(setIsDataLoaded({key: 'favorite', isDataLoaded: false}));
      }
    };
  }, [dispatch, isDataLoaded]);

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className="user-page">
      <Header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock />
      </Header>

      <section className="catalog">
        {(!films || films.length === 0) ?
          <h2 className="catalog__title">No favorite films</h2> :
          <h2 className="catalog__title visually-hidden">Catalog</h2>}

        {(!films || films.length === 0) ? '' : <FilmsList films={films} filmsCount={films.length} />}
      </section>

      <Footer />
    </div>
  );
}

export default MyListScreen;
