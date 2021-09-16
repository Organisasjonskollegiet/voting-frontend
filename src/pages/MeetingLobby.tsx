import React, { useCallback, useEffect, useState } from 'react';
import { Center, Box, Heading, Text, VStack, Divider, HStack } from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router';
import {
  // useVotationOpenedForMeetingSubscription,
  useVotationsByMeetingIdQuery,
  VotationStatus,
  useGetRoleQuery,
  Role,
  Votation,
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
  const { data: votationData, loading: votationLoading, error: votationError } = useVotationsByMeetingIdQuery({
    variables: {
      meetingId,
    },
    pollInterval: 1000,
  });
  const { data: roleResult, error: roleError } = useGetRoleQuery({ variables: { meetingId } });
  const [role, setRole] = useState<Role>();
  const [votations, setVotations] = useState<Votation[]>([]);
  const [openVotation, setOpenVotation] = useState<string | null>(null);
  // const { data: votationOpened } = useVotationOpenedForMeetingSubscription({
  //   variables: {
  //     meetingId,
  //   },
  // });

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

  useEffect(() => {
    if (votationData?.meetingById?.votations && votationData.meetingById.votations.length > 0) {
      const newVotations = votationData?.meetingById?.votations;
      const openVotations = newVotations.filter(
        (votation) => votation?.status === VotationStatus.Open || votation?.status === VotationStatus.CheckingResult
      );
      if (openVotations.length > 0 && openVotations[0]?.id) {
        if (
          role !== undefined &&
          (role !== Role.Admin ||
            (openVotation && openVotation !== openVotations[0].id) ||
            lastLocation?.pathname !== `/meeting/${meetingId}/votation/${openVotations[0].id}`)
        ) {
          navigateToOpenVotation(openVotations[0].id);
        } else {
          setOpenVotation(openVotations[0].id);
        }
      }
      const sortedVotations = newVotations.slice().sort((a, b) => (a?.index ?? 0) - (b?.index ?? 0)) as Votation[];
      setVotations(sortedVotations);
    }
  }, [votationData, history, meetingId, votations.length, role, navigateToOpenVotation, openVotation]);

  const backToMyMeetings = () => {
    history.push('/');
  };

  const styles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as React.CSSProperties;

  if (votationLoading) {
    return <Loading asOverlay={false} text={'Henter møte'} />;
  }

  if (!votationData?.meetingById || votationError || roleError) {
    return (
      <Center mt="10vh">
        <Text>Det skjedde noe galt under innlastingen</Text>
      </Center>
    );
  }

  return (
    <>
      <Box bg={offwhite} w="100vw" color="gray.500" style={styles}>
        {role === Role.Admin && <LobbyNavigation openVotation={openVotation} meetingId={meetingId} location="lobby" />}
        <VStack w="90vw" maxWidth="800px" alignItems="left" spacing="3em" mt="10vh">
          <VStack alignItems="left">
            <Heading sx={h1Style} as="h1">
              {votationData?.meetingById.title}
            </Heading>
            <VStack align="start">
              <Text mb="1.125em">Når en avstemning åpner, vil du bli tatt direkte til den.</Text>
              <VotationList
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
                <ParticipantModal meetingId={meetingId} ownerEmail={votationData.meetingById.owner?.email} />
              )}
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </>
  );
};

export default MeetingLobby;
