import { FormLabel, HStack, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { inputStyle } from '../../styles/formStyles';
import UploadIcon from '../../../static/uploadIcon.svg';
import FileUploadInformationModal from './FileUploadInformationModal';

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
      <FileUploadInformationModal />
    </HStack>
  );
};

export default InviteParticipantByFileUpload;
