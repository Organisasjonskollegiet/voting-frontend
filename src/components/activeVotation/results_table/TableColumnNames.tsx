import { Box, HStack } from '@chakra-ui/react';
import React from 'react';

interface TableColumnNamesProps {
  columnNames: string[];
}

const TableColumnNames: React.FC<TableColumnNamesProps> = ({ columnNames }) => {
  return (
    <HStack width={'100%'}>
      {columnNames.map((name) => (
        <Box id={name} fontWeight="bold" width={`${(1 / columnNames.length) * 100}%`}>
          {name}
        </Box>
      ))}
    </HStack>
  );
};

export default TableColumnNames;
