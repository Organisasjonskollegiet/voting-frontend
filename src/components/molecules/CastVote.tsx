import { Box, Button, Center, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { subtitlesStyle } from '../pages/Votation';
import AlternativeList from './AlternativeList';
import VoteCount from '../atoms/VoteCount';
import { AlternativeWithIndex } from '../pages/Votation';
import WrapStack from './WrapStack';
import Loading from '../atoms/Loading';
import { h1Style } from '../particles/formStyles';

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
  userHasVoted: boolean;
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
  userHasVoted,
}) => {
  return (
    <WrapStack w="100%" justifyContent="space-between">
      <VStack h="100%" w="100%" maxW="400px" justifyContent="top" spacing="1.5em" alignItems="left">
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
      <VStack h="100%" justifyContent="top" spacing="1em">
        {userHasVoted && (
          <Center mt="4em">
            <Heading as="h1" sx={h1Style}>
              Din stemme er registrert.
            </Heading>
          </Center>
        )}
        <VoteCount voteCount={voteCount} votingEligibleCount={votingEligibleCount} />
        {!userHasVoted && (
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
        )}
      </VStack>
    </WrapStack>
  );
};

export default CastVote;
