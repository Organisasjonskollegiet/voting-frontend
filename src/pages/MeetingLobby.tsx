import React, { useCallback, useEffect, useState } from 'react';
import { Center, Box, Heading, Text, VStack, Divider, HStack } from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router';
import {
  useVotationOpenedForMeetingSubscription,
  useGetMeetingForLobbyQuery,
  useGetRoleQuery,
  Role,
} from '../__generated__/graphql-types';
import Loading from '../components/common/Loading';
import { offwhite } from '../components/styles/theme';
import { useAuth0 } from '@auth0/auth0-react';
import { h1Style } from '../components/styles/formStyles';
import VotationList from '../components/votationList/VotationList';
import ParticipantModal from '../components/manageParticipants/organisms/ParticipantModal';
import ReturnToPreviousButton from '../components/common/ReturnToPreviousButton';
import LobbyNavigation from '../components/meetingLobby/LobbyNavigation';
import { useLastLocation } from 'react-router-last-location';

const MeetingLobby: React.FC = () => {
  const { user } = useAuth0();
  const { meetingId } = useParams<{ meetingId: string }>();
  const { data, loading, error } = useGetMeetingForLobbyQuery({
    variables: {
      meetingId,
    },
  });

  const { data: roleResult, error: roleError } = useGetRoleQuery({ variables: { meetingId } });
  const [role, setRole] = useState<Role>();
  const [openVotation, setOpenVotation] = useState<string | null>(null);
  const { data: votationOpened } = useVotationOpenedForMeetingSubscription({
    variables: {
      meetingId,
    },
  });

  const history = useHistory();
  const lastLocation = useLastLocation();

  useEffect(() => {
    if (roleResult && roleResult.meetingById?.participants) {
      const myRole = roleResult.meetingById.participants.filter(
        (participant) => `auth0|${participant?.user?.id ?? ''}` === user?.sub
      )[0]?.role;
      if (myRole && myRole !== role) {
        setRole(myRole);
      }
    }
  }, [roleResult, role, user?.sub]);

  const navigateToOpenVotation = useCallback(
    (openVotation: string | null) => {
      if (openVotation) history.push(`/meeting/${meetingId}/votation/${openVotation}`);
    },
    [meetingId, history]
  );

  const handleOpenVotation = useCallback(
    (openVotation: string) => {
      if (role === Role.Admin && lastLocation?.pathname === `/meeting/${meetingId}/votation/${openVotation}`) {
        setOpenVotation(openVotation);
      } else if (role) {
        navigateToOpenVotation(openVotation);
      }
    },
    [role, lastLocation?.pathname, meetingId, navigateToOpenVotation]
  );

  // handle votation being open initially
  useEffect(() => {
    if (!data?.getOpenVotation) return;
    handleOpenVotation(data.getOpenVotation);
  }, [data?.getOpenVotation, role, handleOpenVotation]);

  // handle votation opening
  useEffect(() => {
    if (!votationOpened?.votationOpenedForMeeting) return;
    handleOpenVotation(votationOpened.votationOpenedForMeeting);
  }, [votationOpened, handleOpenVotation]);

  const backToMyMeetings = () => {
    history.push('/');
  };

  if (loading) {
    return <Loading asOverlay={false} text={'Henter møte'} />;
  }

  if (error || roleError) {
    return (
      <Center mt="10vh">
        <Text>Det skjedde noe galt under innlastingen</Text>
      </Center>
    );
  }

  return (
    <>
      <Box
        bg={offwhite}
        w="100%"
        minHeight="100vh"
        color="gray.500"
        pb="2em"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {role === Role.Admin && <LobbyNavigation openVotation={openVotation} meetingId={meetingId} location="lobby" />}
        <VStack w="90vw" maxWidth="800px" alignItems="left" spacing="3em" mt="10vh">
          <VStack alignItems="left">
            <Heading sx={h1Style} as="h1">
              {data?.meetingById?.title}
            </Heading>
            <VStack align="start">
              <Text mb="1.125em">Når en avstemning åpner, vil du bli tatt direkte til den.</Text>
              <VotationList
                navigateToOpenVotation={navigateToOpenVotation}
                hideOpenVotationButton={!!openVotation}
                role={role}
                isMeetingLobby={true}
                votationsMayExist={true}
                meetingId={meetingId}
              />
            </VStack>
          </VStack>
          <VStack alignItems="left" spacing="1em">
            <Divider />
            <HStack justifyContent="space-between">
              <ReturnToPreviousButton onClick={backToMyMeetings} text="Tiltake til møteoversikt" />
              {role === Role.Admin && (
                <ParticipantModal meetingId={meetingId} ownerEmail={data?.meetingById?.owner?.email} />
              )}
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </>
  );
};

export default MeetingLobby;
