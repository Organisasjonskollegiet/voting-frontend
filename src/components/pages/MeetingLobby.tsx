import React, { useEffect } from 'react';
import { Center, Box, Heading, Text } from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router';
import {
  useVotationOpenedForMeetingSubscription,
  useVotationsByMeetingIdQuery,
  VotationStatus,
} from '../../__generated__/graphql-types';
import Loading from '../atoms/Loading';
import { darkblue } from '../particles/theme';

const MeetingLobby: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { data: votationData, loading: votationLoading, error: votationError } = useVotationsByMeetingIdQuery({
    variables: {
      meetingId,
    },
  });
  const { data: votationOpened } = useVotationOpenedForMeetingSubscription({
    variables: {
      meetingId,
    },
  });
  const history = useHistory();

  useEffect(() => {
    if (votationData?.meetingsById?.votations && votationData.meetingsById.votations.length > 0) {
      const openVotations = votationData?.meetingsById?.votations.filter(
        (votation) => votation?.status === VotationStatus.Open
      );
      if (openVotations.length > 0 && openVotations[0]?.id) {
        history.push(`/meeting/${meetingId}/votation/${openVotations[0].id}`);
      }
    }
  }, [votationData, history, meetingId]);

  useEffect(() => {
    if (votationOpened?.votationOpenedForMeeting) {
      history.push(`/meeting/${meetingId}/votation/${votationOpened.votationOpenedForMeeting}`);
    }
  }, [votationOpened, history, meetingId]);

  const styles = {
    height: window.innerHeight,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as React.CSSProperties;

  if (votationError) {
    <>
      <Box h="57px" w="100vw" bgColor={darkblue}></Box>
      <Center mt="10vh">
        <Text>Det skjedde noe galt under innlastingen</Text>
      </Center>
    </>;
  }

  if (!votationData?.meetingsById || votationLoading) {
    return <Loading asOverlay={false} text={'Henter møte'} />;
  }

  return (
    <>
      <Box h="57px" w="100vw" bgColor={darkblue}></Box>
      <Box bg="#F9F9F9" w="100vw" pt="10vh" style={styles}>
        <Heading mb="5" as="h3">{`Velkommen til ${votationData?.meetingsById.title}`}</Heading>
        <Text fontSize={24}>Når en avstemning åpner, vil du bli tatt direkte til den.</Text>
      </Box>
    </>
  );
};

export default MeetingLobby;
