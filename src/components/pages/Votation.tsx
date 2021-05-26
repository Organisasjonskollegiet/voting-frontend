import React, { useState } from 'react';
import { useCastVoteMutation, useGetVotationByIdQuery } from '../../__generated__/graphql-types';
import { Heading, Text, Button, Box, Center, VStack, Divider, Spinner } from '@chakra-ui/react';
import AlternativeList from '../molecules/AlternativeList';
import { Alternative as AlternativeType } from '../../__generated__/graphql-types';
import Loading from '../atoms/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import VotationResult from '../atoms/VotationResult';

const Votation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useGetVotationByIdQuery({ variables: { votationId: id } });
  const votationData = data?.votationById;

  const { user } = useAuth0();
  console.log(user)
  const [userHasVoted, setUserHasVoted] = useState<boolean>(/*votationData?.hasVoted?.includes(user) || */false);

  const [selectedAlternativeId, setSelectedAlternativeId] = useState<string | null>(null);
  const handleSelect = (id: string | null) => setSelectedAlternativeId(id);

  const [castVote] = useCastVoteMutation();
  const submitVote = () => {
    if (selectedAlternativeId !== null) {
      setUserHasVoted(true);
      castVote({ variables: { votationId: id, alternativeId: selectedAlternativeId } });
    }
  };

  if (error) {
    console.log(error)
    return <Text>Det skjedde noe galt under innlastingen</Text>;
  }
  if (loading)
    return (
      <Center>
        <Spinner size="xl" m="auto" />
      </Center>
    );

  const subTitlesStyle = {
    fontStyle: 'normal',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '150%',
  } as React.CSSProperties;

  const h1Style = {
    fontSize: '1.5em',
  };

  return (
    <Box pb="3em" w="80vw" maxW="max-content" m="auto" color="#718096">
      <Heading as="h1" sx={h1Style}>
        <span style={subTitlesStyle}>Sak {votationData?.id}</span> <br />
        {votationData?.title}
      </Heading>

      <Text mt="1em" mb="2em">
        {votationData?.description}
      </Text>

      {votationData?.status !== 'ENDED' ? (
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
              <Loading text={'Votering pågår'} />
            </Box>
          )}

          <Divider m="3em 0" />

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

          <VStack mt="3em" spacing="0">
            <Center>
              <Text fontSize="2.25em" fontWeight="bold">
                69 / 80
              </Text>
            </Center>
            <Center>
              <Heading as="h2" sx={subTitlesStyle}>
                stemmer
              </Heading>
            </Center>
          </VStack>
        </Box>
      ) : (
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
