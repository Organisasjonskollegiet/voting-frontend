import { Button, Center, Heading, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { subtitlesStyle } from '../pages/Votation';
import AlternativeList from './AlternativeList';
import VoteCount from '../atoms/VoteCount';
import { AlternativeWithIndex } from '../pages/Votation';

interface CastVoteProps {
  handleSelect: (id: string | null) => void;
  alternatives: AlternativeWithIndex[];
  blankVotes: boolean;
  submitVote: () => void;
  submitButtonDisabled: boolean;
  voteCount: number;
  votingEligibleCount: number | undefined;
  isStv: boolean;
  updateAlternatives: (alternatives: AlternativeWithIndex[]) => void;
}

const CastVote: React.FC<CastVoteProps> = ({
  handleSelect,
  alternatives,
  blankVotes,
  submitVote,
  submitButtonDisabled,
  voteCount,
  votingEligibleCount,
  isStv,
  updateAlternatives,
}) => {
  return (
    <HStack w="100%" h="fit-content" justifyContent="space-between">
      <VStack h="100%" justifyContent="top" spacing="1.5em" alignItems="left">
        <Heading as="h2" sx={subtitlesStyle}>
          Alternativer
        </Heading>
        <AlternativeList
          isStv={isStv}
          alternatives={alternatives}
          handleSelect={handleSelect}
          blankVotes={blankVotes}
          updateAlternatives={updateAlternatives}
        />
      </VStack>
      <VStack h="100%" justifyContent="flex-end" spacing="1em">
        <VoteCount voteCount={voteCount} votingEligibleCount={votingEligibleCount} />
        <Button
          bg="green"
          color="white"
          w="200px"
          onClick={() => submitVote()}
          p="1.5em 4em"
          borderRadius="16em"
          isDisabled={submitButtonDisabled}
        >
          Avgi Stemme
        </Button>
      </VStack>
    </HStack>
  );
};

export default CastVote;
