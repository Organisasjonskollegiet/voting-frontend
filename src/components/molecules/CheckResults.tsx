import React, { useEffect, useState } from 'react';
import { Box, VStack, Divider, HStack } from '@chakra-ui/react';
import { AlternativeResult, useGetVotationResultsQuery } from '../../__generated__/graphql-types';

interface CheckResultsProps {
  votationId: string;
}

const CheckResults: React.FC<CheckResultsProps> = ({ votationId }) => {
  const { data } = useGetVotationResultsQuery({ variables: { id: votationId } });
  const [alternatives, setAlternatives] = useState<AlternativeResult[]>([]);
  const [votingEligibleCount, setVotingEligibleCount] = useState<number>(0);
  const [voteCount, setVoteCount] = useState<number>(0);

  useEffect(() => {
    if (data && data.getVotationResults?.alternatives) {
      const alternatives = data.getVotationResults.alternatives as AlternativeResult[];
      const sortedAlternatives = alternatives.slice().sort((a, b) => b.votes - a.votes);
      setAlternatives(sortedAlternatives);
      setVotingEligibleCount(data.getVotationResults.votingEligibleCount);
      setVoteCount(data.getVotationResults.voteCount);
    }
  }, [data]);

  const getRoundedPercentage = (share: number) => {
    return Math.round(share * 100 * 100) / 100;
  };

  return (
    <Box
      mt="4em"
      width={'80vw'}
      style={{ borderRadius: '4px', padding: '30px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}
    >
      <VStack width={'100%'}>
        <HStack width={'100%'} justifyContent="space-around">
          <Box>{`Antall stemmeberettigede deltakere: ${votingEligibleCount}`}</Box>
          <Box>{`Antall avgitte stemmer: ${voteCount}`}</Box>
        </HStack>
        <Divider m="3em 0" />
        <HStack width={'100%'}>
          <Box style={styles} width={'25%'}>
            Antall stemmer
          </Box>
          <Box style={styles} width={'25%'}>
            Alternativ
          </Box>
          <Box style={styles} width={'25%'}>
            % av stemmene
          </Box>
          <Box style={styles} width={'25%'}>
            % av stemmeberettigede
          </Box>
        </HStack>
        {alternatives.map((alternative) => (
          <>
            <Divider key={alternative.id} m="3em 0" />
            <HStack
              width={'100%'}
              key={alternative.id + 'stack'}
              style={alternative.isWinner ? { color: 'green', fontStyle: 'italic' } : {}}
            >
              <Box width={'25%'}>{alternative.text}</Box>
              <Box width={'25%'}>{alternative.votes}</Box>
              <Box width={'25%'}>{getRoundedPercentage(alternative.votes / voteCount)}</Box>
              <Box width={'25%'}>{getRoundedPercentage(alternative.votes / votingEligibleCount)}</Box>
            </HStack>
          </>
        ))}
      </VStack>
    </Box>
  );
};

const styles = {
  fontWeight: 'bold',
} as React.CSSProperties;

export default CheckResults;
