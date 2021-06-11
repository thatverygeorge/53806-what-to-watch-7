import React, {useState, useRef, useEffect} from 'react';

function AddReviewForm() {
  const [review, setReview] = useState({
    rating: 0,
    comment: '',
  });

  const submitButton = useRef(null);

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleRatingChange(evt) {
    const {value} = evt.target;

    setReview((prevReview) => ({
      ...prevReview,
      rating: value,
    }));
  }

  function handleCommentChange(evt) {
    const {value} = evt.target;

    setReview((prevReview) => ({
      ...prevReview,
      comment: value,
    }));
  }

  useEffect(() => {
    const {rating, comment} = review;

    if (rating !== 0 && comment.length >= 50 && comment.length <= 400) {
      submitButton.current.disabled = false;
    } else {
      submitButton.current.disabled = true;
    }
  });

  return (
    <form action="#" className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars">
          <input className="rating__input" id="star-10" type="radio" name="rating" value="10" onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-10">Rating 10</label>

          <input className="rating__input" id="star-9" type="radio" name="rating" value="9" onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-9">Rating 9</label>

          <input className="rating__input" id="star-8" type="radio" name="rating" value="8" onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-8">Rating 8</label>

          <input className="rating__input" id="star-7" type="radio" name="rating" value="7" onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-7">Rating 7</label>

          <input className="rating__input" id="star-6" type="radio" name="rating" value="6" onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-6">Rating 6</label>

          <input className="rating__input" id="star-5" type="radio" name="rating" value="5" onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-5">Rating 5</label>

          <input className="rating__input" id="star-4" type="radio" name="rating" value="4" onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-4">Rating 4</label>

          <input className="rating__input" id="star-3" type="radio" name="rating" value="3" onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-3">Rating 3</label>

          <input className="rating__input" id="star-2" type="radio" name="rating" value="2" onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-2">Rating 2</label>

          <input className="rating__input" id="star-1" type="radio" name="rating" value="1" onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-1">Rating 1</label>
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={handleCommentChange}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled ref={submitButton}>Post</button>
        </div>

      </div>
    </form>
  );
}

export default AddReviewForm;
