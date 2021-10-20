import React, { useContext, useMemo } from 'react';
import { Text } from '@chakra-ui/react';
import { ActiveVotationContext } from '../../../pages/ActiveVotation';
import { Role } from '../../../__generated__/graphql-types';

interface VotationReviewsProps {
  numberOfAccepted: number;
  numberOfRejected: number;
}

const VotationReviews: React.FC<VotationReviewsProps> = ({ numberOfAccepted, numberOfRejected }) => {
  const { participants } = useContext(ActiveVotationContext);

  const numberOfCounters = useMemo(
    () => participants.reduce((sum, p) => (p.role === Role.Counter || p.role === Role.Admin ? sum + 1 : sum), 0),
    [participants]
  );

  if (numberOfCounters === 0) {
    return <></>;
  }

  return (
    <Text>
      Av <b>{numberOfCounters}</b> tellere og administratorer har <b>{numberOfAccepted}</b> markert resultatet som{' '}
      <i>gyldig</i>, mens <b>{numberOfRejected}</b> har market resultatet som <i>ugyldig</i>
    </Text>
  );
};

export default VotationReviews;
