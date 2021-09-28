import { Box, Heading, VStack, Text, HStack } from '@chakra-ui/react';
import React from 'react';
import { GetStvResultQuery, StvRoundResult } from '../../../__generated__/graphql-types';
import AlternativesString from '../../common/AlternativesString';
import ResultTableContainer from './ResultTableContainer';
import TableColumnNames from './TableColumnNames';
import TableRow from './TableRow';
interface StvResultTableProps {
  result: GetStvResultQuery | null | undefined;
}

const StvResultTable: React.FC<StvResultTableProps> = ({ result }) => {
  const formatAlternativesText = (alternatives: string[], prefix: 'Rundevinner' | 'Rundetaper') => {
    if (alternatives.length === 0) return <></>;
    return (
      <HStack>
        <Text>{alternatives.length > 1 ? `${prefix}: ` : `${prefix}e: `}</Text>
        <AlternativesString alternatives={alternatives} />
      </HStack>
    );
  };

  const removeTrailingZeros = (num: string) => {
    return parseFloat(num).toString();
  };

  const formatNumber = (num: number) => {
    return removeTrailingZeros(num.toFixed(2));
  };

  const isLoserRemovedRandomly = (round: StvRoundResult | undefined) => {
    if (!round || round.losers.length === 0) return false;
    // vote count of the losers
    const losersVoteCount = round.alternativesWithRoundVoteCount.find((a) => a.alternative.id === round.losers[0].id)
      ?.voteCount;
    // number of alterantives with equal amount of votes as the loser
    const nrOfAlternativesWithLeastVotes = round.alternativesWithRoundVoteCount.filter(
      (a) => a.voteCount === losersVoteCount
    ).length;
    // if there are fewer losers than alternatives with that amount of votes, the losers has been picked randomly
    return round.losers.length < nrOfAlternativesWithLeastVotes;
  };

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
      {result?.getStvResult?.stvRoundResults.map((round) => (
        <Box maxW="600px" w="100%">
          <ResultTableContainer>
            <VStack w="100%" alignSelf="start" alignItems="start">
              <Heading fontSize="18px" alignSelf="start">
                {`Runde ${round.index + 1}`}
              </Heading>
              {isLoserRemovedRandomly(round as StvRoundResult) && (
                <Text>Taperen har blitt plukket ut tilfeldig fra de alterantivene med færrest stemmer</Text>
              )}
              {round.winners.length > 0 &&
                formatAlternativesText(
                  round.winners.map((a) => a.text),
                  'Rundevinner'
                )}
              {round.losers.length > 0 &&
                formatAlternativesText(
                  round.losers.map((a) => a.text),
                  'Rundetaper'
                )}
              <TableColumnNames columnNames={['Alternativ', 'Antall stemmer']} />
              {round.alternativesWithRoundVoteCount.map((a) => (
                <TableRow id={a.alternative.id} elements={[a.alternative.text, formatNumber(a.voteCount)]} />
              ))}
            </VStack>
          </ResultTableContainer>
        </Box>
      ))}
    </VStack>
  );
};

export default StvResultTable;
