import React from 'react';
import { VStack, Center, Spinner, Text } from '@chakra-ui/react';
import { darkblue } from '../styles/colors';

export interface LoadingProps {
  text: string;
  asOverlay?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ text, asOverlay }) => {
  const textStyle = {
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '150%',
    color: darkblue,
  };

  const overlaySpinnerStyle = {
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    left: '0',
    top: '0',
    backgroundColor: 'rgba(255, 255, 255, 0.4);',
    // opacity: 0.2,
    zIndex: 10,
  } as React.CSSProperties;

  const style = {
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    top: '0',
    left: '0',
    justifyContent: 'center',
    alignItems: 'center',
  } as React.CSSProperties;

  return (
    <VStack spacing="1.5em" sx={asOverlay ? overlaySpinnerStyle : style}>
      <Center position="relative">
        <Spinner thickness="0.25em" speed="0.69s" w="80px" h="80px" /> <br />
      </Center>
      <Center position="relative">
        <Text sx={textStyle}>{text}</Text>
      </Center>
    </VStack>
  );
};

export default Loading;
