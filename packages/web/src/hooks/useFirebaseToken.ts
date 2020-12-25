import {useEffect, useRef, useState} from 'react';
import {messaging} from 'shared-logic';

export default () => {
  const isFirst = useRef(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    getTokenAsync();
  }, []);

  async function getTokenAsync() {
    if (messaging && isFirst) {
      try {
        const currentToken = await messaging.getToken({
          vapidKey:
            'BNXuiqXSTKIddEz2Vliwaqu3ELyW1RmBdJ40CvGypMr6aM7MBrq1qmtUZO5EfvEO972g-xEx7cUL-PNwT0xyFpw',
        });
        setToken(currentToken);
        isFirst.current = false;
      } catch (e) {
        setToken('');
      }
    }
  }
  return token;
};
