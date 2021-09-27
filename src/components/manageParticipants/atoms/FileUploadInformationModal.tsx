import { Divider, Heading } from '@chakra-ui/layout';
import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/table';
import React from 'react';
import InformationModal from '../../common/InformationModal';

const FileUploadInformationModal: React.FC = () => {
  return (
    <InformationModal ariaLabel="CVS format" title="CVS Format" alignWithText={false}>
      <Divider mb="1.5rem" />
      <ul>
        <li>Alle epostene må befinne seg i første kolonne på hver sin rad.</li>
        <li>I den andre kolonnen skriver dere inn hvilken rolle personen knyttet til eposten innehar.</li>
        <li>
          Rollene kan være 'administrator', 'teller' eller 'deltager', hvis ingen rolle er spesifisert blir deltager
          valgt automatisk.
        </li>
      </ul>

      <Divider my="1.5rem" />

      <Heading as="h2" fontSize="1.1rem" mb="1rem">
        Exempel på CSV Fil
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
