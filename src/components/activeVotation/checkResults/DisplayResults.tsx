import { Heading, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { AlternativeResult, GetStvResultQuery, GetVotationResultsQuery } from '../../../__generated__/graphql-types';
import AlternativesString from '../../common/AlternativesString';
import { green } from '../../styles/theme';
import ResultsTable from '../results_table/ResultsTable';
import StvResultTable from '../results_table/StvResultTable';

interface DisplayResultsProps {
  stvResult: GetStvResultQuery | null | undefined;
  result: GetVotationResultsQuery | null | undefined;
  isStv: boolean;
  votationId: string;
}

const DisplayResults: React.FC<DisplayResultsProps> = ({ stvResult, result, isStv, votationId }) => {
  const [winners, setWinners] = useState<string[]>();

  useEffect(() => {
    if (winners || (!stvResult?.getStvResult && !result?.getVotationResults)) return;
    const newWinners: string[] = [];
    if (stvResult?.getStvResult) {
      stvResult.getStvResult.stvRoundResults.forEach((r) => newWinners.push(...r.winners.map((w) => w.text)));
    } else if (result?.getVotationResults) {
      newWinners.push(
        ...result.getVotationResults.alternatives
          .filter((a) => a && a.isWinner)
          .map((a) => (a as AlternativeResult).text)
      );
    }
    setWinners(newWinners);
  }, [winners, setWinners, stvResult?.getStvResult, result?.getVotationResults]);

  return (
    <VStack spacing="2rem" w="100%">
      <VStack alignSelf="flex-start" alignItems="flex-start">
        {winners && winners.length > 0 ? (
          <>
            <Heading fontSize="16px" as="h3">
              {`${winners.length > 1 ? 'Vinnerne' : 'Vinneren'} er:`}
            </Heading>
            <VStack alignItems="start">
              <AlternativesString fontSize="24px" color={green} alternatives={winners} />
            </VStack>
          </>
        ) : (
          <Heading fontSize="24px" as="h3">
            Voteringen hadde ingen vinner
          </Heading>
        )}
      </VStack>
      {!isStv ? <ResultsTable result={result} votationId={votationId} /> : <StvResultTable result={stvResult} />}
    </VStack>
  );
};

export default DisplayResults;
