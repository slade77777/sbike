import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>This is the homepage</h1>
      <Link to="/second">Route to second page</Link>
    </div>
  );
}
