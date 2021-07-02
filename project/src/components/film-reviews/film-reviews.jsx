import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Review from '../review/review';
import LoadingScreen from '../loading-screen/loading-screen';
import {fetchReviews} from '../../store/api-actions';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import filmProp from '../film-screen/film.prop';

function FilmReviews(props) {
  const {film, reviews, loadReviews, isDataLoaded, setIsDataLoaded} = props;

  useEffect(() => {
    if (!isDataLoaded) {
      loadReviews(film.id);
    }

    return () => {
      if (isDataLoaded) {
        setIsDataLoaded(false);
      }
    };
  }, [film.id, isDataLoaded, loadReviews, setIsDataLoaded]);

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  if (!reviews) {
    return <p style={{ marginTop: '100px', textAlign: 'center', color: '#252525' }}>No reviews</p>;
  }

  const reviewsColumnLeft = reviews.slice(0, reviews.length / 2 + reviews.length % 2);
  const reviewsColumnRight = reviews.slice(reviews.length / 2 + reviews.length % 2);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviewsColumnLeft.map((review) => <Review key={review.id} review={review} />)}
      </div>
      <div className="film-card__reviews-col">
        {reviewsColumnRight.map((review) => <Review key={review.id} review={review} />)}
      </div>
    </div>
  );
}

FilmReviews.propTypes = {
  film: filmProp,
  reviews: PropTypes.arrayOf(PropTypes.object),
  loadReviews: PropTypes.func.isRequired,
  setIsDataLoaded: PropTypes.func.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  film: state.film.data,
  reviews: state.reviews.data,
  isDataLoaded: state.reviews.isDataLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  loadReviews(id) {
    dispatch(fetchReviews(id));
  },
  setIsDataLoaded(bool) {
    dispatch(ActionCreator.setIsDataLoaded({key: 'reviews', isDataLoaded: bool}));
  },
});

export {FilmReviews};
export default connect(mapStateToProps, mapDispatchToProps)(FilmReviews);

