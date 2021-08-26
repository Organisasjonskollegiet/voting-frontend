import { VotationType, ParticipantInput, VotationStatus } from '../__generated__/graphql-types';

export interface MeetingWorking {
  id?: string;
  title: string;
  organization: string;
  startTime: Date;
  description: string;
}

export type ParticipantWorking = ParticipantInput & {
  existsInDb: boolean;
};

export interface Alternative {
  id: string;
  text: string;
  index?: number;
  existsInDb?: boolean;
}
export interface Votation {
  id: string;
  // key: string;
  title: string;
  description: string;
  index: number;
  status: VotationStatus;
  alternatives: Alternative[];
  blankVotes: boolean;
  hiddenVotes: boolean;
  type: VotationType;
  numberOfWinners: number;
  majorityThreshold: number;
  existsInDb?: boolean;
  isEdited?: boolean;
}
