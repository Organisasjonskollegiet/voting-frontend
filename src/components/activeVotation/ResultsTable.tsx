import { Box, Divider, HStack } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { GetVotationResultsQuery } from '../../__generated__/graphql-types';
import ResultTableContainer from './ResultTableContainer';
import TableColumnNames from './TableColumnNames';
import TableRow from './TableRow';

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
    <ResultTableContainer>
      <HStack width={'100%'} justifyContent="space-around">
        <Box>{`Antall stemmeberettigede deltakere: ${votingEligibleCount}`}</Box>
        <Box>{`Antall avgitte stemmer: ${voteCount}`}</Box>
      </HStack>
      <Divider m="3em 0" />
      <TableColumnNames columnNames={['Alternativ', 'Antall stemmer', '% av stemmene', '% av stemmeberettigede']} />
      {result.getVotationResults.alternatives
        .concat(
          result?.getVotationResults?.blankVotes ? getBlankAlternative(result.getVotationResults.blankVoteCount) : []
        )
        .sort((a, b) => (b?.votes ?? 0) - (a?.votes ?? 0))
        .map((alternative) => {
          if (!alternative) return <></>;
          return (
            <React.Fragment key={alternative.id}>
              <Divider m="3em 0" />
              <TableRow
                elements={[
                  alternative.text,
                  alternative.votes.toString(),
                  voteCount > 0 ? getRoundedPercentage(alternative.votes / voteCount).toString() : '0',
                  votingEligibleCount > 0
                    ? getRoundedPercentage(alternative.votes / votingEligibleCount).toString()
                    : '0',
                ]}
                key={alternative.id + 'stack'}
                style={alternative.isWinner ? { color: 'green', fontWeight: 'bold' } : {}}
              />
            </React.Fragment>
          );
        })}
    </ResultTableContainer>
  );
};

export default ResultsTable;
