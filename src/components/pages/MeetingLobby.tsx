import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router';
import {
  useVotationOpenedForMeetingSubscription,
  useVotationsByMeetingIdQuery,
  VotationStatus,
} from '../../__generated__/graphql-types';

const MeetingLobby = () => {
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
  }, [votationData]);

  useEffect(() => {
    if (votationOpened?.votationOpenedForMeeting) {
      history.push(`/meeting/${meetingId}/votation/${votationOpened.votationOpenedForMeeting}`);
    }
  }, [votationOpened]);

  return (
    <Box bg="#F9F9F9" w="65vw" m="auto" pt="10vh">
      text
    </Box>
  );
};

export default MeetingLobby;
