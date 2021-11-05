import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  Alternative as AlternativeType,
  Role,
  VotationStatus,
  useCastVoteMutation,
  useGetVotationByIdQuery,
  useVotationStatusUpdatedSubscription,
  useNewVoteRegisteredSubscription,
  useGetWinnerOfVotationLazyQuery,
  VotationType,
  useCastBlankVoteMutation,
  useCastStvVoteMutation,
  Alternative,
  useGetVotationResultsLazyQuery,
  AlternativeResult,
  useGetStvResultLazyQuery,
  useCastVotationReviewMutation,
  GetVotationResultsQuery,
  GetStvResultQuery,
} from '../__generated__/graphql-types';
import { Heading, Text, Box, Center, VStack, Divider, Link, Button } from '@chakra-ui/react';
import Loading from '../components/common/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import VotationResult from '../components/activeVotation/VotationResult';
import { h1Style } from '../components/styles/formStyles';
import VotationController from '../components/activeVotation/ActiveVotationController';
import { centerContainer, outerContainer } from '../components/styles/containerStyles';
import CastVote from '../components/activeVotation/CastVote';
import { ArrowBackIcon } from '@chakra-ui/icons';
import CheckResults from '../components/activeVotation/checkResults/CheckResults';
import { subtitlesStyle } from '../components/styles/styles';
import { MeetingContext } from './MeetingLobby';
// import VotationTypeAccordion from '../components/activeVotation/VotationTypeAccordion';

export type AlternativeWithIndex = AlternativeType & {
  index: number;
  isRanked: boolean;
};

export type ActiveVotationContextState = {
  result: GetVotationResultsQuery | null | undefined;
  stvResult: GetStvResultQuery | null | undefined;
  votationId: string;
  isStv: boolean;
  meetingId: string;
};

const contextDefualtValues: ActiveVotationContextState = {
  result: undefined,
  stvResult: undefined,
  votationId: '',
  isStv: false,
  meetingId: '',
};

export const ActiveVotationContext = createContext<ActiveVotationContextState>(contextDefualtValues);

