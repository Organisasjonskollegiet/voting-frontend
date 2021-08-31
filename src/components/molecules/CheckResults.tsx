import React, { useEffect, useState } from 'react';
import { Box, VStack, Divider, HStack, Button, Heading } from '@chakra-ui/react';
import {
  AlternativeResult,
  Role,
  useGetVotationResultsQuery,
  useUpdateVotationStatusMutation,
  VotationStatus,
} from '../../__generated__/graphql-types';
import { useHistory } from 'react-router';
import { boxShadow } from '../particles/formStyles';

interface CheckResultsProps {
  votationId: string;
  meetingId: string;
  role: Role;
  isStv: boolean;
}

const CheckResults: React.FC<CheckResultsProps> = ({ votationId, meetingId, role, isStv }) => {
  const { data } = useGetVotationResultsQuery({ variables: { id: votationId } });
  const [alternatives, setAlternatives] = useState<AlternativeResult[]>([]);
  const [updateVotationStatus] = useUpdateVotationStatusMutation();
  const [votingEligibleCount, setVotingEligibleCount] = useState<number>(0);
  const [voteCount, setVoteCount] = useState<number>(0);
  const history = useHistory();

  useEffect(() => {
    const newAlternatives = data?.getVotationResults?.alternatives as AlternativeResult[];
    if (newAlternatives && newAlternatives.length !== alternatives.length) {
      const sortedAlternatives = newAlternatives.slice().sort((a, b) => b.votes - a.votes);
      setAlternatives(sortedAlternatives);
    }
  }, [data?.getVotationResults?.alternatives, alternatives.length]);

  useEffect(() => {
    const newVotingEligibleCount = data?.getVotationResults?.votingEligibleCount;
    if (newVotingEligibleCount && newVotingEligibleCount !== votingEligibleCount) {
      setVotingEligibleCount(newVotingEligibleCount);
    }
  }, [data?.getVotationResults?.votingEligibleCount, votingEligibleCount]);

  useEffect(() => {
    const newVoteCount = data?.getVotationResults?.voteCount;
    if (newVoteCount && newVoteCount !== voteCount) {
      setVoteCount(newVoteCount);
    }
  }, [data?.getVotationResults?.voteCount, voteCount]);

  const getRoundedPercentage = (share: number) => {
    return Math.round(share * 100 * 100) / 100;
  };

  const handleInvalidResult = async () => {
    await updateVotationStatus({ variables: { id: votationId, status: VotationStatus.Invalid } });
    history.push(`/meeting/${meetingId}`);
  };

  return (
    <VStack w="100%" spacing="2rem">
      <VStack alignSelf="flex-start" alignItems="flex-start">
        {alternatives.filter((a) => a.isWinner).length > 0 ? (
          <>
            <Heading fontSize="16px" as="h3">
              {`${alternatives.filter((a) => a.isWinner).length > 1 ? 'Vinnerene' : 'Vinneren'} er:`}
            </Heading>
            <Heading color="green" fontSize="24px" as="h3">
              {alternatives
                .filter((a) => a.isWinner)
                .map((a) => a.text)
                .reduce((a, b) => a + ', ' + b)}
            </Heading>{' '}
          </>
        ) : (
          <Heading fontSize="24px" as="h3">
            Voteringen hadde ingen vinner
          </Heading>
        )}
      </VStack>
      {!isStv && (
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
              {alternatives.map((alternative) => (
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
              ))}
            </VStack>
          </VStack>
        </Box>
      )}
      {role === Role.Admin && (
        <Button mt="10em" p="1.5em 4em" borderRadius="16em" onClick={() => handleInvalidResult()}>
          Erklær resultat ugyldig og gå til møteadministrering
        </Button>
      )}
    </VStack>
  );
};

const styles = {
  fontWeight: 'bold',
} as React.CSSProperties;

export default CheckResults;
