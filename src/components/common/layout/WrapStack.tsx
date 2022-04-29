import React from 'react';
import { HStack, VStack, StackProps } from '@chakra-ui/react';
import useScreenWidth from '../../../hooks/ScreenWidth';

interface WrapStackProps extends StackProps {
  breakpoint: number;
}

const WrapStack: React.FC<WrapStackProps> = (props) => {
  const screenWidth = useScreenWidth();

  if (screenWidth > props.breakpoint) {
    return <HStack spacing="5em" {...props} />;
  } else {
    return <VStack {...props} />;
  }
};

export default WrapStack;
