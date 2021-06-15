import React from 'react';
import { VStack, Center, Spinner, Text } from '@chakra-ui/react';
import { darkblue } from '../particles/theme';

export interface LoadingProps {
  text: string;
}

const Loading: React.FC<LoadingProps> = ({ text }) => {
  const textStyle = {
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '150%',
    color: darkblue,
  };

  return (
    <VStack spacing="1.5em">
      <Center>
        <Spinner thickness="0.25em" speed="0.69s" w="80px" h="80px" /> <br />
      </Center>
      <Center>
        <Text sx={textStyle}>{text}</Text>
      </Center>
    </VStack>
  );
};

export default Loading;
