import { Heading, HStack } from '@chakra-ui/react';
import React from 'react';

interface TableColumnNamesProps {
  columnNames: string[];
}

const TableColumnNames: React.FC<TableColumnNamesProps> = ({ columnNames }) => {
  return (
    <HStack width={'100%'}>
      {columnNames.map((name) => (
        <Heading id={name} size="sm" width={`${(1 / columnNames.length) * 100}%`} key={name}>
          {name}
        </Heading>
      ))}
    </HStack>
  );
};

export default TableColumnNames;
