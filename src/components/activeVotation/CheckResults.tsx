import React, { useState } from 'react';
import { VStack, Button, Heading, Text } from '@chakra-ui/react';
import {
  Role,
  useUpdateVotationStatusMutation,
  VotationStatus,
  GetVotationResultsQuery,
  GetStvResultQuery,
  AlternativeResult,
  Alternative as AlternativeType,
} from '../../__generated__/graphql-types';
import { useHistory } from 'react-router';
import ResultsTable from './ResultsTable';
import CustomAlertDialog, { DialogType } from '../common/CustomAlertDialog';
import StvResultTable from './StvResultTable';
import { formatAlternativesString } from './utils';

interface CheckResultsProps {
  votationId: string;
  meetingId: string;
  role: Role;
  isStv: boolean;
  result: GetVotationResultsQuery | null | undefined;
  stvResult: GetStvResultQuery | null | undefined;
  winners: AlternativeType[] | AlternativeResult[] | null;
}

const CheckResults: React.FC<CheckResultsProps> = ({
  votationId,
  meetingId,
  role,
  isStv,
  result,
  stvResult,
  winners,
}) => {
  const [updateVotationStatus] = useUpdateVotationStatusMutation();
  const [invalidateVotationDialogOpen, setInvalidateVotationDialogOpen] = useState(false);
  const history = useHistory();

  const handleInvalidResult = async () => {
    setInvalidateVotationDialogOpen(false);
    await updateVotationStatus({ variables: { votationId, status: VotationStatus.Invalid } });
    history.push(`/meeting/${meetingId}`);
  };

  if ((!result || !result.getVotationResults) && (!stvResult || !stvResult.getStvResult)) return <></>;

  return (
    <VStack spacing="2rem">
      <VStack alignSelf="flex-start" alignItems="flex-start">
        {winners && winners.length > 0 ? (
          <>
            <Heading fontSize="16px" as="h3">
              {`${winners.length > 1 ? 'Vinnerne' : 'Vinneren'} er:`}
            </Heading>
            <VStack alignItems="start">
              <Text fontSize="24px" fontWeight="bold" color="green">
                {formatAlternativesString(winners.map((a: AlternativeType | AlternativeResult) => a.text))}
              </Text>
            </VStack>
          </>
        ) : (
          <Heading fontSize="24px" as="h3">
            Voteringen hadde ingen vinner
          </Heading>
        )}
      </VStack>
      {!isStv ? <ResultsTable result={result} votationId={votationId} /> : <StvResultTable result={stvResult} />}
      {role === Role.Admin && (
        <Button mt="10em" p="1.5em 4em" borderRadius="16em" onClick={() => setInvalidateVotationDialogOpen(true)}>
          Erklær resultat ugyldig
        </Button>
      )}
      <CustomAlertDialog
        dialogIsOpen={invalidateVotationDialogOpen}
        handleCancel={() => setInvalidateVotationDialogOpen(false)}
        handleConfirm={handleInvalidResult}
        type={DialogType.INVALIDATE}
      />
    </VStack>
  );
};

export default CheckResults;
