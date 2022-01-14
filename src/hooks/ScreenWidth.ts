import { useEffect, useState } from 'react';

function useScreenWidth(): number {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenWidth;
}

export default useScreenWidth;
