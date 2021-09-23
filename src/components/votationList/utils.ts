import { v4 as uuid } from 'uuid';
import { Votation, Alternative } from '../../types/types';
import { VotationStatus, VotationType } from '../../__generated__/graphql-types';

export const getEmptyAlternative: () => Alternative = () => {
  return {
    id: uuid(),
    text: '',
    index: 0,
    existsInDb: false,
  };
};

export const getEmptyVotation: (id?: string, index?: number) => Votation = (id?: string, index?: number) => {
  return {
    id: id ?? uuid(),
    title: '',
    description: '',
    index: index ?? 0,
    alternatives: [getEmptyAlternative()],
    blankVotes: false,
    status: VotationStatus.Upcoming,
    hiddenVotes: true,
    type: 'SIMPLE' as VotationType,
    numberOfWinners: 1,
    majorityThreshold: 50,
    existsInDb: false,
    isEdited: false,
  };
};
