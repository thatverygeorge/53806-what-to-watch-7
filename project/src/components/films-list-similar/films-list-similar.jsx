import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SmallFilmCard from '../small-film-card/small-film-card';
import filmProp from '../film-screen/film.prop';
import {excludeFilm} from '../../utils';
import LoadingScreen from '../loading-screen/loading-screen';
import {fetchSimilarFilms} from '../../store/api-actions';
import {ActionCreator} from '../../store/action';
import {connect} from 'react-redux';

const FILMS_COUNT = 4;

function FilmsListSimilar(props) {
  const {
    similar,
    filmIDToExclude,
    isDataLoaded,
    loadSimilarFilms,
    setIsDataLoaded,
  } = props;
  const [activeFilmID, setActiveFilmID] = useState(undefined);

  useEffect(() => {
    if (!isDataLoaded) {
      loadSimilarFilms(filmIDToExclude);
    }

    return () => {
      if (isDataLoaded) {
        setIsDataLoaded(false);
      }
    };
  }, [filmIDToExclude, isDataLoaded, loadSimilarFilms, setIsDataLoaded]);

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  function handleHoverChange(id) {
    setActiveFilmID(id);
  }

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">{!similar ? 'No more like this' : 'More like this'}</h2>

      {!similar ? '' :
        <div className="catalog__films-list">
          {excludeFilm(similar, filmIDToExclude).slice(0, FILMS_COUNT).map((film) => (
            <SmallFilmCard
              key={film.id}
              film={film}
              isActive={activeFilmID === film.id}
              handleHoverChange={handleHoverChange}
            />))}
        </div>}
    </section>
  );
}

FilmsListSimilar.propTypes = {
  filmIDToExclude: PropTypes.number,
  similar: PropTypes.arrayOf(filmProp),
  isDataLoaded: PropTypes.bool.isRequired,
  loadSimilarFilms: PropTypes.func.isRequired,
  setIsDataLoaded: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  similar: state.similar.data,
  isDataLoaded: state.similar.isDataLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  loadSimilarFilms(id) {
    dispatch(fetchSimilarFilms(id));
  },
  setIsDataLoaded(bool) {
    dispatch(ActionCreator.setIsDataLoaded({key: 'similar', isDataLoaded: bool}));
  },
});

export {FilmsListSimilar};
export default connect(mapStateToProps, mapDispatchToProps)(FilmsListSimilar);
