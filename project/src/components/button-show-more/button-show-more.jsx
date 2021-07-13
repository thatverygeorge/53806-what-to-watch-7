import React from 'react';
import PropTypes from 'prop-types';

function ButtonShowMore(props) {
  const {onShowMoreButtonClick} = props;

  return (
    <button className="catalog__button" type="button" onClick={onShowMoreButtonClick}>Show more</button>
  );
}

ButtonShowMore.propTypes = {
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

export default ButtonShowMore;
