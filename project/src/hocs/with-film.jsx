import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import LoadingScreen from '../components/loading-screen/loading-screen';
import NotFoundScreen from '../components/not-found-screen/not-found-screen';
import {StoreKeys} from '../const';
import {setIsDataLoaded} from '../store/action';
import {fetchFilm} from '../store/api-actions';
import {getDataLoadedStatus, getFilm} from '../store/films/selectors';

const withFilm = (Component) => {
  function WithFilm(props) {
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

    if (!film) {
      return <NotFoundScreen />;
    }

    return <Component film={film} />;
  }

  return WithFilm;
};

export default withFilm;
