import React, { useState } from 'react';
import { useCastVoteMutation, useGetVotationByIdQuery } from '../../__generated__/graphql-types';
import {
  Heading,
  Text,
  Button,
  Box,
  Center,
  VStack,
  Divider,
  Spinner,
} from '@chakra-ui/react';
import AlternativeContainer from '../molecules/AlternativeContainer';
import { Alternative as AlternativeType } from '../../__generated__/graphql-types';
import Loading from '../atoms/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import WinnerAlternative from '../atoms/WinnerAlternative';

const Votation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {data, loading, error} = useGetVotationByIdQuery({variables: {id: id}});
  const votationData = data?.votationById;

  const {user} = useAuth0();
  const [hasThisUserVoted, setHasThisUserVoted] = useState<boolean>((votationData?.__typename === "Votation" && votationData.hasVoted?.includes(user)) || false);
  
  const [selectedAlternativeId, setSelectedAlternativeId] = useState<string | null>(null);
  const handleSelect = (id: string | null) => setSelectedAlternativeId(id);

  const [castVote] = useCastVoteMutation();
  const submitVote = () => {
    if (selectedAlternativeId !== null) {
      setHasThisUserVoted(true);
      castVote({ variables: { votationId: id, alternativeId: selectedAlternativeId } });
    }
  }

  if (error) return <Text>Det skjedde noe galt under innlastingen</Text>;
  if (loading) return <Center><Spinner size="xl" m="auto"/></Center>;
  if (votationData?.__typename === "VotationNotFoundError") return <Center><Text>Kunne ikke finne voteringen</Text></Center>


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
      { votationData?.__typename === "Votation" &&
      <>
      <Heading as="h1" sx={h1Style}>
        <span style={subTitlesStyle}>Sak {votationData?.id}</span> <br />
        {votationData?.title}
      </Heading>

      <Text mt="1em" mb="2em">
        {votationData?.description}
      </Text>

      {votationData?.status !== 'ENDED' ? (
        <Box>
          {!hasThisUserVoted ? (
        <VStack spacing="1.5em" align="left">
          <Heading as="h2" sx={subTitlesStyle}>
            Alternativer
          </Heading>
          <AlternativeContainer alternatives={votationData?.alternatives as Array<AlternativeType> || []}
            handleSelect={handleSelect}
            blankVotes= {votationData?.blankVotes || false} />
        </VStack>
      ) : (
        <Box mt="4em">
          <Loading text={'Votering pågår'} />
        </Box>
      )}

      <Divider m="3em 0" />

      <Center>
        {!hasThisUserVoted ? (
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
        //<WinnerAlternative alternative={} />
        <></>
      )}
      </>
      }
    </Box>
  );
};

export default Votation;
