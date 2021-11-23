import { Box, HStack } from '@chakra-ui/react';
import React from 'react';
import CustomTag from '../common/CustomTag';
import { green } from '../styles/colors';
import { collapsedStyle } from '../styles/formStyles';
import CollapsedVotationRow, { CollapsedVotationRowProps } from './CollapsedVotationRow';

interface OpenVotationProps extends CollapsedVotationRowProps {
  onClick: () => void;
}

const OpenVotation: React.FC<OpenVotationProps> = ({ title, index, onClick }) => {
  return (
    <Box onClick={onClick} _hover={{ cursor: 'pointer' }}>
      <HStack w="90vw" maxWidth="800px" justify="space-between" marginBottom="16px" sx={collapsedStyle}>
        <CollapsedVotationRow title={title} index={index} />
        <CustomTag bgColor={green} text="Aktiv" />
      </HStack>
    </Box>
  );
};

export default OpenVotation;
