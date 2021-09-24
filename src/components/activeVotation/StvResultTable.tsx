import { Box, HStack, Heading, VStack, Text, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { GetStvResultQuery } from '../../__generated__/graphql-types';
import ResultTableContainer from './ResultTableContainer';
import TableColumnNames from './TableColumnNames';
import TableRow from './TableRow';

interface StvResultTableProps {
  result: GetStvResultQuery | null | undefined;
}

const StvResultTable: React.FC<StvResultTableProps> = ({ result }) => {
  return (
    <VStack w="100%" spacing="2rem" alignItems="start">
      <VStack w="100%" alignItems="start">
        <Heading fontSize="18px" alignSelf="start">
          Oversikt
        </Heading>
        <Box>{`Antall stemmer som kreves for å vinne: ${result?.getStvResult?.quota}`}</Box>
        <Box>{`Antall stemmeberettigede deltakere: ${result?.getStvResult?.votingEligibleCount}`}</Box>
        <Box>{`Antall avgitte stemmer: ${result?.getStvResult?.voteCount}`}</Box>
      </VStack>
      {/* <HStack spacing="1rem" alignItems="start" justifyContent="start"> */}
      {/* <Grid w="100%" templateColumns="repeat(2, 1fr)" gap="6" flexWrap="wrap"> */}
      {result?.getStvResult?.stvRoundResults.map((round) => (
        // <GridItem h="100%" colEnd="auto">
        <Box maxW="600px" w="100%">
          <ResultTableContainer>
            <VStack w="100%" alignSelf="start" alignItems="start">
              <Heading fontSize="18px" alignSelf="start">
                {`Runde ${round.index + 1}`}
              </Heading>
              {round.winners.length > 0 && (
                <Text>{`Rundevinner(e): ${round.winners.map((a) => a?.text).reduce((a, b) => a + ', ' + b)}`}</Text>
              )}
              {round.losers.length > 0 && (
                <Text>{`Rundetaper(e): ${round.losers.map((a) => a?.text).reduce((a, b) => a + ', ' + b)}`}</Text>
              )}
              <TableColumnNames columnNames={['Alternativ', 'Antall stemmer']} />
              {round.alternativesWithRoundVoteCount.map((a) => (
                <TableRow elements={[a.alternative.text, a.voteCount.toString()]} />
              ))}
            </VStack>
          </ResultTableContainer>
        </Box>
        // </GridItem>
      ))}
      {/* </Grid> */}
      {/* </HStack> */}
    </VStack>
  );
};

export default StvResultTable;
