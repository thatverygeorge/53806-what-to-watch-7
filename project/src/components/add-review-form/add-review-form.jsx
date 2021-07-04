import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Toast from '../toast/toast';
import {useDispatch} from 'react-redux';
import {postReview} from '../../store/api-actions';

const TOAST_SHOW_TIME = 2000;

function AddReviewForm(props) {
  const {id} = props;
  const formRef = useRef();
  const [review, setReview] = useState({
    rating: 0,
    comment: '',
  });
  const {rating, comment} = review;
  const [toastVisibility, setToastVisbility] = useState(false);
  const dispatch = useDispatch();

  const setFormDisability = (bool) => {
    Array.from(formRef.current.elements).forEach((element) => element.disabled = bool);
  };

  const onError = () => {
    setToastVisbility(true);

    setTimeout(() => {
      if (formRef.current) {
        setFormDisability(false);
        setToastVisbility(false);
      }
    }, TOAST_SHOW_TIME);
  };

  const onSuccess = () => {
    if (formRef.current) {
      setFormDisability(false);

      formRef.current.reset();
      setReview((prevReview) => ({
        ...prevReview,
        rating: 0,
        comment: '',
      }));
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setFormDisability(true);

    dispatch(postReview(id, {rating, comment}, onSuccess, onError));
  };

  const handleRatingChange = (evt) => {
    const {value} = evt.target;

    setReview((prevReview) => ({
      ...prevReview,
      rating: value,
    }));
  };

  const handleCommentChange = (evt) => {
    const {value} = evt.target;

    setReview((prevReview) => ({
      ...prevReview,
      comment: value,
    }));
  };

  return (
    <form ref={formRef} action="#" className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars" onChange={handleRatingChange}>
          <input className="rating__input" id="star-10" type="radio" name="rating" value="10" />
          <label className="rating__label" htmlFor="star-10">Rating 10</label>

          <input className="rating__input" id="star-9" type="radio" name="rating" value="9" />
          <label className="rating__label" htmlFor="star-9">Rating 9</label>

          <input className="rating__input" id="star-8" type="radio" name="rating" value="8" />
          <label className="rating__label" htmlFor="star-8">Rating 8</label>

          <input className="rating__input" id="star-7" type="radio" name="rating" value="7" />
          <label className="rating__label" htmlFor="star-7">Rating 7</label>

          <input className="rating__input" id="star-6" type="radio" name="rating" value="6" />
          <label className="rating__label" htmlFor="star-6">Rating 6</label>

          <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
          <label className="rating__label" htmlFor="star-5">Rating 5</label>

          <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
          <label className="rating__label" htmlFor="star-4">Rating 4</label>

          <input className="rating__input" id="star-3" type="radio" name="rating" value="3" />
          <label className="rating__label" htmlFor="star-3">Rating 3</label>

          <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
          <label className="rating__label" htmlFor="star-2">Rating 2</label>

          <input className="rating__input" id="star-1" type="radio" name="rating" value="1" />
          <label className="rating__label" htmlFor="star-1">Rating 1</label>
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={handleCommentChange}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={!(rating !== 0 && comment.length >= 50 && comment.length <= 400)}>Post</button>
        </div>

      </div>

      {toastVisibility ? <Toast text={'An error occurred. Please try again.'}/> : ''}
    </form>
  );
}

AddReviewForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AddReviewForm;
