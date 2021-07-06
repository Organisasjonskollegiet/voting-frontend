import { MajorityType } from '../__generated__/graphql-types';

export interface MeetingWorking {
  id?: string;
  title: string;
  organization: string;
  startTime: Date;
  description: string;
}

export interface Alternative {
  id: string;
  text: string;
  index: number;
  existsInDb: boolean;
}
export interface Votation {
  id: string;
  title: string;
  description: string;
  index: number;
  alternatives: Alternative[];
  blankVotes: boolean;
  hiddenVotes: boolean;
  severalVotes: boolean;
  majorityType: MajorityType;
  majorityThreshold: number;
  existsInDb: boolean;
  isEdited: boolean;
}
