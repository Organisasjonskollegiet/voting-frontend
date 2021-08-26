import React, { useEffect, useState } from 'react';
import { Center, Box, Heading, Text, VStack, Divider, Button } from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router';
import {
  // useVotationOpenedForMeetingSubscription,
  useVotationsByMeetingIdQuery,
  VotationStatus,
  useGetRoleQuery,
  Role,
  Votation,
} from '../../__generated__/graphql-types';
import Loading from '../atoms/Loading';
import { darkblue } from '../particles/theme';
import { useAuth0 } from '@auth0/auth0-react';
import { h1Style } from '../particles/formStyles';
import VotationList from '../molecules/VotationList';
import { ArrowBackIcon } from '@chakra-ui/icons';

const MeetingLobby: React.FC = () => {
  const { user } = useAuth0();
  console.log(user);
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
      <>
        <Box h="57px" w="100vw" bgColor={darkblue}></Box>
        <Center mt="10vh">
          <Text>Det skjedde noe galt under innlastingen</Text>
        </Center>
      </>
    );
  }

  return (
    <>
      <Box bg="#F9F9F9" w="100vw" p="10vh 0" color="gray.500" style={styles}>
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
            <Button
              borderRadius={'16em'}
              bg="transparent"
              w="fit-content"
              onClick={backToVotationList}
              leftIcon={<ArrowBackIcon />}
            >
              <Text fontWeight="normal" fontSize="16px" decoration="underline">
                Tilbake til møteoversikt
              </Text>
            </Button>
          </VStack>
        </VStack>
      </Box>
    </>
  );
};

export default MeetingLobby;
