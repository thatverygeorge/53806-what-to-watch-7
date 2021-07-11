import React, {useEffect} from 'react';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import UserBlock from '../user-block/user-block';
import FilmsList from '../films-list/films-list';
import LoadingScreen from '../loading-screen/loading-screen';
import {useDispatch, useSelector} from 'react-redux';
import {getDataLoadedStatus, getFavoriteFilms} from '../../store/films/selectors';
import {setIsDataLoaded} from '../../store/action';
import {fetchFavoriteFilms} from '../../store/api-actions';
import {StoreKeys} from '../../const';

function MyListScreen() {
  const films = useSelector(getFavoriteFilms);
  const isDataLoaded = useSelector((state) => getDataLoadedStatus(state, StoreKeys.FAVORITE));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchFavoriteFilms());
    }

    return () => {
      if (isDataLoaded) {
        dispatch(setIsDataLoaded({key: StoreKeys.FAVORITE, isDataLoaded: false}));
      }
    };
  }, [dispatch, isDataLoaded]);

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock />
      </header>

      <section className="catalog">
        {(!films || films.length === 0) ?
          <h2 className="catalog__title">Catalog is empty</h2> :
          <h2 className="catalog__title visually-hidden">Catalog</h2>}

        {(!films || films.length === 0) ? '' : <FilmsList films={films} filmsCount={films.length} />}
      </section>

      <Footer />
    </div>
  );
}

export default MyListScreen;
