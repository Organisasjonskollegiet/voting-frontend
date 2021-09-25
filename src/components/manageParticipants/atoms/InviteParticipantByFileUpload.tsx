import { FormLabel, HStack, Input, Table, Tbody, Text, Th, Thead, Tr, Td, Heading, Divider } from '@chakra-ui/react';
import React from 'react';
import { inputStyle } from '../../styles/formStyles';
import UploadIcon from '../../../static/uploadIcon.svg';
import InformationModal from '../../common/InformationModal';

interface InviteParticipantByFileUploadProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InviteParticipantByFileUpload: React.FC<InviteParticipantByFileUploadProps> = ({ handleFileUpload }) => {
  return (
    <HStack mb="0.5rem" spacing="2">
      <FormLabel maxWidth="320px" w="30vw" m="0" _hover={{ boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}>
        <Input display="none" type="file" accept="text/csv" onChange={handleFileUpload} />
        <HStack sx={inputStyle} _hover={{ cursor: 'pointer' }} padding="8px" justify="center" borderRadius="4px">
          <img alt="upload" src={UploadIcon} />
          <Text>Last opp deltagerliste fra CSV-fil</Text>
        </HStack>
      </FormLabel>
      <InformationModal ariaLabel="CVS format" title="CVS Format" alignWithText={false}>
        <Divider mb="1.5rem" />
        <ul>
          <li>Alle epostene må befinne seg i første kolonne på hver sin rad.</li>
          <li>I den andre kolonnen skriver dere inn hvilken rolle personen knyttet til eposten innehar</li>
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
    </HStack>
  );
};

export default InviteParticipantByFileUpload;
