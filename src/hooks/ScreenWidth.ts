import React, { useEffect, useState } from 'react';

function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenWidth;
}

export default useScreenWidth;
