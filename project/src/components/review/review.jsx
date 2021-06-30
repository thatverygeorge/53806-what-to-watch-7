import React from 'react';
import PropTypes from 'prop-types';

function Review(props) {
  const {review} = props;

  const date = new Date(review.date);
  const dateOptions = {year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}>{date.toLocaleDateString('en-US', dateOptions)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating.toString().replace('.', ',')}</div>
    </div>
  );
}

Review.propTypes = {
  review: PropTypes.object.isRequired,
};

export default Review;

