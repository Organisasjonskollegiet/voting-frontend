import React, { useContext, useEffect, useState } from 'react';
import { VStack, Flex, Button, Heading, Box } from '@chakra-ui/react';
import {
  Role,
  useUpdateVotationStatusMutation,
  VotationStatus,
  AlternativeResult,
  Alternative as AlternativeType,
  useReviewAddedSubscription,
  useGetReviewsQuery,
  ReviewResult,
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
  const { result, stvResult, votationId, role, isStv } = useContext(ActiveVotationContext);

  const [updateVotationStatus] = useUpdateVotationStatusMutation();
  const history = useHistory();

  const { data: reviewsResult } = useGetReviewsQuery({ variables: { votationId } });
  const [reviews, setReviews] = useState<ReviewResult>(reviewsResult?.getReviews || { approved: 0, disapproved: 0 });
  const [currentReview, setCurrentReview] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (reviewsResult?.getReviews) {
      setReviews(reviewsResult.getReviews);
    }
    const myReview =
      reviewsResult?.getMyReview?.__typename === 'VotationReview' ? reviewsResult.getMyReview.approved : undefined;
    setCurrentReview(myReview);
  }, [reviewsResult]);

  const { data: updatedReviewsResult } = useReviewAddedSubscription({ variables: { votationId } });
  useEffect(() => {
    if (updatedReviewsResult?.reviewAdded) {
      setReviews(updatedReviewsResult?.reviewAdded);
    }
  }, [updatedReviewsResult]);

  const handleCastReview = (approved: boolean) => {
    setCurrentReview(approved);
    castVotationReview(approved);
  };

  const [invalidateVotationDialogOpen, setInvalidateVotationDialogOpen] = useState(false);
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
          <VotationReviews numberOfApproved={reviews.approved} numberOfDisapproved={reviews.disapproved} />
          <Flex justifyContent="space-between" w="100%" alignItems="flex-end" wrap="wrap">
            <ReviewVotation handleClick={handleCastReview} choice={currentReview} />
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
