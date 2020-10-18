import {useState} from 'react';

const useCounter = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter((c) => c + 1);
  };

  return {
    increment,
    counter,
  };
};

export default useCounter;
