import React from 'react';
import { VStack, Center, Spinner, Text } from '@chakra-ui/react';

export interface LoadingProps {
  text: string;
}

const Loading: React.FC<LoadingProps> = ({ text }) => {
  const textStyle = {
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '150%',
    color: '#718096',
  };

  return (
    <VStack spacing="1.5em">
      <Center>
        <Spinner thickness="0.25em" speed="0.69s" size="xl" /> <br />
      </Center>
      <Center>
        <Text sx={textStyle}>{text}</Text>
      </Center>
    </VStack>
  );
};

export default Loading;
