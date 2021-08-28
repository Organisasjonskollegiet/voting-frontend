import { FormLabel, HStack, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { inputStyle } from '../../particles/formStyles';
import UploadIcon from '../../../static/uploadIcon.svg';

interface InviteParticipantByFileUploadProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InviteParticipantByFileUpload: React.FC<InviteParticipantByFileUploadProps> = ({ handleFileUpload }) => {
  return (
    <FormLabel maxWidth="320px" w="30vw">
      <Input display="none" type="file" accept="text/csv" onChange={handleFileUpload} />
      <HStack sx={inputStyle} _hover={{ cursor: 'pointer' }} padding="8px" justify="center" borderRadius="4px">
        <img alt="upload" src={UploadIcon} />
        <Text>Last opp deltagerliste fra CSV-fil</Text>
      </HStack>
    </FormLabel>
  );
};

export default InviteParticipantByFileUpload;
