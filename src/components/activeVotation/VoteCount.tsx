import { Center, VStack, Heading } from '@chakra-ui/react';
import React from 'react';

interface VoteCountProps {
  voteCount: number;
  votingEligibleCount: number | undefined;
}

const VoteCount: React.FC<VoteCountProps> = ({ voteCount, votingEligibleCount }) => {
  if (!votingEligibleCount) return <></>;

  return (
    <VStack mx="3rem">
      <Center>
        <Heading size="xl">{`${voteCount} / ${votingEligibleCount}`}</Heading>
      </Center>
      <Center>
        <Heading size="md">stemmer</Heading>
      </Center>
    </VStack>
  );
};

export default VoteCount;
