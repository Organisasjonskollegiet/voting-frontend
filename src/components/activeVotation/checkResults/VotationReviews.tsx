import React, { useContext, useMemo } from 'react';
import { Text } from '@chakra-ui/react';
import { ActiveVotationContext } from '../../../pages/ActiveVotation';
import { Role } from '../../../__generated__/graphql-types';
import { MeetingContext } from '../../../pages/MeetingLobby';

interface VotationReviewsProps {
  numberOfApproved: number;
  numberOfDisapproved: number;
}

const VotationReviews: React.FC<VotationReviewsProps> = ({ numberOfApproved, numberOfDisapproved }) => {
  const { participants } = useContext(MeetingContext);

  const numberOfCounters = useMemo(
    () => participants.reduce((sum, p) => (p.role === Role.Counter || p.role === Role.Admin ? sum + 1 : sum), 0),
    [participants]
  );

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
