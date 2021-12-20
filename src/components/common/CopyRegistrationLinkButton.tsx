import { CopyIcon } from '@chakra-ui/icons';
import { Button, Tooltip, useToast, Text } from '@chakra-ui/react';
import React from 'react';

export const getRegistrationLink = (meetingId: string) => {
  return `${process.env.REACT_APP_REDIRECT_URI}/meeting/${meetingId}/register`;
};

const CopyRegistrationLinkButton: React.FC<{ meetingId: string }> = ({ meetingId }) => {
  const toast = useToast();
  const copyString = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: 'Linken ble kopiert.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <Tooltip label={getRegistrationLink(meetingId)}>
      <Button
        variant="standard"
        w="fit-content"
        rightIcon={<CopyIcon />}
        onClick={() => copyString(getRegistrationLink(meetingId))}
      >
        <Text>Kopier registreringslink</Text>
      </Button>
    </Tooltip>
  );
};

export default CopyRegistrationLinkButton;
