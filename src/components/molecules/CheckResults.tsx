import React, { useEffect, useState } from 'react';
import { Box, VStack, Divider, HStack, Button, Heading } from '@chakra-ui/react';
import {
  Role,
  useUpdateVotationStatusMutation,
  VotationStatus,
  GetVotationResultsQuery,
} from '../../__generated__/graphql-types';
import { useHistory } from 'react-router';
import { boxShadow } from '../particles/formStyles';

interface CheckResultsProps {
  votationId: string;
  meetingId: string;
  role: Role;
  isStv: boolean;
  result: GetVotationResultsQuery | null | undefined;
}

const CheckResults: React.FC<CheckResultsProps> = ({ votationId, meetingId, role, isStv, result }) => {
  const [updateVotationStatus] = useUpdateVotationStatusMutation();
  const [votingEligibleCount, setVotingEligibleCount] = useState<number>(0);
  const [voteCount, setVoteCount] = useState<number>(0);
  const history = useHistory();

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

  const getBlankAlternative = (blankVoteCount: number) => {
    return {
      id: 'BLANK',
      isWinner: false,
      text: 'Blanke stemmer',
      votes: blankVoteCount,
      votationId,
    };
  };

  const getRoundedPercentage = (share: number) => {
    return Math.round(share * 100 * 100) / 100;
  };

  const handleInvalidResult = async () => {
    await updateVotationStatus({ variables: { id: votationId, status: VotationStatus.Invalid } });
    history.push(`/meeting/${meetingId}`);
  };

  if (!result || !result.getVotationResults) return <></>;

  return (
    <VStack w="100%" spacing="2rem">
      <VStack alignSelf="flex-start" alignItems="flex-start">
        {result.getVotationResults.alternatives.filter((a) => a && a.isWinner).length > 0 ? (
          <>
            <Heading fontSize="16px" as="h3">
              {`${
                result.getVotationResults.alternatives.filter((a) => a && a.isWinner).length > 1
                  ? 'Vinnerene'
                  : 'Vinneren'
              } er:`}
            </Heading>
            <Heading color="green" fontSize="24px" as="h3">
              {result.getVotationResults.alternatives
                .filter((a) => a && a.isWinner)
                .map((a) => a?.text)
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
                        <Box width={'25%'}>
                          {voteCount > 0 ? getRoundedPercentage(alternative.votes / voteCount) : 0}
                        </Box>
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
