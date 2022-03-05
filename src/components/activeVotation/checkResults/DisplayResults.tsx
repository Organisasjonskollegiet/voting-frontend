import { Heading, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ActiveVotationContext } from '../../../pages/ActiveVotation';
import { green } from '../../styles/colors';
import ResultsTable from '../results_table/ResultsTable';
import StvResultTable from '../results_table/StvResultTable';
import { getAlternativesString } from '../utils';

const DisplayResults: React.FC = () => {
  const { result, winners, votationId, isStv } = useContext(ActiveVotationContext);

  return (
    <VStack spacing="2rem" w="100%">
      <VStack alignSelf="flex-start" alignItems="flex-start">
        {winners && winners.length > 0 ? (
          <>
            <Heading size="md">{`${winners.length > 1 ? 'Vinnerne' : 'Vinneren'} er:`}</Heading>
            <Heading size="md" color={green()}>
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
