import { HStack, Text } from '@chakra-ui/react';
import React from 'react';

export interface CollapsedVotationRowProps {
  title: string;
  index: number;
}

const CollapsedVotationRow: React.FC<CollapsedVotationRowProps> = ({ title, index }) => {
  return (
    <HStack spacing="8">
      <Text fontSize="lg" fontWeight="bold">{`${index + 1}`}</Text>
      <Text>{title}</Text>
    </HStack>
  );
};

export default CollapsedVotationRow;
