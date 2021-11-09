import React from 'react';
import { Text } from '@chakra-ui/react';

interface AlternativesStringProps {
  alternatives: string[];
  fontSize?: string;
  color?: string;
  fontWeight?: string;
}

const AlternativesString: React.FC<AlternativesStringProps> = ({ alternatives, fontSize, color, fontWeight }) => {
  const length = alternatives.length;
  return (
    <Text
      textAlign="center"
      color={color ?? 'inherit'}
      fontWeight={fontWeight ?? 'bold'}
      fontSize={fontSize ?? 'inherit'}
    >
      {length > 0
        ? alternatives.map((a, index) => `${a}${index < length - 2 ? ', ' : index === length - 2 ? ' og ' : ''}`)
        : 'Ingen vinner'}
    </Text>
  );
};

export default AlternativesString;
