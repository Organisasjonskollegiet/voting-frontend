import { HStack } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router';
import { setLastLocation } from 'react-router-last-location/dist/LastLocationProvider';
import LobbyNavigationButton from './LobbyNavigationButton';

interface LobbyNavigationProps {
  openVotation?: string | null;
  meetingId: string;
  location: 'lobby' | 'activeVotation';
  setLocation: (location: 'lobby' | 'activeVotation') => void;
}

const LobbyNavigation: React.FC<LobbyNavigationProps> = ({ openVotation, meetingId, location, setLocation }) => {
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
      <LobbyNavigationButton
        selected={location === 'lobby'}
        text="Voteringsliste"
        onClick={() => {
          setLocation('lobby');
        }}
      />
      <LobbyNavigationButton
        selected={location === 'activeVotation'}
        isDisabled={!openVotation && location != 'activeVotation'}
        text="Aktiv votering"
        onClick={() => {
          setLocation('activeVotation');
        }}
      />
    </HStack>
  );
};

export default LobbyNavigation;
