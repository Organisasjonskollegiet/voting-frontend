import React, { useState } from 'react';
import { HStack, VStack, StackProps } from '@chakra-ui/react';
import { useEffect } from 'react';

const WrapStack: React.FC<StackProps> = (props) => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  if (screenWidth > 550) {
    return <HStack spacing="5em" {...props} />;
  } else {
    return <VStack {...props} />;
  }
};

export default WrapStack;
