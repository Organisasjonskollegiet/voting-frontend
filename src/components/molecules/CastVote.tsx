import { Button, Center, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { subtitlesStyle } from '../pages/Votation';
import VoteCount from '../atoms/VoteCount';
import { AlternativeWithIndex } from '../pages/Votation';
import AlternativeList from './alternative_list/AlternativeList';
import PreferenceAlternativeList from './alternative_list/PreferenceAlternativeList';
import WrapStack from './WrapStack';
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
  hideVote: boolean;
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
  hideVote,
}) => {
  return (
    <WrapStack breakpoint={730} w="100%" justifyContent="space-between">
      <VStack h="100%" w="100%" maxW="400px" justifyContent="top" spacing="1.5em" alignItems="left">
        <Heading as="h2" sx={subtitlesStyle}>
          Alternativer
        </Heading>
        {isStv ? (
          <PreferenceAlternativeList
            alternatives={alternatives}
            updateAlternatives={updateAlternatives}
            userHasVoted={userHasVoted}
            hideVote={hideVote}
          />
        ) : (
          <AlternativeList
            alternatives={alternatives}
            handleSelect={handleSelect}
            blankVotes={blankVotes}
            userHasVoted={userHasVoted}
            hideVote={hideVote}
          />
        )}
      </VStack>
      <VStack h="100%" justifyContent="flex-end" spacing="1em">
        {userHasVoted && (
          <Center w="300px" mt="4em">
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
