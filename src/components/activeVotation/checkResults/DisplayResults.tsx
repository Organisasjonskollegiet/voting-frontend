import { Heading, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Result } from '../../../__generated__/graphql-types';
import { green } from '../../styles/colors';
import ResultsTable from '../results_table/ResultsTable';
import StvResultTable from '../results_table/StvResultTable';
import { getAlternativesString } from '../utils';

interface DisplayResultsProps {
  result: Result | null;
  isStv: boolean;
  votationId: string;
}

const DisplayResults: React.FC<DisplayResultsProps> = ({ result, isStv, votationId }) => {
  const [winners, setWinners] = useState<string[]>();
  // id of the votation the winners belong to
  const [votationIdOfWinners, setVotationIdOfWinners] = useState<string>();

  useEffect(() => {
    // return there are no results or if the winners for this votation is already set
    if (!result || votationIdOfWinners === votationId) return;
    if (result.votationId === votationId) {
      setWinners(result.alternatives.filter((a) => a.isWinner).map((a) => a.text));
      setVotationIdOfWinners(votationId);
    }
  }, [winners, setWinners, result, votationId, votationIdOfWinners]);

  return (
    <VStack spacing="2rem" w="100%">
      <VStack alignSelf="flex-start" alignItems="flex-start">
        {winners && winners.length > 0 ? (
          <>
            <Heading size="md">{`${winners.length > 1 ? 'Vinnerne' : 'Vinneren'} er:`}</Heading>
            <Heading size="md" color={green}>
              {getAlternativesString(winners)}
            </Heading>
          </>
        ) : (
          <Heading size="md">Voteringen hadde ingen vinner</Heading>
        )}
      </VStack>
      {!isStv ? <ResultsTable result={result} votationId={votationId} /> : <StvResultTable result={result} />}
    </VStack>
  );
};

export default DisplayResults;
