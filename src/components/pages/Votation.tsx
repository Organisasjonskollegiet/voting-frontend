import React, { useEffect, useState } from 'react';
import {
  Alternative as AlternativeType,
  Participant,
  Role,
  VotationStatus,
  useCastVoteMutation,
  useGetVotationByIdQuery,
  useVotationStatusUpdatedSubscription,
  useNewVoteRegisteredSubscription,
  useVotingEligibleCountQuery,
} from '../../__generated__/graphql-types';
import { Heading, Text, Button, Box, Center, VStack, Divider, Link } from '@chakra-ui/react';
import AlternativeList from '../molecules/AlternativeList';
import Loading from '../atoms/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import VotationResult from '../atoms/VotationResult';
import { h1Style } from '../particles/formStyles';
import { darkblue } from '../particles/theme';
import { createTextChangeRange } from 'typescript';
import VotationController from '../molecules/VotationController';

const subtitlesStyle = {
  fontStyle: 'normal',
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '150%',
} as React.CSSProperties;

const Votation: React.FC = () => {
  const { user } = useAuth0();
  const { meetingId, votationId } = useParams<{ meetingId: string; votationId: string }>();

  //Get votation data and participants from meeting
  const { data, loading, error } = useGetVotationByIdQuery({
    variables: { votationId: votationId, meetingId: meetingId },
  });

  const {
    data: votingEligibleCountResult,
    loading: votingEligibleCountLoading,
    error: votingEligibleCountError,
  } = useVotingEligibleCountQuery({ variables: { votationId } });

  const { data: newStatusResult, error: statusError } = useVotationStatusUpdatedSubscription({
    variables: { id: votationId },
  });

  const { data: newVoteCountResult, error: newVoteCountErrror } = useNewVoteRegisteredSubscription({
    variables: { votationId },
  });
  console.log(user);

  const [status, setStatus] = useState<VotationStatus | null>(null);
  const [userHasVoted, setUserHasVoted] = useState<boolean>(false);
  const [voteCount, setVoteCount] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const votationData = data?.votationById;

  //Update isAdmin state after data of participants is received
  useEffect(() => {
    if (data?.meetingsById?.participants) {
      const participants = data?.meetingsById?.participants as Array<Participant>;
      const participant = participants.filter((participant) => `auth0|${participant.user?.id}` === user?.sub)[0];
      const isAdmin = participant?.role === Role.Admin;
      setIsAdmin(isAdmin);
    }
  }, [data?.meetingsById]);

  // set initial status of votation when data on votation arrives
  useEffect(() => {
    if (data?.votationById && status === null) {
      setStatus(data.votationById.status);
    }
  }, [data, status]);

  // update initial vote count when data arrives on votation
  useEffect(() => {
    if (data?.votationById?.hasVoted && data.votationById.hasVoted.length > voteCount) {
      setVoteCount(data.votationById.hasVoted.length);
    }
  }, [data, voteCount]);

  // update initial userHasVoted when data arrives on votation
  useEffect(() => {
    if (data?.votationById?.hasVoted && user?.sub) {
      setUserHasVoted(data.votationById.hasVoted.map((hasVoted) => `auth0|${hasVoted}`).includes(user?.sub));
    }
  }, [data, user]);

  // update status of votation when new data arrives on subscription
  useEffect(() => {
    const newStatus = newStatusResult?.votationStatusUpdated ?? null;
    if (newStatus !== null && newStatus !== status) {
      setStatus(newStatus);
    }
  }, [newStatusResult, status]);

  // update vote count when new vote count arrives from subscription
  useEffect(() => {
    if (!newVoteCountResult?.newVoteRegistered || newVoteCountResult.newVoteRegistered === voteCount) return;
    const newVoteCount = newVoteCountResult.newVoteRegistered;
    setVoteCount(newVoteCount);
  }, [newVoteCountResult, voteCount]);

  //Handle selected Alternative
  const [selectedAlternativeId, setSelectedAlternativeId] = useState<string | null>(null);
  const handleSelect = (id: string | null) => setSelectedAlternativeId(id);

  //Register the vote
  const [castVote] = useCastVoteMutation();
  const submitVote = () => {
    if (selectedAlternativeId !== null) {
      setUserHasVoted(true);
      castVote({ variables: { alternativeId: selectedAlternativeId } });
    }
  };

  if (loading || votingEligibleCountLoading) {
    return (
      <>
        <Box h="57px" w="100vw" bgColor={darkblue}></Box>
        <Center mt="10vh">
          <Loading asOverlay={false} text={'Henter votering'} />
        </Center>
      </>
    );
  }

  if (error?.message === 'Not Authorised!') {
    return (
      <>
        <Box h="57px" w="100vw" bgColor={darkblue}></Box>
        <Center mt="40vh">
          <Text>
            Du har ikke tilgang til denne voteringen,{' '}
            <Link href="/" textDecoration="underline">
              gå tilbake til hjemmesiden.
            </Link>
          </Text>
        </Center>
      </>
    );
  }

  if (error || data?.votationById?.id === undefined || votingEligibleCountError) {
    return (
      <>
        <Box h="57px" w="100vw" bgColor={darkblue}></Box>
        <Center mt="10vh">
          <Text>Det skjedde noe galt under innlastingen</Text>
        </Center>
      </>
    );
  }

  const subTitlesStyle = {
    fontStyle: 'normal',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '150%',
  } as React.CSSProperties;

  if (data.votationById.status === VotationStatus.Upcoming) {
    return (
      <>
        <Box h="57px" w="100vw" bgColor={darkblue}></Box>
        <Center mt="10vh">
          <Text>Denne voteringen har ikke åpnet enda, men vil dukke opp her automatisk så fort den åpner.</Text>
        </Center>
      </>
    );
  }

  return (
    <Box>
      <Box h="57px" w="100vw" bgColor={darkblue}></Box>
      <Box pb="3em" w="80vw" maxW="max-content" m="auto" color={darkblue} mt="8vh">
        <Heading as="h1" sx={h1Style}>
          <span style={subTitlesStyle}>Sak {votationData?.index}</span> <br />
          {votationData?.title}
        </Heading>

        <Text mt="1em" mb="2em">
          {votationData?.description}
        </Text>

        {status === VotationStatus.Open && (
          <Box>
            {!userHasVoted ? (
              <VStack spacing="1.5em" align="left">
                <Heading as="h2" sx={subTitlesStyle}>
                  Alternativer
                </Heading>
                <AlternativeList
                  alternatives={(votationData?.alternatives as Array<AlternativeType>) || []}
                  handleSelect={handleSelect}
                  blankVotes={votationData?.blankVotes || false}
                />
              </VStack>
            ) : (
              <Box mt="4em">
                <Loading asOverlay={false} text={'Votering pågår'} />
              </Box>
            )}

            <Divider m="3em 0" />

            {/* Submit button */}
            <Center>
              {!userHasVoted ? (
                <Button
                  onClick={() => submitVote()}
                  p="1.5em 4em"
                  borderRadius="16em"
                  isDisabled={selectedAlternativeId === null}
                >
                  Avgi Stemme
                </Button>
              ) : (
                <Heading as="h1" sx={h1Style}>
                  Din stemme er registrert.
                </Heading>
              )}
            </Center>

            {/* Shows how many participants has voted */}
            <VStack mt="3em" spacing="0">
              <Center>
                <Text fontSize="2.25em" fontWeight="bold">
                  {`${voteCount} / ${votingEligibleCountResult?.votingEligibleCount}`}
                </Text>
              </Center>
              <Center>
                <Heading as="h2" sx={subTitlesStyle}>
                  stemmer
                </Heading>
              </Center>
            </VStack>
          </Box>
        )}
        {status === 'CHECKING_RESULT' && (
          <Box>
            <Loading asOverlay={false} text={'Resultatene sjekkes'} />
          </Box>
        )}
        {status === 'PUBLISHED_RESULT' && (
          <Box mt="4em">
            <VotationResult
              text={
                //TODO: replace with the winning alternatives text property
                ''
              }
            />
          </Box>
        )}
        {
          /* Update votation status for admin if votation is open or you are checking results */
          isAdmin && (status === VotationStatus.Open || status === VotationStatus.CheckingResult) && (
            <VotationController votationId={votationId} status={status} />
          )
        }
      </Box>
    </Box>
  );
};

export default Votation;
