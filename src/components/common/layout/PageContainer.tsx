import React from 'react';
import { Box } from '@chakra-ui/layout';
import { pageBackground } from '../../styles/colors';

interface PageContainerProps {
  color?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, color }) => {
  return (
    <Box w="100%" minH="calc(100vh - 5.5rem)" background={color || pageBackground}>
      {children}
    </Box>
  );
};

export default PageContainer;
