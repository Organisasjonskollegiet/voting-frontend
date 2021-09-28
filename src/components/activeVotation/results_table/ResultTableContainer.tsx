import { Box, VStack } from '@chakra-ui/react';
import React from 'react';
import { boxShadow } from '../../styles/formStyles';

const ResultTableContainer: React.FC = ({ children }) => {
  return (
    <Box width={'100%'} style={{ borderRadius: '4px', padding: '30px', boxShadow }}>
      <VStack w="100%">{children}</VStack>
    </Box>
  );
};

export default ResultTableContainer;
