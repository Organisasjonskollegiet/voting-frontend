import { GetVotationResultsQuery, Result, VotationResults } from '../../__generated__/graphql-types';

export const getRoundedPercentage = (share: number): number => {
  return Math.round(share * 100 * 100) / 100;
};

const formatOldVotationResult: (oldResult: VotationResults) => Result = (oldResult) => {
  return {
    votationId: oldResult.id,
    alternatives: oldResult.alternatives,
    voteCount: oldResult.voteCount,
    votingEligibleCount: oldResult.votingEligibleCount,
  } as Result;
};

export const getCorrectVotationResult: (
  votationResultData: GetVotationResultsQuery | undefined | null
) => Result | null = (votationResultData) => {
  if (votationResultData?.result) {
    return votationResultData?.result as Result;
  } else if (votationResultData?.getStvResult) {
    return votationResultData.getStvResult as Result;
  } else if (votationResultData?.getVotationResults) {
    return formatOldVotationResult(votationResultData.getVotationResults as VotationResults);
  } else {
    return null;
  }
};
