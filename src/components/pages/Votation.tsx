import React, { useEffect, useState } from 'react';
import {
  useCastVoteMutation,
  useGetVotationByIdQuery,
  useVotationStatusUpdatedSubscription,
  useNewVoteRegisteredSubscription,
} from '../../__generated__/graphql-types';
import { Heading, Text, Button, Box, Center, VStack, Divider } from '@chakra-ui/react';
import AlternativeList from '../molecules/AlternativeList';
import { Alternative as AlternativeType, VotationStatus } from '../../__generated__/graphql-types';
import Loading from '../atoms/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import VotationResult from '../atoms/VotationResult';
import { h1Style } from '../particles/formStyles';

const Votation: React.FC = () => {
  const { user } = useAuth0();
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useGetVotationByIdQuery({ variables: { votationId: id } });
  const { data: newStatusResult, error: statusError } = useVotationStatusUpdatedSubscription({
    variables: { id },
  });

  const { data: newVoteCountResult, error: newVoteCountErrror } = useNewVoteRegisteredSubscription({
    variables: { votationId: id },
  });
  console.log(user);

  const [status, setStatus] = useState<VotationStatus | null>(null);
  const [userHasVoted, setUserHasVoted] = useState<boolean>(/*votationData?.hasVoted?.includes(user) || */ false);
  const [voteCount, setVoteCount] = useState<number>(0);

  const votationData = data?.votationById;

  useEffect(() => {
    const newStatus = newStatusResult?.votationStatusUpdated ?? null;
    if (newStatus !== null && newStatus !== status) {
      setStatus(newStatus);
    }
  }, [newStatusResult, status]);

  useEffect(() => {
    if (data?.votationById && status === null) {
      setStatus(data.votationById.status);
    }
  }, [data, status]);

  useEffect(() => {
    if (newVoteCountResult?.newVoteRegistered && newVoteCountResult?.newVoteRegistered !== voteCount) {
      setVoteCount(newVoteCountResult?.newVoteRegistered);
    }
  }, [newVoteCountResult, voteCount]);

  useEffect(() => {
    if (data?.votationById?.hasVoted && data.votationById.hasVoted.length > voteCount) {
      setVoteCount(data.votationById.hasVoted.length);
    }
  }, [data, voteCount]);

  //Gets selected Alternative
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

  if (error || statusError || newVoteCountErrror) {
    return <Text>Det skjedde noe galt under innlastingen</Text>;
  }
  if (loading)
    return (
      <Center>
        <Loading asOverlay={false} text={'Henter votering'} />
      </Center>
    );

  const subTitlesStyle = {
    fontStyle: 'normal',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '150%',
  } as React.CSSProperties;

  return (
    <Box pb="3em" w="80vw" maxW="max-content" m="auto" color="#718096">
      <Heading as="h1" sx={h1Style}>
        <span style={subTitlesStyle}>Sak {votationData?.index}</span> <br />
        {votationData?.title}
      </Heading>

      <Text mt="1em" mb="2em">
        {votationData?.description}
      </Text>

      {status === 'OPEN' && (
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
                {`${voteCount} / `}
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
    </Box>
  );
};

export default Votation;
