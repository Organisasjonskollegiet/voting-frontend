import { NumberDecrementStepperProps } from '@chakra-ui/number-input';
import { MajorityType } from '../__generated__/graphql-types';

export interface MeetingWorking {
  id?: string;
  title: string;
  organization: string;
  startTime: Date;
  description: string;
}

interface Alternative {
  id: string;
  text: string;
  index: number;
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
  isUpdated: boolean;
}
