import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SmallFilmCard from '../small-film-card/small-film-card';
import {excludeFilm} from '../../utils';
import LoadingScreen from '../loading-screen/loading-screen';
import {fetchSimilarFilms} from '../../store/api-actions';
import {useDispatch, useSelector} from 'react-redux';
import {setIsDataLoaded} from '../../store/action';
import {getSimilarFilms} from '../../store/films/selectors';
import {getDataLoadedStatus} from '../../store/films/selectors';
import {StoreKeys} from '../../const';

const FILMS_COUNT = 4;

function FilmsListSimilar(props) {
  const {filmIDToExclude} = props;
  const similar = useSelector(getSimilarFilms);
  const isDataLoaded = useSelector((state) => getDataLoadedStatus(state, StoreKeys.SIMILAR));
  const [activeFilmID, setActiveFilmID] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchSimilarFilms(filmIDToExclude));
    }

    return () => {
      if (isDataLoaded) {
        dispatch(setIsDataLoaded({key: StoreKeys.SIMILAR, isDataLoaded: false}));
      }
    };
  }, [dispatch, filmIDToExclude, isDataLoaded]);

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  const onFilmCardHoverChange = (id) => {
    setActiveFilmID(id);
  };

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">{(!similar || similar.length - 1 === 0) ? 'More like this list is empty' : 'More like this'}</h2>

      {(!similar || similar.length - 1 === 0) ? '' :
        <div className="catalog__films-list">
          {excludeFilm(similar, filmIDToExclude).slice(0, FILMS_COUNT).map((film) => (
            <SmallFilmCard
              key={film.id}
              film={film}
              isActive={activeFilmID === film.id}
              onFilmCardHoverChange={onFilmCardHoverChange}
            />))}
        </div>}
    </section>
  );
}

FilmsListSimilar.propTypes = {
  filmIDToExclude: PropTypes.number,
};

export default FilmsListSimilar;
