import { Button, Center, Heading, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { subtitlesStyle } from '../../pages/ActiveVotation';
import VoteCount from './VoteCount';
import { AlternativeWithIndex } from '../../pages/ActiveVotation';
import AlternativeList from './alternative_list/AlternativeList';
import PreferenceAlternativeList from './alternative_list/PreferenceAlternativeList';
import WrapStack from '../common/WrapStack';
import { h1Style } from '../styles/formStyles';
import { green } from '../styles/theme';

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
  showVote: boolean;
  isVotingEligible: boolean;
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
  showVote,
  isVotingEligible,
}) => {
  return (
    <WrapStack breakpoint={730} w="100%" justifyContent="space-between">
      <VStack h="100%" w="100%" maxW="400px" justifyContent="top" spacing="1.5em" alignItems="left">
        <Heading as="h2" sx={subtitlesStyle}>
          Alternativer
        </Heading>
        {isStv && <Text>Ranger de alternativene du ønsker å stemme på ved å dra dem inn i den øverste boksen.</Text>}
        {isStv ? (
          <PreferenceAlternativeList
            alternatives={alternatives}
            updateAlternatives={updateAlternatives}
            userHasVoted={userHasVoted}
            showVote={showVote}
          />
        ) : (
          <AlternativeList
            alternatives={alternatives}
            handleSelect={handleSelect}
            blankVotes={blankVotes}
            userHasVoted={userHasVoted}
            showVote={showVote}
            disableVoting={!isVotingEligible || userHasVoted}
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
        {!isVotingEligible && (
          <Center w="300px" mt="4em">
            <Heading as="h1" sx={h1Style}>
              Du har ikke stemmerett.
            </Heading>
          </Center>
        )}
        <VoteCount voteCount={voteCount} votingEligibleCount={votingEligibleCount} />
        {!userHasVoted && isVotingEligible && (
          <Button
            bg={green}
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
