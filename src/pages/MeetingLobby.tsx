import React, { useEffect, useState } from 'react';
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
  // const { data: votationOpened } = useVotationOpenedForMeetingSubscription({
  //   variables: {
  //     meetingId,
  //   },
  // });

  const history = useHistory();

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

  useEffect(() => {
    if (votationData?.meetingById?.votations && votationData.meetingById.votations.length > 0) {
      const newVotations = votationData?.meetingById?.votations;
      const openVotations = newVotations.filter(
        (votation) => votation?.status === VotationStatus.Open || votation?.status === VotationStatus.CheckingResult
      );
      if (openVotations.length > 0 && openVotations[0]?.id) {
        history.push(`/meeting/${meetingId}/votation/${openVotations[0].id}`);
      } else if (newVotations.length > 0 && newVotations.length > votations.length) {
        const sortedVotations = newVotations.slice().sort((a, b) => (a?.index ?? 0) - (b?.index ?? 0)) as Votation[];
        setVotations(sortedVotations);
      }
    }
  }, [votationData, history, meetingId, votations.length]);

  const backToVotationList = () => {
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
      <Box bg={offwhite} w="100vw" p="10vh 0" color="gray.500" style={styles}>
        <VStack w="90vw" maxWidth="800px" alignItems="left" spacing="3em">
          <VStack alignItems="left">
            <Heading sx={h1Style} as="h1">
              {votationData?.meetingById.title}
            </Heading>
            <VStack align="start">
              <Text mb="1.125em">Når en avstemning åpner, vil du bli tatt direkte til den.</Text>
              <VotationList role={role} isMeetingLobby={true} votationsMayExist={true} meetingId={meetingId} />
            </VStack>
          </VStack>
          <VStack alignItems="left" spacing="1em">
            <Divider />
            <HStack justifyContent="space-between">
              <ReturnToPreviousButton onClick={backToVotationList} text="Tiltake til møteoversikt" />
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