const Votation: React.FC<{ votationId: string; backToVotationList: (status: VotationStatus) => void }> = ({
  votationId,
  backToVotationList,
}) => {
  const { user } = useAuth0();
  const { presentationMode, isVotingEligible, role, meetingId } = useContext(MeetingContext);

  //Get votation data and participants from meeting
  const { data, loading, error, refetch } = useGetVotationByIdQuery({
    variables: { votationId: votationId },
  });

  const [getWinner, { data: winnerResult, loading: winnerLoading }] = useGetWinnerOfVotationLazyQuery({
    variables: { votationId },
  });

  const [getResult, { data: votationResultData, loading: votationResultLoading }] = useGetVotationResultsLazyQuery({
    variables: { votationId },
    fetchPolicy: 'cache-and-network',
  });

  const [getStvResult, { data: stvResult, loading: stvResultLoading }] = useGetStvResultLazyQuery({
    variables: { votationId },
  });

  const [castStvVote, { loading: stvLoading, error: castStvError }] = useCastStvVoteMutation();

  const [castVotationReview, { error: castVotationReviewError }] = useCastVotationReviewMutation();

  const { data: newStatus } = useVotationStatusUpdatedSubscription({
    variables: { id: votationId },
  });

  const { data: newVoteCountData } = useNewVoteRegisteredSubscription({
    variables: { votationId },
  });

  const [status, setStatus] = useState<VotationStatus | null>(null);
  const [userHasVoted, setUserHasVoted] = useState<boolean>(false);
  const [voteCount, setVoteCount] = useState<number>(0);
  const [winners, setWinners] = useState<AlternativeType[] | AlternativeResult[] | null>(null);
  // when page is refreshed and votes are not hidden, what we say the
  // user has voted is not correct, and therefore the user should not
  // be able to unhide vote
  const [disableToggleShowVote, setDisableToggleShowVote] = useState(true);

  //Handle selected Alternative
  const [selectedAlternativeId, setSelectedAlternativeId] = useState<string | null>(null);
  const [alternatives, setAlternatives] = useState<AlternativeWithIndex[] | undefined>(undefined);

  const [showVote, setShowVote] = useState<boolean>(false);

  const handleSelect = (id: string | null) => setSelectedAlternativeId(id);

  useEffect(() => {
    // reset state if votation is changed
    refetch();
    setWinners(null);
    setDisableToggleShowVote(true);
    setSelectedAlternativeId(null);
    setAlternatives(undefined);
    setShowVote(false);
    setStatus(null);
    setVoteCount(0);
    setUserHasVoted(false);
  }, [votationId, refetch]);

  // Update winner when a new winner result from getWinnerOfVotation is received
  useEffect(() => {
    if (winnerResult?.getWinnerOfVotation) {
      const result = winnerResult.getWinnerOfVotation as Alternative[];
      const newWinners = result.map((a) => {
        return { id: a.id, text: a.text, votationId: a.votationId };
      });
      if (!winners || (winners && newWinners.length > winners.length)) setWinners(newWinners);
    }
  }, [winnerResult, winners]);

  // returns true if we are checking results and you are not participant
  // or if the results are published and the votes are not hidden
  const checkShouldGetResults = useCallback(() => {
    return (
      (status === VotationStatus.CheckingResult && role !== Role.Participant) ||
      (status === VotationStatus.PublishedResult && data?.votationById?.hiddenVotes === false)
    );
  }, [status, data?.votationById?.hiddenVotes, role]);

  // fetch result or winners when status has changed
  useEffect(() => {
    const shouldGetResults = checkShouldGetResults();
    if (shouldGetResults && data?.votationById?.type === VotationType.Stv) {
      getStvResult();
    } else if (shouldGetResults) {
      getResult();
    } else if (!winnerResult && status === VotationStatus.PublishedResult) {
      getWinner();
    }
  }, [
    status,
    role,
    data?.votationById?.hiddenVotes,
    getResult,
    getWinner,
    winnerResult,
    checkShouldGetResults,
    data?.votationById?.type,
    getStvResult,
  ]);

  useEffect(() => {
    if (stvResult) {
      const newWinners: AlternativeType[] = [];
      stvResult.getStvResult?.stvRoundResults.forEach((round) =>
        round.winners.forEach((w) => {
          if (w) newWinners.push(w);
        })
      );
      if (!winners || (winners && newWinners.length > winners.length)) setWinners(newWinners);
    }
  }, [stvResult, winners]);

  // Update winner of votation when new result is received from getVotationResult
  useEffect(() => {
    if (votationResultData?.getVotationResults) {
      const newWinners = votationResultData.getVotationResults.alternatives.filter(
        (a) => a?.isWinner
      ) as AlternativeResult[];
      if (!winners || (winners && newWinners.length > winners.length)) setWinners(newWinners);
    }
  }, [votationResultData, winners]);

  // set alternatives when data arrives
  useEffect(() => {
    if (data?.votationById?.alternatives && !alternatives) {
      const alternatives = data.votationById.alternatives.filter((a) => a) as AlternativeType[];
      const shuffledAlternatives = shuffleAlternatives(alternatives);
      setAlternatives(
        shuffledAlternatives.map((a, index) => {
          return {
            ...a,
            index,
            isRanked: false,
          };
        })
      );
    }
  }, [data?.votationById?.alternatives, alternatives]);

  // update initial votationStatus
  useEffect(() => {
    if (data?.votationById?.status) {
      setStatus(data.votationById.status);
    }
  }, [data?.votationById?.status]);

  // update initial vote count when data arrives on votation
  useEffect(() => {
    if (data?.votationById?.hasVoted && data.votationById.hasVoted.length > voteCount) {
      setVoteCount(data.votationById.hasVoted.length);
    }
  }, [data?.votationById?.hasVoted, voteCount]);

  // update initial userHasVoted when data arrives on votation
  useEffect(() => {
    if (data?.votationById?.hasVoted && user?.sub) {
      setUserHasVoted(data.votationById.hasVoted.map((hasVoted) => `auth0|${hasVoted}`).includes(user?.sub));
    }
  }, [data?.votationById?.hasVoted, user]);

  // update status of votation when new data arrives on subscription
  useEffect(() => {
    const votationStatus = newStatus?.votationStatusUpdated?.votationStatus ?? null;
    const statusForVotationId = newStatus?.votationStatusUpdated?.votationId ?? null;
    if (votationStatus !== null && statusForVotationId === votationId && votationStatus !== status) {
      setStatus(votationStatus);
    }
  }, [newStatus, status, votationId]);

  // update vote count when new vote count arrives from subscription
  useEffect(() => {
    if (
      !newVoteCountData?.newVoteRegistered ||
      newVoteCountData.newVoteRegistered.voteCount === voteCount ||
      newVoteCountData.newVoteRegistered.votationId !== votationId
    )
      return;
    const newVoteCount = newVoteCountData.newVoteRegistered.voteCount;
    setVoteCount(newVoteCount);
  }, [newVoteCountData, voteCount, votationId]);

  //Register the vote
  const [castVote, { loading: castVoteLoading, error: castVoteError }] = useCastVoteMutation();
  const [castBlankVote, { loading: blankVoteLoading, error: blankVoteError }] = useCastBlankVoteMutation();

  const submitVote = async () => {
    if (data?.votationById?.type === VotationType.Stv && alternatives) {
      await castStvVote({
        variables: {
          votationId,
          alternatives: alternatives
            .filter((a) => a.isRanked)
            .map((a) => {
              return {
                alternativeId: a.id,
                ranking: a.index,
              };
            }),
        },
      });
    } else if (selectedAlternativeId !== null) {
      if (selectedAlternativeId === 'BLANK') {
        await castBlankVote({ variables: { votationId: votationId } });
      } else {
        await castVote({ variables: { alternativeId: selectedAlternativeId } });
      }
    }
    setUserHasVoted(true);
    setDisableToggleShowVote(false);
  };

  const shuffleAlternatives = (alternatives: AlternativeType[]) => {
    let currentIndex = alternatives.length;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [alternatives[currentIndex], alternatives[randomIndex]] = [alternatives[randomIndex], alternatives[currentIndex]];
    }

    return alternatives;
  };

  const getViewFromStatus = () => {
    if (!data?.votationById) return <></>;
    switch (status) {
      case VotationStatus.Open:
        return (
          <CastVote
            alternatives={alternatives || []}
            handleSelect={handleSelect}
            blankVotes={data.votationById.blankVotes || false}
            submitVote={submitVote}
            submitButtonDisabled={selectedAlternativeId === null && data.votationById.type !== VotationType.Stv}
            voteCount={voteCount}
            votingEligibleCount={data?.getVoteCount?.votingEligibleCount}
            updateAlternatives={setAlternatives}
            userHasVoted={userHasVoted}
            // show vote if showVote is true, or the user has not voted and is not waiting for vote to be registered
            showVote={showVote || (!userHasVoted && !stvLoading && !castVoteLoading && !blankVoteLoading)}
            isVotingEligible={isVotingEligible}
          />
        );
      case VotationStatus.CheckingResult:
        return (role === Role.Admin || role === Role.Counter) && !presentationMode ? (
          <CheckResults
            loading={stvResultLoading || votationResultLoading}
            meetingId={meetingId}
            winners={winners}
            castVotationReview={(approved: boolean) => castVotationReview({ variables: { votationId, approved } })}
          />
        ) : (
          <Box>
            <Loading asOverlay={false} text={'Resultatene sjekkes'} />
          </Box>
        );
      case VotationStatus.PublishedResult:
        return (
          <Box mt="4em">
            <VotationResult
              loading={votationResultLoading || winnerLoading || stvResultLoading}
              showResultsTable={!data.votationById.hiddenVotes}
              backToVotationList={() => backToVotationList(status)}
              winners={winners}
            />
          </Box>
        );
      case VotationStatus.Invalid:
        return (
          <VStack w="100%" alignItems="start">
            <Text mb="2rem">Voteringen er ble avbrutt av administrator</Text>
            <Button borderRadius={'16em'} onClick={() => backToVotationList(status)} leftIcon={<ArrowBackIcon />}>
              Gå tilbake til liste over voteringer
            </Button>
          </VStack>
        );
      default:
        return <></>;
    }
  };

  if (error?.message === 'Not Authorised!') {
    return (
      <Center mt="40vh">
        <Text>
          Du har ikke tilgang til denne voteringen,{' '}
          <Link href="/" textDecoration="underline">
            gå tilbake til hjemmesiden.
          </Link>
        </Text>
      </Center>
    );
  }

  if (loading) {
    return (
      <Center mt="10vh">
        <Loading asOverlay={false} text={'Henter votering'} />
      </Center>
    );
  }

  if (error || data?.votationById?.id === undefined) {
    return (
      <Center mt="10vh">
        <Text>Det skjedde noe galt under innlastingen</Text>
      </Center>
    );
  }

  if (status === VotationStatus.Upcoming) {
    return (
      <Center mt="10vh">
        <Text>Denne voteringen har ikke åpnet enda, men vil dukke opp her automatisk så fort den åpner.</Text>
      </Center>
    );
  }

  if (castStvError || castVoteError || blankVoteError) {
    return (
      <Center mt="10vh">
        <Text>Det skjedde noe galt med registreringen av stemmen din. Oppdater siden og prøv på ny.</Text>
      </Center>
    );
  }

  if (castVotationReviewError) {
    <Center mt="10vh">
      <Text>Det skjedde noe galt med registreringen av din anmeldelse. Oppdater siden og prøv på ny.</Text>
    </Center>;
  }

  return (
    <ActiveVotationContext.Provider
      value={{
        result: votationResultData,
        stvResult: stvResult,
        votationId: votationId,
        isStv: data.votationById.type === VotationType.Stv,
        meetingId: meetingId,
      }}
    >
      <Center sx={outerContainer}>
        {(castVoteLoading || blankVoteLoading || stvLoading) && <Loading text="Registrerer stemme" asOverlay={true} />}
        <VStack sx={centerContainer} maxWidth="800px" alignItems="left" spacing="2em">
          <VStack alignItems="left" spacing="1rem">
            <VStack alignItems="left" spacing="0.5rem">
              <Heading as="h1" style={subtitlesStyle}>
                Votering {data.votationById.index + 1}
              </Heading>
              <Heading as="h1" sx={h1Style}>
                {data.votationById.title}
              </Heading>
            </VStack>

            <Text mt="1em">{data.votationById.description}</Text>
            {/* <VotationTypeAccordion
                votationType={data.votationById.type}
                majorityThreshold={data.votationById.majorityThreshold}
                numberOfWinners={data.votationById.numberOfWinners}
              /> */}
          </VStack>
          {getViewFromStatus()}
          {(status === VotationStatus.Open || status === VotationStatus.CheckingResult) && (
            <VStack>
              <Divider />
              <VotationController
                backToVotationList={() => backToVotationList(status)}
                showVote={showVote}
                toggleShowVote={() => setShowVote(!showVote)}
                status={status}
                disableShowVote={disableToggleShowVote}
              />
            </VStack>
          )}
        </VStack>
      </Center>
    </ActiveVotationContext.Provider>
  );
};

export default Votation;
