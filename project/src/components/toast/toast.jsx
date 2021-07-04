import React from 'react';
import PropTypes from 'prop-types';

function Toast(props) {
  const {text} = props;

  return (
    <div className="toast">
      <p className="toast__text">{text}</p>
    </div>
  );
}

Toast.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Toast;

