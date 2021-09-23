import React, { useState } from 'react';
import { VStack, Button, Heading } from '@chakra-ui/react';
import {
  Role,
  useUpdateVotationStatusMutation,
  VotationStatus,
  GetVotationResultsQuery,
} from '../../__generated__/graphql-types';
import { useHistory } from 'react-router';
import ResultsTable from './ResultsTable';
import CustomAlertDialog, { DialogType } from '../common/CustomAlertDialog';

interface CheckResultsProps {
  votationId: string;
  meetingId: string;
  role: Role;
  isStv: boolean;
  result: GetVotationResultsQuery | null | undefined;
}

const CheckResults: React.FC<CheckResultsProps> = ({ votationId, meetingId, role, isStv, result }) => {
  const [updateVotationStatus] = useUpdateVotationStatusMutation();
  const [invalidateVotationDialogOpen, setInvalidateVotationDialogOpen] = useState(false);
  const history = useHistory();

  const handleInvalidResult = async () => {
    setInvalidateVotationDialogOpen(false);
    await updateVotationStatus({ variables: { votationId, status: VotationStatus.Invalid } });
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
                  ? 'Vinnerne'
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
      {!isStv && <ResultsTable result={result} votationId={votationId} />}
      {role === Role.Admin && (
        <Button mt="10em" p="1.5em 4em" borderRadius="16em" onClick={() => setInvalidateVotationDialogOpen(true)}>
          Erklær resultat ugyldig og gå til møteadministrering
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
