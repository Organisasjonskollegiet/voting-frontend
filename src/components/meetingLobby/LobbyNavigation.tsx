import { Box, FormControl, FormLabel, HStack, Switch } from '@chakra-ui/react';
import React from 'react';
import LobbyNavigationButton from './LobbyNavigationButton';

interface LobbyNavigationProps {
  openVotation?: string | null;
  location: 'lobby' | 'activeVotation';
  setLocation: (location: 'lobby' | 'activeVotation') => void;
  togglePresentationMode: () => void;
}

const LobbyNavigation: React.FC<LobbyNavigationProps> = ({
  openVotation,
  location,
  setLocation,
  togglePresentationMode,
}) => {
  return (
    <HStack
      bg="white"
      zIndex="100"
      boxShadow={'0px 8px 10px rgba(0, 0, 0, 0.03)'}
      borderTop="1px solid rgba(0, 0, 0, 0.1)"
      w="100%"
      paddingX="2rem"
      justifyContent="space-between"
      spacing="2em"
    >
      <FormControl flex="1" display="flex" width="fit-content">
        <FormLabel ml="0.5em" fontSize="12px" mb="0" fontWeight="bold">
          Presentasjonsmodus
        </FormLabel>
        <Switch onChange={togglePresentationMode} aria-label="Presentasjonsmodus" defaultChecked={false} />
      </FormControl>
      <HStack justifyContent="center" flex="1">
        <LobbyNavigationButton
          selected={location === 'lobby'}
          text="Voteringsliste"
          onClick={() => {
            setLocation('lobby');
          }}
        />
        <LobbyNavigationButton
          selected={location === 'activeVotation'}
          isDisabled={!openVotation && location !== 'activeVotation'}
          text="Aktiv votering"
          onClick={() => {
            setLocation('activeVotation');
          }}
        />
      </HStack>
      <Box flex="1" />
    </HStack>
  );
};

export default LobbyNavigation;
