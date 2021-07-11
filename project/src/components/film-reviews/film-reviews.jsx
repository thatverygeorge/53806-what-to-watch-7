import React, {useEffect} from 'react';
import Review from '../review/review';
import LoadingScreen from '../loading-screen/loading-screen';
import {fetchReviews} from '../../store/api-actions';
import {useDispatch, useSelector} from 'react-redux';
import {setIsDataLoaded} from '../../store/action';
import {getFilm, getReviews} from '../../store/films/selectors';
import {getDataLoadedStatus} from '../../store/films/selectors';
import {StoreKeys} from '../../const';

function FilmReviews() {
  const film = useSelector(getFilm);
  const reviews = useSelector(getReviews);
  const isDataLoaded = useSelector((state) => getDataLoadedStatus(state, StoreKeys.REVIEWS));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchReviews(film.id));
    }

    return () => {
      if (isDataLoaded) {
        dispatch(setIsDataLoaded({key: StoreKeys.REVIEWS, isDataLoaded: false}));
      }
    };
  }, [dispatch, film.id, isDataLoaded]);

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  if (!reviews || reviews.length === 0) {
    return <p style={{ marginTop: '100px', textAlign: 'center', color: '#252525' }}>Reviews list is empty</p>;
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

export default FilmReviews;

