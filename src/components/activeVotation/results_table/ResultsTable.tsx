import { Box, Divider, HStack } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { Result } from '../../../__generated__/graphql-types';
import { getRoundedPercentage } from '../utils';
import ResultTableContainer from './ResultTableContainer';
import TableColumnNames from './TableColumnNames';
import TableRow from './TableRow';

interface ResultsTableProps {
  result: Result | null;
  votationId: string;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ result, votationId }) => {
  const [votingEligibleCount, setVotingEligibleCount] = useState<number>(0);
  const [voteCount, setVoteCount] = useState<number>(0);

  useEffect(() => {
    if (!result) return;
    if (result.voteCount !== voteCount) setVoteCount(result.voteCount);
    if (result.votingEligibleCount !== votingEligibleCount) setVotingEligibleCount(result.votingEligibleCount);
  }, [result, voteCount, votingEligibleCount]);

  const getBlankAlternative = (blankVoteCount: number) => {
    return {
      id: 'BLANK',
      isWinner: false,
      text: 'Blanke stemmer',
      index: 0,
      votes: blankVoteCount,
      votationId,
    };
  };

  if (!result) return <></>;

  return (
    <ResultTableContainer>
      <HStack width={'100%'} justifyContent="space-around">
        <Box>{`Antall stemmeberettigede deltakere: ${votingEligibleCount}`}</Box>
        <Box>{`Antall avgitte stemmer: ${voteCount}`}</Box>
      </HStack>
      <Divider m="3em 0" />
      <TableColumnNames columnNames={['Alternativ', 'Antall stemmer', '% av stemmene', '% av stemmeberettigede']} />
      {result.alternatives
        .concat(result.blankVoteCount ? getBlankAlternative(result.blankVoteCount) : [])
        .sort((a, b) => (b?.votes ?? 0) - (a?.votes ?? 0))
        .map((alternative) => {
          if (!alternative) return <></>;
          return (
            <React.Fragment key={alternative.id}>
              <Divider m="3em 0" />
              <TableRow
                id={alternative.id}
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
