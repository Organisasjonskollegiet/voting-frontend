import React, { useContext, useMemo } from 'react';
import { Text } from '@chakra-ui/react';
import { Participant, Role, useGetParticipantsByMeetingIdQuery } from '../../../__generated__/graphql-types';
import { MeetingContext } from '../../../pages/MeetingLobby';

interface VotationReviewsProps {
  numberOfApproved: number;
  numberOfDisapproved: number;
}

const VotationReviews: React.FC<VotationReviewsProps> = ({ numberOfApproved, numberOfDisapproved }) => {
  const { meetingId } = useContext(MeetingContext);

  const { data, error } = useGetParticipantsByMeetingIdQuery({
    variables: { meetingId },
    fetchPolicy: 'no-cache',
  });

  const numberOfCounters = useMemo(() => {
    if (!data?.participants) return 0;
    return (data.participants as Participant[]).reduce(
      (sum, p) => (p.role === Role.Counter || p.role === Role.Admin ? sum + 1 : sum),
      0
    );
  }, [data?.participants]);

  if (error) {
    return <Text>Kunne ikke hente tilbakemeldinger på resultat.</Text>;
  }

  if (numberOfCounters === 0) {
    return <></>;
  }

  return (
    <Text>
      Av <b>{numberOfCounters}</b> tellere og administratorer har <b>{numberOfApproved}</b> markert resultatet som{' '}
      <i>gyldig</i>, mens <b>{numberOfDisapproved}</b> har market resultatet som <i>ugyldig</i>
    </Text>
  );
};

export default VotationReviews;
