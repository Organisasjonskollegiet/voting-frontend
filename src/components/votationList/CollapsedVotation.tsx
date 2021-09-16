import { DragHandleIcon } from '@chakra-ui/icons';
import { HStack, Text } from '@chakra-ui/react';
import React from 'react';
import CustomTag from '../common/CustomTag';
import { collapsedStyle, highlightedStyle } from '../styles/formStyles';

interface CollapsedVotationProps {
  isAdmin: boolean;
  votationTitle: string;
  index: number;
  isActive: boolean;
}

const CollapsedVotation: React.FC<CollapsedVotationProps> = ({ isAdmin, votationTitle, index, isActive }) => {
  return (
    <HStack w="90vw" maxWidth="800px" justify="space-between" marginBottom="16px" sx={collapsedStyle}>
      <HStack spacing="8">
        <Text sx={highlightedStyle}>{`${index + 1}`}</Text>
        <Text>{votationTitle}</Text>
      </HStack>
      <CustomTag bgColor="green" text="Aktiv" />
    </HStack>
  );
};

export default CollapsedVotation;
