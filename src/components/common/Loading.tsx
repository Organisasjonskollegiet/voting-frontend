import React from 'react';
import { VStack, Center, Spinner, Text } from '@chakra-ui/react';
import { darkblue } from '../styles/colors';

const textStyle = {
  fontStyle: 'normal',
  fontWeight: 'bold',
  lineHeight: '150%',
  color: darkblue,
};

const loadingStyle = {
  justifyContent: 'center',
  left: '0',
  top: '0',
  zIndex: 10,
  alignItems: 'center',
} as React.CSSProperties;

const overlaySpinnerStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.4);',
  position: 'absolute',
  width: '100%',
  height: '100%',
  boxShadow: '2px 2px rgba(60,60,60,0.6)',
} as React.CSSProperties;

const fixedStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
} as React.CSSProperties;
export interface LoadingProps {
  text: string;
  asOverlay?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ text, asOverlay }) => {
  return (
    <VStack spacing="1.5em" sx={{ ...loadingStyle, ...(asOverlay ? overlaySpinnerStyle : fixedStyle) }}>
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
