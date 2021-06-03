import React from 'react';
import MainScreen from '../main-screen/main-screen';
import PropTypes from 'prop-types';

function App({promoFilm, films}) {
  return (
    <MainScreen
      promoFilm={promoFilm}
      films={films}
    />
  );
}

App.propTypes = {
  promoFilm: PropTypes.object,
  films: PropTypes.arrayOf(PropTypes.object),
};

export default App;
