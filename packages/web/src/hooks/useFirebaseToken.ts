import {useEffect, useRef, useState} from 'react';
import {messaging} from 'shared-logic';

export default () => {
  const isFirst = useRef(true);
  const [token, setToken] = useState('');
  useEffect(() => {
    if (messaging && isFirst) {
      messaging
        .getToken({
          vapidKey:
            'BNXuiqXSTKIddEz2Vliwaqu3ELyW1RmBdJ40CvGypMr6aM7MBrq1qmtUZO5EfvEO972g-xEx7cUL-PNwT0xyFpw',
        })
        .then((currentToken) => {
          // eslint-disable-next-line promise/always-return
          if (currentToken) {
            isFirst.current = false;
            setToken(currentToken);
          } else {
            setToken('');
          }
        })
        .catch((err) => {
          console.log(err);
          setToken('');
        });
    }
  }, []);
  return token;
};
