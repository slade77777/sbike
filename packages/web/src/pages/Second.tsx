import React from 'react';
import {useHistory} from 'react-router-dom';

export default function Second() {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  return (
    <div>
      <h1>This is the Secondpage</h1>
      <h3>Hello world again</h3>
      <button onClick={handleClick}>Route back</button>
    </div>
  );
}
