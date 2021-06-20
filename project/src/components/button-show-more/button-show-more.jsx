import React from 'react';
import PropTypes from 'prop-types';

function ButtonShowMore(props) {
  const {handleShowMoreClick} = props;

  return (
    <button className="catalog__button" type="button" onClick={handleShowMoreClick}>Show more</button>
  );
}

ButtonShowMore.propTypes = {
  handleShowMoreClick: PropTypes.func.isRequired,
};

export default ButtonShowMore;
