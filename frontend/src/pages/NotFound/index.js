import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

function NotFound() {
  return (
      <div className="container text-center">
          <h2 className="my-5">Page not found</h2>
          <Link to="/">Back to home</Link>
      </div>
  );
}

export default NotFound;