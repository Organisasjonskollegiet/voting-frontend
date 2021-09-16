import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router';

interface LobbyNavigationProps {
  openVotation?: string | null;
  meetingId: string;
}

const LobbyNavigation: React.FC<LobbyNavigationProps> = ({ openVotation, meetingId }) => {
  const history = useHistory();

  return (
    <HStack
      bg="white"
      zIndex="100"
      boxShadow={'0px 8px 10px rgba(0, 0, 0, 0.03)'}
      borderTop="1px solid rgba(0, 0, 0, 0.1)"
      w="100%"
      justifyContent="center"
      spacing="2em"
    >
      <VStack spacing="0">
        <Button
          _hover={{ bg: 'transparent' }}
          bg="transparent"
          onClick={() => {
            history.push(`/meeting/${meetingId}`);
          }}
        >
          Voteringsliste
        </Button>
        <Box h="4px" w="100%" borderBottom="4px solid #43679C" borderRadius="10px" />
      </VStack>
      <VStack spacing="0">
        <Button
          _hover={{ bg: 'transparent' }}
          bg="transparent"
          disabled={!openVotation}
          onClick={() => {
            if (openVotation) history.push(`/meeting/${meetingId}/votation/${openVotation}`);
          }}
        >
          Aktiv votering
        </Button>
        {false && <Box h="4px" w="100%" borderBottom="4px solid #43679C" borderRadius="10px" />}
      </VStack>
    </HStack>
  );
};

export default LobbyNavigation;
