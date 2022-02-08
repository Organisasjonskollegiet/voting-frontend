import { v4 as uuid } from 'uuid';
import { Votation, Alternative } from '../../types/types';
import {
  CreateVotationInput,
  UpdateVotationInput,
  VotationStatus,
  VotationType,
} from '../../__generated__/graphql-types';

export const getEmptyAlternative: () => Alternative = () => {
  return {
    id: uuid(),
    text: '',
    index: 0,
    existsInDb: false,
  };
};

export const getEmptyVotation: (id?: string, index?: number) => Votation = (id?, index?) => {
  return {
    id: id ?? uuid(),
    title: '',
    description: '',
    index: index ?? 0,
    alternatives: [getEmptyAlternative()],
    blankVotes: false,
    status: VotationStatus.Upcoming,
    hiddenVotes: true,
    type: VotationType.Simple,
    numberOfWinners: 1,
    majorityThreshold: 50,
    existsInDb: false,
    isEdited: false,
  };
};

type ReorderType = (
  next: Votation,
  upcoming: Votation[],
  startList: string,
  endList: string,
  startIndex: number,
  endIndex: number
) => { newNext: Votation; newUpcoming: Votation[] };

export const reorder: ReorderType = (next, upcoming, startList, endList, startIndex, endIndex) => {
  const newUpcoming = Array.from(upcoming);
  let newNext: Votation | undefined = undefined;
  // the indexOffset is the number of ended votations
  // this is important since the Draggable are provided with the votation's index in the whole meeting, not just upcoming.
  const indexOffset = next.index;

  // if the votation moved is the next votation...
  if (startList === 'next' && endList === 'upcoming') {
    // ...and its moved to top of upcoming, its still the next votation
    if (endIndex === indexOffset) {
      newNext = next;
    }

    // move the 'next' to dropped position and set top of upcoming as next
    else {
      newUpcoming.splice(endIndex - indexOffset - 1, 0, next);
      [newNext] = newUpcoming.splice(0, 1);
    }
  }
  // if the votation is moved from upcoming...
  else {
    const draggedElementIndex = startIndex - indexOffset - 1;

    if (startList === 'upcoming' && endList === 'next') {
      // if it goes on top of next it should be set as next and previous next should be bumped down
      if (endIndex === indexOffset) {
        newNext = newUpcoming[draggedElementIndex];
        newUpcoming.splice(draggedElementIndex, 1);
        newUpcoming.unshift(next);
      }

      // to next, but not to the top, it should be put on top of upcoming
      else {
        const [removed] = newUpcoming.splice(draggedElementIndex, 1);
        newUpcoming.unshift(removed);
      }
    }
    // if it goes elsewhere it should move there
    else {
      const [removed] = newUpcoming.splice(draggedElementIndex, 1);
      newUpcoming.splice(endIndex - indexOffset - 1, 0, removed);
    }
  }

  return { newNext: newNext || next, newUpcoming };
  // return { newNext: next, newUpcoming: upcoming };
};

export const prepareVotationsForCreation: (votations: Votation[]) => CreateVotationInput[] = (votations: Votation[]) =>
  votations.map((votation) => ({
    title: votation.title,
    description: votation.description,
    index: votation.index,
    blankVotes: votation.blankVotes,
    hiddenVotes: votation.hiddenVotes,
    type: votation.type,
    numberOfWinners: votation.numberOfWinners,
    majorityThreshold: votation.majorityThreshold,
    alternatives: votation.alternatives
      .filter((alternative) => alternative.text !== '')
      .map((alternative, index) => ({
        text: alternative.text,
        index: alternative.index ?? index,
      })),
  }));

/**
 * @description removes empty alternatives and other fields from Votation that are unrelevant for the 'updateVotations' mutation
 *
 * @param votations
 *
 * @returns list of object with the necessary fields for the 'updateVotation' mutation
 */
export const prepareVotationsForUpdate: (votations: Votation[]) => UpdateVotationInput[] = (votations) =>
  votations.map((votation) => ({
    id: votation.id,
    title: votation.title,
    description: votation.description,
    index: votation.index,
    blankVotes: votation.blankVotes,
    hiddenVotes: votation.hiddenVotes,
    type: votation.type,
    numberOfWinners: votation.numberOfWinners,
    majorityThreshold: votation.majorityThreshold,
    alternatives: votation.alternatives
      .map((alternative, index) => ({
        id: alternative.id,
        text: alternative.text,
        index: alternative.index ?? index,
      }))
      .filter((alternative) => alternative.text !== ''),
  }));
