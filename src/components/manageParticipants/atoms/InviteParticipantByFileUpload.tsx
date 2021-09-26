import { FormLabel, HStack, Input, Text } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { inputStyle } from '../../styles/formStyles';
import UploadIcon from '../../../static/uploadIcon.svg';

interface InviteParticipantByFileUploadProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>, ref: React.RefObject<HTMLInputElement>) => void;
}

const InviteParticipantByFileUpload: React.FC<InviteParticipantByFileUploadProps> = ({ handleFileUpload }) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <FormLabel maxWidth="320px" w="30vw">
      <Input ref={ref} display="none" type="file" accept="text/csv" onChange={(e) => handleFileUpload(e, ref)} />
      <HStack sx={inputStyle} _hover={{ cursor: 'pointer' }} padding="8px" justify="center" borderRadius="4px">
        <img alt="upload" src={UploadIcon} />
        <Text>Last opp deltagerliste fra CSV-fil</Text>
      </HStack>
    </FormLabel>
  );
};

export default InviteParticipantByFileUpload;
