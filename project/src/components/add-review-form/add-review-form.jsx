import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Toast from '../toast/toast';
import {useDispatch} from 'react-redux';
import {postReview} from '../../store/api-actions';
import {redirectToRoute} from '../../store/action';

const TOAST_SHOW_TIME = 2000;
const errorMessage = 'An error occurred. Please try again.';

function AddReviewForm(props) {
  const {id} = props;
  const [review, setReview] = useState({
    rating: 0,
    comment: '',
  });
  const {rating, comment} = review;
  const [toastVisibility, setToastVisbility] = useState(false);
  const dispatch = useDispatch();

  const setFormDisability = (form, bool) => {
    Array.from(form.elements).forEach((element) => element.disabled = bool);
  };

  const onError = (form) => {
    setToastVisbility(form, true);

    setTimeout(() => {
      if (form) {
        setFormDisability(form, false);
        setToastVisbility(form, false);
      }
    }, TOAST_SHOW_TIME);
  };

  const onSuccess = (form) => {
    if (form) {
      setFormDisability(form, false);

      form.reset();
      setReview((prevReview) => ({
        ...prevReview,
        rating: 0,
        comment: '',
      }));
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setFormDisability(evt.target, true);

    dispatch(postReview(id, {rating, comment}, onSuccess, onError))
      .then(() => {
        onSuccess(evt.target);
        dispatch(redirectToRoute(`/films/${id}`));
      })
      .catch(() => onError(evt.target));
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
    <form action="#" className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars" onChange={handleRatingChange}>
          <input className="rating__input" id="star-10" type="radio" name="rating" value="10" data-testid="star-10" />
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
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          onChange={handleCommentChange}
          data-testid="review-text"
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={!(rating !== 0 && comment.length >= 50 && comment.length <= 400)}>Post</button>
        </div>

      </div>

      {toastVisibility ? <Toast text={errorMessage}/> : ''}
    </form>
  );
}

AddReviewForm.propTypes = {
  id: PropTypes.number.isRequired,
};

export default AddReviewForm;
