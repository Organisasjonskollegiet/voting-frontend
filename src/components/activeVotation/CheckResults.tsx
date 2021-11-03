import React from 'react';
import { VStack, Heading } from '@chakra-ui/react';
import {
  GetVotationResultsQuery,
  GetStvResultQuery,
  AlternativeResult,
  Alternative as AlternativeType,
} from '../../__generated__/graphql-types';
import ResultsTable from './results_table/ResultsTable';
import StvResultTable from './results_table/StvResultTable';
import AlternativesString from '../common/AlternativesString';
import { green } from '../styles/theme';
import Loading from '../common/Loading';

interface CheckResultsProps {
  votationId: string;
  isStv: boolean;
  result: GetVotationResultsQuery | null | undefined;
  stvResult: GetStvResultQuery | null | undefined;
  winners: AlternativeType[] | AlternativeResult[] | null;
  loading: boolean;
}

const CheckResults: React.FC<CheckResultsProps> = ({ votationId, isStv, result, stvResult, winners, loading }) => {
  if ((!result || !result.getVotationResults) && (!stvResult || !stvResult.getStvResult) && loading) {
    return <Loading text="Henter resultater" asOverlay={false} />;
  }

  return (
    <VStack spacing="2rem">
      <VStack alignSelf="flex-start" alignItems="flex-start">
        {winners && winners.length > 0 ? (
          <>
            <Heading fontSize="16px" as="h3">
              {`${winners.length > 1 ? 'Vinnerne' : 'Vinneren'} er:`}
            </Heading>
            <VStack alignItems="start">
              <AlternativesString
                fontSize="24px"
                color={green}
                alternatives={winners.map((a: AlternativeType | AlternativeResult) => a.text)}
              />
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

export default CheckResults;
