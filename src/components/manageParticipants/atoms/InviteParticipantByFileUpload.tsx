import { FormLabel, HStack, Input, Text, Image } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { inputStyle } from '../../styles/formStyles';
import UploadIcon from '../../../static/uploadIcon.svg';
import FileUploadInformationModal from './FileUploadInformationModal';

interface InviteParticipantByFileUploadProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>, ref: React.RefObject<HTMLInputElement>) => void;
}

const InviteParticipantByFileUpload: React.FC<InviteParticipantByFileUploadProps> = ({ handleFileUpload }) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <HStack mb="0.5rem" spacing="0">
      <FormLabel maxWidth="320px" m="0" _hover={{ boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}>
        <Input ref={ref} display="none" type="file" accept="text/csv" onChange={(e) => handleFileUpload(e, ref)} />
        <HStack sx={inputStyle} _hover={{ cursor: 'pointer' }} padding="8px 16px" justify="left" borderRadius="4px">
          <Image alt="upload" h="1rem" src={UploadIcon} />
          <Text>Last opp deltagerliste fra CSV-fil</Text>
        </HStack>
      </FormLabel>
      <FileUploadInformationModal />
    </HStack>
  );
};

export default InviteParticipantByFileUpload;
