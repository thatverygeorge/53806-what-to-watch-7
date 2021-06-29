import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function NotFoundScreen() {
  return (
    <section style={{ marginTop: '100px', textAlign: 'center', color: '#252525' }}>
      <h1>404. Page not found</h1>
      <Link to={AppRoute.MAIN}>Go to the main page</Link>
    </section>
  );
}

export default NotFoundScreen;
