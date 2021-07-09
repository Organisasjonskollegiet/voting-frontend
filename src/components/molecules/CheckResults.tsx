import React, { useEffect, useState } from 'react';
import { Box, VStack, Divider, HStack } from '@chakra-ui/react';
import {
  AlternativeResult,
  // useVotationStatusUpdatedSubscription,
  // useNewVoteRegisteredSubscription,
  // useVotingEligibleCountQuery,
  useGetVotationResultsQuery,
} from '../../__generated__/graphql-types';

interface CheckResultsProps {
  votationId: string;
  // majorityType: MajorityType;
  // majorityThreshold: number;
  // votingEligibleCount: number;
  // voteCount: number;
  // alternatives: AlternativeType[];
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
            <Divider m="3em 0" />
            <HStack
              key={alternative.id}
              width={'100%'}
              style={alternative.isWinner ? { color: 'green', fontStyle: 'italic' } : {}}
            >
              <Box width={'25%'}>{alternative.text}</Box>
              <Box width={'25%'}>{alternative.votes}</Box>
              <Box width={'25%'}>{(alternative.votes ?? 0 / voteCount) * 100}</Box>
              <Box width={'25%'}>{(alternative.votes ?? 0 / votingEligibleCount) * 100}</Box>
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
