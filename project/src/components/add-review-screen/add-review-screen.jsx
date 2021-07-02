import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Header from '../header/header';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import AddReviewForm from '../add-review-form/add-review-form';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import {ActionCreator} from '../../store/action';
import {connect} from 'react-redux';
import {fetchFilm} from '../../store/api-actions';
import PropTypes from 'prop-types';
import filmProp from '../film-screen/film.prop';

function AddReviewScreen(props) {
  const {film, isDataLoaded, loadFilm, setIsDataLoaded} = props;
  const {id} = useParams();

  useEffect(() => {
    if (!isDataLoaded) {
      loadFilm(id);
    }

    return () => {
      if (isDataLoaded) {
        setIsDataLoaded(false);
      }
    };
  }, [id, isDataLoaded, loadFilm, setIsDataLoaded]);

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  if (!film || film.id.toString() !== id) {
    return <NotFoundScreen />;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`/films/${film.id}/review`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm id={id} />
      </div>

    </section>
  );
}

AddReviewScreen.propTypes = {
  film: filmProp,
  isDataLoaded: PropTypes.bool.isRequired,
  loadFilm: PropTypes.func.isRequired,
  setIsDataLoaded: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  film: state.film.data,
  isDataLoaded: state.film.isDataLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  loadFilm(id) {
    dispatch(fetchFilm(id));
  },
  setIsDataLoaded(bool) {
    dispatch(ActionCreator.setIsDataLoaded({key: 'film', isDataLoaded: bool}));
  },
});

export {AddReviewScreen};
export default connect(mapStateToProps, mapDispatchToProps)(AddReviewScreen);
