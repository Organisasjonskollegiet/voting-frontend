import React, { useContext, useState } from 'react';
import { VStack, Button, Heading, HStack } from '@chakra-ui/react';
import {
  Role,
  useUpdateVotationStatusMutation,
  VotationStatus,
  AlternativeResult,
  Alternative as AlternativeType,
} from '../../../__generated__/graphql-types';
import { useHistory } from 'react-router';
import ResultsTable from '../results_table/ResultsTable';
import CustomAlertDialog, { DialogType } from '../../common/CustomAlertDialog';
import StvResultTable from '../results_table/StvResultTable';
import AlternativesString from '../../common/AlternativesString';
import { green } from '../../styles/theme';
import Loading from '../../common/Loading';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { ActiveVotationContext } from '../../../pages/ActiveVotation';
import VotationReviews from './VotationReviews';

interface CheckResultsProps {
  meetingId: string;
  winners: AlternativeType[] | AlternativeResult[] | null;
  loading: boolean;
  castVotationReview: (approved: boolean) => void;
}

const CheckResults: React.FC<CheckResultsProps> = ({ meetingId, winners, loading, castVotationReview }) => {
  const [updateVotationStatus] = useUpdateVotationStatusMutation();
  const [invalidateVotationDialogOpen, setInvalidateVotationDialogOpen] = useState(false);
  const history = useHistory();

  const { result, stvResult, votationId, role, isStv } = useContext(ActiveVotationContext);

  const handleInvalidResult = async () => {
    setInvalidateVotationDialogOpen(false);
    await updateVotationStatus({ variables: { votationId, status: VotationStatus.Invalid } });
    history.push(`/meeting/${meetingId}`);
  };

  if ((!result || !result.getVotationResults) && (!stvResult || !stvResult.getStvResult) && loading) {
    return <Loading text="Henter resultater" asOverlay={false} />;
  }

  return (
    <VStack spacing="2rem">
      <VStack alignSelf="flex-start" alignItems="flex-start">
        {winners && winners.length > 0 ? (
          <>
            <Heading fontSize="16px" as="h3">
              {`${winners.length > 1 ? 'Vinnerne' : 'Vinneren'} er:`}
            </Heading>
            <VStack alignItems="start">
              <AlternativesString
                fontSize="24px"
                color={green}
                alternatives={winners.map((a: AlternativeType | AlternativeResult) => a.text)}
              />
            </VStack>
          </>
        ) : (
          <Heading fontSize="24px" as="h3">
            Voteringen hadde ingen vinner
          </Heading>
        )}
      </VStack>
      {!isStv ? <ResultsTable result={result} votationId={votationId} /> : <StvResultTable result={stvResult} />}

      <VotationReviews
        // TODO: disse må fikses
        numberOfAccepted={0}
        numberOfRejected={0}
      />

      {role === Role.Admin && (
        <>
          <Button mt="10em" p="1.5em 4em" borderRadius="16em" onClick={() => setInvalidateVotationDialogOpen(true)}>
            Erklær resultat ugyldig
          </Button>
          <CustomAlertDialog
            dialogIsOpen={invalidateVotationDialogOpen}
            handleCancel={() => setInvalidateVotationDialogOpen(false)}
            handleConfirm={handleInvalidResult}
            type={DialogType.INVALIDATE}
          />
        </>
      )}

      {/* check if counter has sumbitted review */}
      {role === Role.Counter && (
        <HStack>
          <Button leftIcon={<CloseIcon />} colorScheme="red" onClick={() => castVotationReview(false)}>
            Avvis
          </Button>
          <Button leftIcon={<CheckIcon />} colorScheme="green" onClick={() => castVotationReview(true)}>
            Godkjenn
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

export default CheckResults;
