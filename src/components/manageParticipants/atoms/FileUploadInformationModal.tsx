import { Divider, Heading, UnorderedList, ListItem } from '@chakra-ui/layout';
import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/table';
import React from 'react';
import InformationModal from '../../common/InformationModal';

const FileUploadInformationModal: React.FC = () => {
  return (
    <InformationModal ariaLabel="CVS format" title="CVS Format" alignWithText={false}>
      <Divider mb="1.5rem" />
      <UnorderedList>
        <ListItem>Alle epostene må befinne seg i første kolonne på hver sin rad.</ListItem>
        <ListItem>I den andre kolonnen skriver dere inn hvilken rolle personen knyttet til eposten innehar.</ListItem>
        <ListItem>Rollene kan være 'administrator', 'teller' eller 'deltager'.</ListItem>
        <ListItem>Hvis ingen rolle er spesifisert blir 'deltager' valgt automatisk.</ListItem>
      </UnorderedList>

      <Divider my="1.5rem" />

      <Heading size="md" mb="1rem">
        Eksempel på CSV Fil
      </Heading>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Epost</Th>
            <Th>Rolle</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>test1@test.no</Td>
            <Td>deltager</Td>
          </Tr>
          <Tr>
            <Td>test2@test.no</Td>
            <Td>administrator</Td>
          </Tr>
          <Tr>
            <Td>test3@test.no</Td>
            <Td>teller</Td>
          </Tr>
        </Tbody>
      </Table>
    </InformationModal>
  );
};

export default FileUploadInformationModal;
