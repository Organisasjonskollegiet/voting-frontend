import { useCallback } from 'react';
import { getEmptyAlternative } from '../components/votationList/utils';
import { Alternative, Votation } from '../types/types';

import { VotationStatus } from '../__generated__/graphql-types';

const alternativeMapper = (alternative: Alternative): Alternative => {
  return {
    ...alternative,
    existsInDb: true,
  };
};

const useFormatVotations = (): ((votations: Votation[], winners?: Votation[]) => Votation[]) => {
  /**
   * @description adds existsInDb and isEdited to the votations. If the results of the
   * votation is published, alternatives prop is used and alternatives include isWinner.
   * If the results are not published, the alternatives from the votation is used.
   * If the votations has no alternatives, an empty alternative is added.
   * @param votation
   * @param alternatives is set only if the votationstatus is published, and includes
   * isWinner
   * @returns
   */
  const formatVotation = useCallback((votation: Votation, alternatives?: Alternative[]): Votation => {
    return {
      ...votation,
      existsInDb: true,
      isEdited: false,
      alternatives:
        alternatives && alternatives.length > 0
          ? alternatives.sort((a, b) => a.index - b.index).map(alternativeMapper)
          : votation?.alternatives?.length > 0
          ? votation.alternatives.sort((a, b) => a.index - b.index).map(alternativeMapper)
          : [getEmptyAlternative()],
    };
  }, []);

  /**
   * @description formats all votations and couple it with its results if the
   * votation results are published.
   * @param votations votations from meetingById.votations
   * @param winners list of result from resultsOfPublishedVotations containing
   * votationId and alternatives including whether they are winners or not.
   * @returns votations formatted correctly for further use and editing
   */
  const formatVotations = useCallback(
    (votations: Votation[], winners?: Votation[]) => {
      if (!votations) return [];
      return votations.map((votation) => {
        if (winners && votation.status === VotationStatus.PublishedResult) {
          const indexOfVotation = winners.map((v) => v.id).indexOf(votation.id);
          if (indexOfVotation !== -1) return formatVotation(votation, winners[indexOfVotation].alternatives);
        }
        return formatVotation(votation);
      });
    },
    [formatVotation]
  );

  return formatVotations;
};

export default useFormatVotations;
