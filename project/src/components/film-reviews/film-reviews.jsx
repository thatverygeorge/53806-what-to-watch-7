import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Review from '../review/review';
import LoadingScreen from '../loading-screen/loading-screen';
import {APIRoute} from '../../const';
import {createAPI} from '../../services/api';

function FilmReviews(props) {
  const {id} = props;
  const [reviewsState, setReviewsState] = useState({
    reviews: undefined,
    isFetchComplete: false,
  });
  const {reviews, isFetchComplete} = reviewsState;

  useEffect(() => {
    (async function() {
      const api = createAPI();
      try {
        const {data} = await api.get(`${APIRoute.REVIEWS}/${id}`);
        setReviewsState((prevState) => (
          {
            ...prevState,
            reviews: data,
            isFetchComplete: true,
          }
        ));
      } catch (error) {
        setReviewsState((prevState) => (
          {
            ...prevState,
            isFetchComplete: true,
          }
        ));
      }
    })();
  }, [id]);

  if (!reviews) {
    if(!isFetchComplete) {
      return <LoadingScreen />;
    }

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
  id: PropTypes.number.isRequired,
};

export default FilmReviews;

