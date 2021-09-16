import { Box, VStack, Divider, HStack } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { GetVotationResultsQuery } from '../../__generated__/graphql-types';
import { boxShadow } from '../styles/formStyles';

interface ResultsTableProps {
  result: GetVotationResultsQuery | null | undefined;
  votationId: string;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ result, votationId }) => {
  const [votingEligibleCount, setVotingEligibleCount] = useState<number>(0);
  const [voteCount, setVoteCount] = useState<number>(0);

  useEffect(() => {
    if (result?.getVotationResults?.voteCount && result?.getVotationResults?.voteCount !== voteCount) {
      setVoteCount(result.getVotationResults.voteCount);
    }
  }, [result?.getVotationResults?.voteCount, voteCount]);

  useEffect(() => {
    if (
      result?.getVotationResults?.votingEligibleCount &&
      result?.getVotationResults.votingEligibleCount !== votingEligibleCount
    ) {
      setVotingEligibleCount(result.getVotationResults.votingEligibleCount);
    }
  }, [result?.getVotationResults?.votingEligibleCount, votingEligibleCount]);

  const getRoundedPercentage = (share: number) => {
    return Math.round(share * 100 * 100) / 100;
  };

  const getBlankAlternative = (blankVoteCount: number) => {
    return {
      id: 'BLANK',
      isWinner: false,
      text: 'Blanke stemmer',
      votes: blankVoteCount,
      votationId,
    };
  };

  if (!result || !result.getVotationResults) return <></>;

  return (
    <Box width={'100%'} style={{ borderRadius: '4px', padding: '30px', boxShadow }}>
      <VStack width={'100%'} spacing="2rem">
        <VStack w="100%">
          <HStack width={'100%'} justifyContent="space-around">
            <Box>{`Antall stemmeberettigede deltakere: ${votingEligibleCount}`}</Box>
            <Box>{`Antall avgitte stemmer: ${voteCount}`}</Box>
          </HStack>
          <Divider m="3em 0" />
          <HStack width={'100%'}>
            <Box style={styles} width={'25%'}>
              Alternativ
            </Box>
            <Box style={styles} width={'25%'}>
              Antall stemmer
            </Box>
            <Box style={styles} width={'25%'}>
              % av stemmene
            </Box>
            <Box style={styles} width={'25%'}>
              % av stemmeberettigede
            </Box>
          </HStack>
          {result.getVotationResults.alternatives
            .concat(
              result?.getVotationResults?.blankVotes
                ? getBlankAlternative(result.getVotationResults.blankVoteCount)
                : []
            )
            .sort((a, b) => (b?.votes ?? 0) - (a?.votes ?? 0))
            .map((alternative) => {
              if (!alternative) return <></>;
              return (
                <React.Fragment key={alternative.id}>
                  <Divider m="3em 0" />
                  <HStack
                    width={'100%'}
                    key={alternative.id + 'stack'}
                    style={alternative.isWinner ? { color: 'green', fontWeight: 'bold' } : {}}
                  >
                    <Box width={'25%'}>{alternative.text}</Box>
                    <Box width={'25%'}>{alternative.votes}</Box>
                    <Box width={'25%'}>{voteCount > 0 ? getRoundedPercentage(alternative.votes / voteCount) : 0}</Box>
                    <Box width={'25%'}>
                      {votingEligibleCount > 0 ? getRoundedPercentage(alternative.votes / votingEligibleCount) : 0}
                    </Box>
                  </HStack>
                </React.Fragment>
              );
            })}
        </VStack>
      </VStack>
    </Box>
  );
};
const styles = {
  fontWeight: 'bold',
} as React.CSSProperties;

export default ResultsTable;
