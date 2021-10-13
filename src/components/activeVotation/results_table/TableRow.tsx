import { Box, HStack } from '@chakra-ui/react';
import React from 'react';

interface TableRowProps {
  elements: string[];
  style?: React.CSSProperties;
  id: string;
}

const TableRow: React.FC<TableRowProps> = ({ elements, style, id }) => {
  return (
    <HStack id={id} w="100%" style={style} alignItems="start">
      {elements.map((e: string) => (
        <Box id={id + e} w={`${(1 / elements.length) * 100}%`} key={e}>
          {e}
        </Box>
      ))}
    </HStack>
  );
};

export default TableRow;
