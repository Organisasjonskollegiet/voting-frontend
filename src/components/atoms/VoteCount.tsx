import { Center, VStack, Text, Heading } from '@chakra-ui/react';
import React from 'react';
import { subtitlesStyle } from '../pages/Votation';

interface VoteCountProps {
  voteCount: number;
  votingEligibleCount: number | undefined;
}

const VoteCount: React.FC<VoteCountProps> = ({ voteCount, votingEligibleCount }) => {
  if (!votingEligibleCount) return <></>;

  return (
    <VStack>
      <Center>
        <Text fontSize="2.25em" fontWeight="bold">
          {`${voteCount} / ${votingEligibleCount}`}
        </Text>
      </Center>
      <Center>
        <Heading as="h2" sx={subtitlesStyle}>
          stemmer
        </Heading>
      </Center>
    </VStack>
  );
};

export default VoteCount;
