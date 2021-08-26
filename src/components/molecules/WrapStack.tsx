import React, { useState } from 'react';
import { HStack, VStack, StackProps } from '@chakra-ui/react';
import { useEffect } from 'react';

interface WrapStackProps extends StackProps {
  breakpoint: number;
}

const WrapStack: React.FC<WrapStackProps> = (props) => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  if (screenWidth > props.breakpoint) {
    return <HStack spacing="5em" {...props} />;
  } else {
    return <VStack {...props} />;
  }
};

export default WrapStack;
