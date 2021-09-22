import { Box } from '@chakra-ui/react';
import React from 'react';
import CollapsedVotation, { CollapsedVotationProps } from './CollapsedVotation';

interface ActiveVotationProps extends CollapsedVotationProps {
  onClick: () => void;
}

const ActiveVotation: React.FC<ActiveVotationProps> = ({ isAdmin, votationTitle, index, onClick }) => {
  return (
    <Box onClick={onClick} _hover={{ cursor: 'pointer' }}>
      <CollapsedVotation isAdmin={isAdmin} votationTitle={votationTitle} index={index} isActive={true} />
    </Box>
  );
};

export default ActiveVotation;
