import React, { useState } from 'react';
import { Votation as VotationType } from '../../__generated__/graphql-types';
import {
  Heading,
  Text,
  Button,
  Box,
  Center,
  VStack,
  Divider,
} from '@chakra-ui/react';
import AlternativeContainer, { AlternativeContainerProps } from '../molecules/AlternativeContainer';
import Loading from '../atoms/Loading';

export interface VotationProps {
  id: string;
}

const Votation: React.FC<VotationProps> = () => {
  //TODO: fetch data
  const votation /*: VotationType */ = {
    id: '1',
    title: 'Valg av ny leder',
    description:
      'Quo illum corporis enim repellat totam natus sit. Voluptas earum molestias iste quis quam est nemo. Aut modi praesentium facilis ullam.',
    blankVotes: true,
  };

  //TODO: remove when fetch works
  const alternativesDummyData: AlternativeContainerProps = {
    blankVotes: true,
    alternatives: [
      {
        id: '1',
        text: 'Alternativ 1',
        votationId: '1',
      },
      {
        id: '2',
        text: 'Alternativ 2',
        votationId: '1',
      },
      {
        id: '3',
        text: 'Alternativ 3',
        votationId: '1',
      },
      {
        id: '4',
        text: 'Alternativ 4',
        votationId: '1',
      },
    ],
    handleSelect: (id: string | null) => setSelectedAlternativeId(id),
  };

  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [selectedAlternativeId, setSelectedAlternativeId] = useState<string | null>(null);

  const subTitles = {
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
        <span style={subTitles}>Sak {votation.id}</span> <br />
        {votation.title}
      </Heading>

      <Text mt="1em" mb="2em">
        {votation.description}
      </Text>

      {!hasVoted ? (
        <VStack spacing="1.5em" align="left">
          <Heading as="h2" sx={subTitles}>
            Alternativer
          </Heading>
          <AlternativeContainer {...alternativesDummyData} />
        </VStack>
      ) : (
        <Box mt="4em">
          <Loading text={'Votering pågår'} />
        </Box>
      )}

      <Divider m="3em 0" />

      <Center>
        {!hasVoted ? (
          <Button
            onClick={() => setHasVoted(true)}
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
          <Heading as="h2" sx={subTitles}>
            stemmer
          </Heading>
        </Center>
      </VStack>
    </Box>
  );
};

export default Votation;
