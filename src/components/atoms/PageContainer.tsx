import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/layout';
import { offwhite } from '../particles/theme';

interface PageContainerProps {
  children: ReactNode;
  color?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, color }) => {
    return (
      <Box w="100vw" minH="100vh" background={color || offwhite} pb="5em">
        {children}
      </Box>
    );
};

export default PageContainer;