import React, { useEffect, useState } from 'react';
import { Center, Box, Heading, Text, VStack, HStack, Button, useToast } from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router';
import {
  // useVotationOpenedForMeetingSubscription,
  useVotationsByMeetingIdQuery,
  VotationStatus,
  useGetRoleQuery,
  Role,
  Votation,
  useUpdateVotationStatusMutation,
} from '../../__generated__/graphql-types';
import Loading from '../atoms/Loading';
import { darkblue } from '../particles/theme';
import { useAuth0 } from '@auth0/auth0-react';

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
  const [updateVotationStatus, updateVotationStatusResult] = useUpdateVotationStatusMutation();
  const [role, setRole] = useState<Role>();
  const [votations, setVotations] = useState<Votation[]>([]);
  // const { data: votationOpened } = useVotationOpenedForMeetingSubscription({
  //   variables: {
  //     meetingId,
  //   },
  // });

  const history = useHistory();
  const toast = useToast();

  useEffect(() => {
    const toastId = 'votationOpened';
    if (updateVotationStatusResult.data?.updateVotationStatus && !toast.isActive(toastId)) {
      toast({
        id: 'votationOpened',
        title: 'Voteringen ble åpnet.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [updateVotationStatusResult.data?.updateVotationStatus, toast]);

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

  // useEffect(() => {
  //   if (votationOpened?.votationOpenedForMeeting) {
  //     history.push(`/meeting/${meetingId}/votation/${votationOpened.votationOpenedForMeeting}`);
  //   }
  // }, [votationOpened, history, meetingId]);

  const styles = {
    height: window.innerHeight,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as React.CSSProperties;

  const votationStyles = {
    backgroundColor: 'white',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    borderRadius: '4px',
    padding: '1em 2em',
    marginBottom: '1em',
  } as React.CSSProperties;

  if (votationError || roleError) {
    <>
      <Box h="57px" w="100vw" bgColor={darkblue}></Box>
      <Center mt="10vh">
        <Text>Det skjedde noe galt under innlastingen</Text>
      </Center>
    </>;
  }

  if (!votationData?.meetingById || votationLoading) {
    return <Loading asOverlay={false} text={'Henter møte'} />;
  }

  return (
    <>
      <Box bg="#F9F9F9" w="100vw" pt="10vh" style={styles}>
        <Heading mb="10" as="h3">{`Velkommen til ${votationData?.meetingById.title}`}</Heading>{' '}
        <VStack width="90vw" maxWidth="700px" align="start">
          <Center width="100%">
            <Text mb="1.125em">Når en avstemning åpner, vil du bli tatt direkte til den.</Text>
          </Center>
          {votations.filter((votation) => votation.status === VotationStatus.Upcoming).length > 0 && (
            <Heading as="h1" fontSize="1em" mb="1.125em">
              Kommende avstemninger
            </Heading>
          )}
          {votations
            .filter((votation) => votation.status === VotationStatus.Upcoming)
            .map((votation) => (
              <HStack key={votation.id} style={votationStyles} width="100%" justifyContent="space-between">
                <VStack align="start">
                  <Heading as="h2" fontSize="1.125em">
                    {' '}
                    {votation.title}{' '}
                  </Heading>
                  <Text mb="1em" fontSize="0.75em">
                    {' '}
                    {votation.description}{' '}
                  </Text>
                </VStack>
                {role === Role.Admin && (
                  <Button
                    onClick={() =>
                      updateVotationStatus({ variables: { id: votation.id, status: VotationStatus.Open } })
                    }
                  >
                    Start
                  </Button>
                )}
              </HStack>
            ))}
        </VStack>
      </Box>
    </>
  );
};

export default MeetingLobby;
