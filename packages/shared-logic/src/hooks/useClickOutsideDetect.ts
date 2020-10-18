import {useEffect} from 'react';

const useClickOutsideDetect = (
  ref: any,
  handler: (isClickOutside: boolean) => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(true);
      } else {
        handler(false);
      }
    };

    if (ref) document.addEventListener('mousedown', handleClickOutside);
    return () => {
      if (ref) document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export default useClickOutsideDetect;
