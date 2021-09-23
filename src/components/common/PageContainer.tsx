import React from 'react';
import { Box } from '@chakra-ui/layout';
import { offwhite } from '../styles/theme';

interface PageContainerProps {
  color?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, color }) => {
  return (
    <Box w="100%" minH="100vh" background={color || offwhite}>
      {children}
    </Box>
  );
};

export default PageContainer;
