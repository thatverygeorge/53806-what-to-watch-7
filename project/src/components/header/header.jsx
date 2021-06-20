import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
  const {className = 'page-header film-card__head', children} = props;

  return (
    <header className={className}>
      {children}
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Header;
