import React from 'react';
import {Link} from 'react-router-dom';

function NotFoundScreen() {
  return (
    <section style={{ marginTop: '150px', textAlign: 'center' }}>
      <h1>404. Page not found</h1>
      <Link to="/">Go to the main page</Link>
    </section>
  );
}

export default NotFoundScreen;
