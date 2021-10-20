import React, { useContext, useState } from 'react';
import { VStack, Flex, Button, Heading, Box } from '@chakra-ui/react';
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
import { ActiveVotationContext } from '../../../pages/ActiveVotation';
import VotationReviews from './VotationReviews';
import ReviewVotation from './ReviewVotation';

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

      {(role === Role.Counter || role === Role.Admin) && (
        <VStack spacing="2rem" pt="2rem">
          <VotationReviews
            // TODO: disse må fikses
            numberOfAccepted={0}
            numberOfRejected={0}
          />
          <Flex justifyContent="space-between" w="100%" alignItems="flex-end" wrap="wrap">
            <ReviewVotation castVotationReview={castVotationReview} />
            {role === Role.Admin && (
              <Box mt="2rem">
                <Button
                  p="1.5em 4em"
                  mb="2px"
                  borderRadius="16em"
                  onClick={() => setInvalidateVotationDialogOpen(true)}
                >
                  Erklær resultat ugyldig
                </Button>
                <CustomAlertDialog
                  dialogIsOpen={invalidateVotationDialogOpen}
                  handleCancel={() => setInvalidateVotationDialogOpen(false)}
                  handleConfirm={handleInvalidResult}
                  type={DialogType.INVALIDATE}
                />
              </Box>
            )}
          </Flex>
        </VStack>
      )}
    </VStack>
  );
};

export default CheckResults;
