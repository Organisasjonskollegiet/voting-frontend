import { Box, HStack } from '@chakra-ui/react';
import React from 'react';

type TableCell = {
  id: string;
  content: string;
};

interface TableRowProps {
  elements: { id: string; content: string }[];
  style?: React.CSSProperties;
  id: string;
}

const TableRow: React.FC<TableRowProps> = ({ elements, style, id }) => {
  return (
    <HStack id={id} w="100%" style={style} alignItems="start">
      {elements.map((e: TableCell) => (
        <Box key={id + e.id} w={`${(1 / elements.length) * 100}%`}>
          {e.content}
        </Box>
      ))}
    </HStack>
  );
};

export default TableRow;
