import React from 'react';
import { HStack, Text } from '@chakra-ui/react';

interface AlternativesStringProps {
  alternatives: string[];
  fontSize?: string;
  color?: string;
}

const AlternativesString: React.FC<AlternativesStringProps> = ({ alternatives, fontSize, color }) => {
  switch (alternatives.length) {
    case 0:
      return <></>;
    case 1:
      return (
        <Text fontSize={fontSize} color={color} fontWeight="bold">
          {alternatives[0]}
        </Text>
      );
    default:
      return (
        <HStack color={color ?? 'inherit'} fontSize={fontSize ?? 'inherit'}>
          <Text color="inherit" fontWeight="bold">
            {alternatives.slice(0, -1).reduce((a, b) => a + ', ' + b)}
          </Text>
          <Text fontWeight="bold" color="inherit">
            {'og'}
          </Text>
          <Text color="inherit" fontWeight="bold">
            {alternatives[alternatives.length - 1]}
          </Text>
        </HStack>
      );
  }
};

export default AlternativesString;
