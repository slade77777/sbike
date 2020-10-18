import React from 'react';
import {useHistory} from 'react-router-dom';
import {L1_Bold, Button} from 'components-library';

export default function Second() {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  return (
    <div>
      <h1>This is the Secondpage</h1>
      <L1_Bold>Test3</L1_Bold>
      <h3>Hello world again</h3>
      <Button type="contained" onPress={() => {}} title="hello" />
      <button onClick={handleClick}>Route back</button>
    </div>
  );
}
