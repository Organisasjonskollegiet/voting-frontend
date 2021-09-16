import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router';

interface LobbyNavigationProps {
  openVotation?: string | null;
  meetingId: string;
  location: 'lobby' | 'activeVotation';
}

const LobbyNavigation: React.FC<LobbyNavigationProps> = ({ openVotation, meetingId, location }) => {
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
            if (location !== 'lobby') history.push(`/meeting/${meetingId}`);
          }}
        >
          Voteringsliste
        </Button>
        {location === 'lobby' && <Box h="4px" w="100%" borderBottom="4px solid #43679C" borderRadius="10px" />}
      </VStack>
      <VStack spacing="0">
        <Button
          _hover={{ bg: 'transparent' }}
          bg="transparent"
          disabled={location !== 'activeVotation' && !openVotation}
          onClick={() => {
            if (openVotation && location !== 'activeVotation')
              history.push(`/meeting/${meetingId}/votation/${openVotation}`);
          }}
        >
          Aktiv votering
        </Button>
        {location === 'activeVotation' && <Box h="4px" w="100%" borderBottom="4px solid #43679C" borderRadius="10px" />}
      </VStack>
    </HStack>
  );
};

export default LobbyNavigation;
