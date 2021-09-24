import { Box, HStack } from '@chakra-ui/react';
import React from 'react';

interface TableRowProps {
  elements: string[];
  style?: React.CSSProperties;
}

const TableRow: React.FC<TableRowProps> = ({ elements, style }) => {
  return (
    <HStack w="100%" style={style}>
      {elements.map((e: string) => (
        <Box w={`${(1 / elements.length) * 100}%`}>{e}</Box>
      ))}
    </HStack>
  );
};

export default TableRow;
