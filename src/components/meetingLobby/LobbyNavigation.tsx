import React, { useContext, useEffect, useState } from 'react';
import { Box, FormControl, FormLabel, HStack, Switch } from '@chakra-ui/react';
import useScreenWidth from '../../hooks/ScreenWidth';
import { MeetingContext, MeetingLocation } from '../../pages/MeetingLobby';
import WrapStack from '../common/WrapStack';
import LobbyNavigationButton from './LobbyNavigationButton';

interface LobbyNavigationProps {
  openVotation?: string | null;
  location: MeetingLocation;
  setLocation: (location: MeetingLocation) => void;
  togglePresentationMode: () => void;
}

const LobbyNavigation: React.FC<LobbyNavigationProps> = ({
  openVotation,
  location,
  setLocation,
  togglePresentationMode,
}) => {
  const screenWidth = useScreenWidth();
  const { allowSelfRegistration } = useContext(MeetingContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const newIsMobile = screenWidth < breakpoint;
    if (newIsMobile === isMobile) return;
    setIsMobile(newIsMobile);
  }, [screenWidth, isMobile]);

  const breakpoint = 550;
  return (
    <WrapStack
      breakpoint={breakpoint}
      bg="white"
      zIndex="2"
      boxShadow={'0px 8px 10px rgba(0, 0, 0, 0.03)'}
      borderTop="1px solid rgba(0, 0, 0, 0.1)"
      w="100%"
      paddingTop={isMobile ? '0.5rem' : 0}
      paddingX={isMobile ? '0.5rem' : '2rem'}
      justifyContent="space-between"
      spacing={isMobile ? '0.5rem' : '2em'}
    >
      <FormControl flex="1" display="flex" width="fit-content">
        <FormLabel ml="0.5em" fontSize="12px" mb="0" fontWeight="bold">
          Presentasjonsmodus
        </FormLabel>
        <Switch onChange={togglePresentationMode} aria-label="Presentasjonsmodus" defaultChecked={false} />
      </FormControl>
      <HStack justifyContent="center" flex="1">
        <LobbyNavigationButton
          selected={location === MeetingLocation.SELFREGISTRATION}
          isDisabled={!allowSelfRegistration}
          text="Selvregistrering"
          onClick={() => {
            setLocation(MeetingLocation.SELFREGISTRATION);
          }}
        />
        <LobbyNavigationButton
          selected={location === MeetingLocation.LOBBY}
          text="Voteringsliste"
          onClick={() => {
            setLocation(MeetingLocation.LOBBY);
          }}
        />
        <LobbyNavigationButton
          selected={location === MeetingLocation.ACTIVEVOTATION}
          isDisabled={!openVotation && location !== MeetingLocation.ACTIVEVOTATION}
          text="Aktiv votering"
          onClick={() => {
            setLocation(MeetingLocation.ACTIVEVOTATION);
          }}
        />
      </HStack>
      {!isMobile && <Box flex="1" />}
    </WrapStack>
  );
};

export default LobbyNavigation;
