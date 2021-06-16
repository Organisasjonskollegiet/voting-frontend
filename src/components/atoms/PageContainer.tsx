import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/layout';
import { offwhite } from '../particles/theme';

interface PageContainerProps {
  children: ReactNode;
  color?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, color }) => {
    return (
      <Box w="100vw" h="100vh" backgroundcolor={color || offwhite}>
        {children}
      </Box>
    );
};

export default PageContainer;