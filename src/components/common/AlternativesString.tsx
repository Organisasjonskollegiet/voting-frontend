import React from 'react';
import { HStack, Text } from '@chakra-ui/react';

interface AlternativesStringProps {
  alternatives: string[];
  fontSize?: string;
  color?: string;
  fontWeight?: string;
}

const AlternativesString: React.FC<AlternativesStringProps> = ({ alternatives, fontSize, color, fontWeight }) => {
  switch (alternatives.length) {
    case 0:
      return <></>;
    case 1:
      return (
        <Text fontSize={fontSize} color={color} fontWeight={fontWeight ?? 'bold'}>
          {alternatives[0]}
        </Text>
      );
    default:
      return (
        <HStack color={color ?? 'inherit'} fontWeight={fontWeight ?? 'bold'} fontSize={fontSize ?? 'inherit'}>
          <Text color="inherit">{alternatives.slice(0, -1).reduce((a, b) => a + ', ' + b)}</Text>
          <Text color="inherit">{'og'}</Text>
          <Text color="inherit">{alternatives[alternatives.length - 1]}</Text>
        </HStack>
      );
  }
};

export default AlternativesString;
