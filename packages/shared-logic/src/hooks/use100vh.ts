import {useEffect} from 'react';

// fix 100vh on the mobile
// solution: https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser

const use100vh = () => {
  useEffect(() => {
    function appHeight() {
      const doc = document.documentElement;
      doc.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
    }

    window.addEventListener('resize', appHeight);
    appHeight();

    return function cleanUp() {
      window.removeEventListener('resize', appHeight);
    };
  }, []);
};

export default use100vh;
