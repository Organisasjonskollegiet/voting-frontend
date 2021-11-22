import { Button, Center, Heading, VStack, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { subtitlesStyle } from '../styles/styles';
import VoteCount from './VoteCount';
import { ActiveVotationContext, AlternativeWithIndex } from '../../pages/ActiveVotation';
import AlternativeList from './alternative_list/AlternativeList';
import PreferenceAlternativeList from './alternative_list/PreferenceAlternativeList';
import WrapStack from '../common/WrapStack';
import { h1Style } from '../styles/formStyles';
import { green } from '../styles/colors';
import { MeetingContext } from '../../pages/MeetingLobby';
import useScreenWidth from '../../hooks/ScreenWidth';

interface CastVoteProps {
  handleSelect: (id: string | null) => void;
  alternatives: AlternativeWithIndex[];
  blankVotes: boolean;
  submitVote: () => void;
  submitButtonDisabled: boolean;
  voteCount: number;
  votingEligibleCount: number | undefined;
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
  updateAlternatives,
  userHasVoted,
  showVote,
  isVotingEligible,
}) => {
  const { isStv } = useContext(ActiveVotationContext);
  const { presentationMode } = useContext(MeetingContext);
  const screenWidth = useScreenWidth();
  const breakpoint = 730;

  return (
    <WrapStack breakpoint={breakpoint} w="100%" justifyContent="space-between">
      <VStack h="100%" w="100%" maxW="400px" justifyContent="top" spacing="1.5em" alignItems="left">
        <Heading size="md">Alternativer</Heading>
        {isStv && !presentationMode && (
          <Text>Ranger de alternativene du ønsker å stemme på ved å dra dem inn i den øverste boksen.</Text>
        )}
        {isStv && !presentationMode ? (
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
      <VStack justifyContent="flex-end" alignItems="flex-end" alignSelf="center" h="100%">
        <VStack spacing="1em" position={screenWidth > breakpoint ? 'sticky' : 'static'} bottom="1.5em">
          {userHasVoted && (
            <Center w="300px" mt="4em">
              <Heading size="md">Din stemme er registrert.</Heading>
            </Center>
          )}
          {!isVotingEligible && !userHasVoted && (
            <Center w="300px" mt="4em">
              <Heading size="md">Du har ikke stemmerett.</Heading>
            </Center>
          )}
          <VoteCount voteCount={voteCount} votingEligibleCount={votingEligibleCount} />
          {!userHasVoted && isVotingEligible && !presentationMode && (
            <Button
              bg={green}
              color="white"
              w="200px"
              onClick={() => submitVote()}
              p="1.5em 4em"
              borderRadius="16em"
              isDisabled={submitButtonDisabled}
            >
              Avgi stemme
            </Button>
          )}
        </VStack>
      </VStack>
    </WrapStack>
  );
};

export default CastVote;
