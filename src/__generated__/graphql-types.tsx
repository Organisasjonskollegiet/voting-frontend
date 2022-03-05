import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Alternative = {
  __typename?: 'Alternative';
  id: Scalars['ID'];
  index: Scalars['Int'];
  text: Scalars['String'];
  votationId: Scalars['String'];
};

export type AlternativeResult = {
  __typename?: 'AlternativeResult';
  id: Scalars['ID'];
  index: Scalars['Int'];
  isWinner: Scalars['Boolean'];
  text: Scalars['String'];
  votationId: Scalars['String'];
  votes: Scalars['Int'];
};

/** connects alternative to its vote count for one round when computing stv result */
export type AlternativeRoundVoteCount = {
  __typename?: 'AlternativeRoundVoteCount';
  alternative: Alternative;
  voteCount: Scalars['Float'];
};

export type AlternativeWithWinner = {
  __typename?: 'AlternativeWithWinner';
  id: Scalars['ID'];
  index: Scalars['Int'];
  isWinner: Scalars['Boolean'];
  text: Scalars['String'];
};

export type CreateAlternativeInput = {
  index: Scalars['Int'];
  text: Scalars['String'];
};

export type CreateMeetingInput = {
  allowSelfRegistration: Scalars['Boolean'];
  description?: InputMaybe<Scalars['String']>;
  organization: Scalars['String'];
  startTime: Scalars['DateTime'];
  title: Scalars['String'];
};

export type CreateVotationInput = {
  alternatives?: InputMaybe<Array<CreateAlternativeInput>>;
  blankVotes: Scalars['Boolean'];
  description?: InputMaybe<Scalars['String']>;
  hiddenVotes: Scalars['Boolean'];
  index: Scalars['Int'];
  majorityThreshold: Scalars['Int'];
  numberOfWinners: Scalars['Int'];
  title: Scalars['String'];
  type: VotationType;
};

export type DeleteParticipantResult = OwnerCannotBeRemovedFromParticipantError | Participant;

export type GetUserResult = User | UserNotFoundError;

export type MaxOneOpenVotationError = {
  __typename?: 'MaxOneOpenVotationError';
  message: Scalars['String'];
};

export type Meeting = {
  __typename?: 'Meeting';
  allowSelfRegistration: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  organization: Scalars['String'];
  owner?: Maybe<User>;
  participants: Array<Maybe<Participant>>;
  startTime: Scalars['DateTime'];
  status: MeetingStatus;
  title: Scalars['String'];
  votations?: Maybe<Array<Maybe<Votation>>>;
};

export enum MeetingStatus {
  Ended = 'ENDED',
  Ongoing = 'ONGOING',
  Upcoming = 'UPCOMING'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates invites and participants for the emails provided. */
  addParticipants?: Maybe<Scalars['Int']>;
  /** Returns the id of the votation */
  castBlankVote?: Maybe<Scalars['String']>;
  castStvVote?: Maybe<Scalars['String']>;
  castVote?: Maybe<Vote>;
  createMeeting?: Maybe<Meeting>;
  createVotations?: Maybe<Array<Maybe<Votation>>>;
  deleteAlternatives?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Delete your own user. */
  deleteMe?: Maybe<Scalars['String']>;
  deleteMeeting?: Maybe<Meeting>;
  deleteParticipants?: Maybe<Array<Maybe<Scalars['String']>>>;
  deleteVotation?: Maybe<Scalars['String']>;
  /** Register the logged in user as a participant. */
  registerAsParticipant?: Maybe<Participant>;
  /** Approve or disapprove a votation result */
  reviewVotation?: Maybe<Scalars['String']>;
  /** Start the next votation in line for a meeting. */
  startNextVotation?: Maybe<OpenVotationResult>;
  updateMeeting?: Maybe<Meeting>;
  /** Update participants of a meeting. */
  updateParticipant?: Maybe<ParticipantOrInvite>;
  updateVotationIndexes?: Maybe<Array<Maybe<Votation>>>;
  /** Update status of a votation, to anything other than OPEN. */
  updateVotationStatus?: Maybe<Votation>;
  /** Update votations belonging to a meeting. */
  updateVotations?: Maybe<Array<Maybe<Votation>>>;
};


export type MutationAddParticipantsArgs = {
  meetingId: Scalars['String'];
  participants: Array<ParticipantInput>;
};


export type MutationCastBlankVoteArgs = {
  votationId: Scalars['String'];
};


export type MutationCastStvVoteArgs = {
  alternatives: Array<StvVoteAlternativeInput>;
  votationId: Scalars['String'];
};


export type MutationCastVoteArgs = {
  alternativeId: Scalars['String'];
};


export type MutationCreateMeetingArgs = {
  meeting: CreateMeetingInput;
};


export type MutationCreateVotationsArgs = {
  meetingId: Scalars['String'];
  votations: Array<CreateVotationInput>;
};


export type MutationDeleteAlternativesArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationDeleteMeetingArgs = {
  id: Scalars['String'];
};


export type MutationDeleteParticipantsArgs = {
  emails: Array<Scalars['String']>;
  meetingId: Scalars['String'];
};


export type MutationDeleteVotationArgs = {
  votationId: Scalars['String'];
};


export type MutationRegisterAsParticipantArgs = {
  meetingId: Scalars['String'];
};


export type MutationReviewVotationArgs = {
  approved: Scalars['Boolean'];
  votationId: Scalars['String'];
};


export type MutationStartNextVotationArgs = {
  meetingId: Scalars['String'];
};


export type MutationUpdateMeetingArgs = {
  meeting: UpdateMeetingInput;
};


export type MutationUpdateParticipantArgs = {
  meetingId: Scalars['String'];
  participant: ParticipantInput;
};


export type MutationUpdateVotationIndexesArgs = {
  meetingId: Scalars['String'];
  votations: Array<UpdateVotationIndexInput>;
};


export type MutationUpdateVotationStatusArgs = {
  status: VotationStatus;
  votationId: Scalars['String'];
};


export type MutationUpdateVotationsArgs = {
  meetingId: Scalars['String'];
  votations: Array<UpdateVotationInput>;
};

export type MyReviewResult = NoReview | VotationReview;

export type NewVoteRegisteredResponse = {
  __typename?: 'NewVoteRegisteredResponse';
  votationId: Scalars['String'];
  voteCount: Scalars['Int'];
  votingEligibleCount: Scalars['Int'];
};

export type NoReview = {
  __typename?: 'NoReview';
  message: Scalars['String'];
};

export type NoUpcomingVotations = {
  __typename?: 'NoUpcomingVotations';
  message: Scalars['String'];
};

export type OpenVotationResult = MaxOneOpenVotationError | NoUpcomingVotations | OpenedVotation | VotationHasNoAlternatives;

export type OpenedVotation = {
  __typename?: 'OpenedVotation';
  title: Scalars['String'];
  votationId: Scalars['String'];
};

export type OwnerCannotBeRemovedFromParticipantError = {
  __typename?: 'OwnerCannotBeRemovedFromParticipantError';
  message: Scalars['String'];
};

export type Participant = {
  __typename?: 'Participant';
  isVotingEligible: Scalars['Boolean'];
  role: Role;
  user?: Maybe<User>;
};

export type ParticipantInput = {
  email: Scalars['String'];
  isVotingEligible: Scalars['Boolean'];
  role: Role;
};

export type ParticipantOrInvite = {
  __typename?: 'ParticipantOrInvite';
  email: Scalars['String'];
  isVotingEligible: Scalars['Boolean'];
  role: Role;
};

export type ParticipantUpdatedResponse = {
  __typename?: 'ParticipantUpdatedResponse';
  isVotingEligible: Scalars['Boolean'];
  role: Role;
};

export type Query = {
  __typename?: 'Query';
  getMyReview?: Maybe<MyReviewResult>;
  getOpenVotation?: Maybe<Scalars['String']>;
  /** Return the number of approvals and disapprovals of a votation */
  getReviews?: Maybe<ReviewResult>;
  /** Get results from an stv votation */
  getStvResult?: Maybe<StvResult>;
  getVotationResults?: Maybe<VotationResults>;
  getVoteCount?: Maybe<VoteCountResult>;
  getWinnerOfVotation?: Maybe<Array<Maybe<Alternative>>>;
  /** Find a meeting by id from meetings youre participating in */
  meetingById?: Maybe<Meeting>;
  /** Find meetings you are participating in */
  meetings: Array<Maybe<Meeting>>;
  /** Return participant belonging to the user for the meeting specified. */
  myParticipant?: Maybe<ParticipantOrInvite>;
  /** Get number of upcoming votations for a meeting. */
  numberOfUpcomingVotations?: Maybe<Scalars['Int']>;
  /** Return relevant information about invites and participants connected to meeting */
  participants?: Maybe<Array<Maybe<ParticipantOrInvite>>>;
  /** Returns result of a votation */
  result?: Maybe<Result>;
  /** Return the results of all the votations with votationStatus === "PUBLISHED_RESULT" of that meeting */
  resultsOfPublishedVotations?: Maybe<Array<Maybe<VotationWithWinner>>>;
  user?: Maybe<GetUserResult>;
  votationById?: Maybe<Votation>;
};


export type QueryGetMyReviewArgs = {
  votationId: Scalars['String'];
};


export type QueryGetOpenVotationArgs = {
  meetingId: Scalars['String'];
};


export type QueryGetReviewsArgs = {
  votationId: Scalars['String'];
};


export type QueryGetStvResultArgs = {
  votationId: Scalars['String'];
};


export type QueryGetVotationResultsArgs = {
  votationId: Scalars['String'];
};


export type QueryGetVoteCountArgs = {
  votationId: Scalars['String'];
};


export type QueryGetWinnerOfVotationArgs = {
  votationId: Scalars['String'];
};


export type QueryMeetingByIdArgs = {
  meetingId: Scalars['String'];
};


export type QueryMyParticipantArgs = {
  meetingId: Scalars['String'];
};


export type QueryNumberOfUpcomingVotationsArgs = {
  meetingId: Scalars['String'];
};


export type QueryParticipantsArgs = {
  meetingId: Scalars['String'];
};


export type QueryResultArgs = {
  votationId: Scalars['String'];
};


export type QueryResultsOfPublishedVotationsArgs = {
  meetingId: Scalars['String'];
};


export type QueryVotationByIdArgs = {
  votationId: Scalars['String'];
};

/** The result of a votation */
export type Result = {
  __typename?: 'Result';
  alternatives: Array<AlternativeResult>;
  blankVoteCount?: Maybe<Scalars['Int']>;
  quota?: Maybe<Scalars['Float']>;
  stvRoundResults?: Maybe<Array<StvRoundResult>>;
  votationId: Scalars['String'];
  voteCount: Scalars['Int'];
  votingEligibleCount: Scalars['Int'];
};

export type ReviewResult = {
  __typename?: 'ReviewResult';
  approved: Scalars['Int'];
  disapproved: Scalars['Int'];
};

export enum Role {
  Admin = 'ADMIN',
  Counter = 'COUNTER',
  Participant = 'PARTICIPANT'
}

/** Results from a stv votation */
export type StvResult = {
  __typename?: 'StvResult';
  alternatives: Array<AlternativeResult>;
  quota: Scalars['Int'];
  stvRoundResults: Array<StvRoundResult>;
  votationId: Scalars['String'];
  voteCount: Scalars['Int'];
  votingEligibleCount: Scalars['Int'];
};

/** Results from one round computing the result of an stv votation */
export type StvRoundResult = {
  __typename?: 'StvRoundResult';
  alternativesWithRoundVoteCount: Array<AlternativeRoundVoteCount>;
  id: Scalars['String'];
  index: Scalars['Int'];
  losers: Array<Alternative>;
  winners: Array<Alternative>;
};

export type StvVoteAlternativeInput = {
  alternativeId: Scalars['String'];
  ranking: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newVoteRegistered?: Maybe<NewVoteRegisteredResponse>;
  participantUpdated?: Maybe<ParticipantUpdatedResponse>;
  reviewAdded?: Maybe<ReviewResult>;
  votationDeleted?: Maybe<Scalars['String']>;
  votationOpenedForMeeting?: Maybe<Scalars['String']>;
  votationStatusUpdated?: Maybe<VotationStatusUpdatedResponse>;
  /** Returns the updated votations of a meeting. */
  votationsUpdated?: Maybe<Array<Maybe<VotationWithAlternative>>>;
};


export type SubscriptionNewVoteRegisteredArgs = {
  votationId: Scalars['String'];
};


export type SubscriptionParticipantUpdatedArgs = {
  meetingId: Scalars['String'];
  userId: Scalars['String'];
};


export type SubscriptionReviewAddedArgs = {
  votationId: Scalars['String'];
};


export type SubscriptionVotationDeletedArgs = {
  meetingId: Scalars['String'];
};


export type SubscriptionVotationOpenedForMeetingArgs = {
  meetingId: Scalars['String'];
};


export type SubscriptionVotationStatusUpdatedArgs = {
  id: Scalars['String'];
};


export type SubscriptionVotationsUpdatedArgs = {
  meetingId: Scalars['String'];
};

export type UpdateAlternativeInput = {
  id: Scalars['String'];
  index: Scalars['Int'];
  text: Scalars['String'];
};

export type UpdateMeetingInput = {
  allowSelfRegistration?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  organization?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<MeetingStatus>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateParticipantInput = {
  email: Scalars['String'];
  isVotingEligible: Scalars['Boolean'];
  role: Role;
  userExists: Scalars['Boolean'];
};

export type UpdateVotationIndexInput = {
  id: Scalars['String'];
  index: Scalars['Int'];
};

export type UpdateVotationInput = {
  alternatives?: InputMaybe<Array<UpdateAlternativeInput>>;
  blankVotes: Scalars['Boolean'];
  description?: InputMaybe<Scalars['String']>;
  hiddenVotes: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  majorityThreshold: Scalars['Int'];
  numberOfWinners: Scalars['Int'];
  title: Scalars['String'];
  type: VotationType;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  id: Scalars['ID'];
};

export type UserNotFoundError = {
  __typename?: 'UserNotFoundError';
  message: Scalars['String'];
};

export type Votation = {
  __typename?: 'Votation';
  alternatives?: Maybe<Array<Maybe<Alternative>>>;
  blankVotes: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  hasVoted?: Maybe<Array<Maybe<Scalars['String']>>>;
  hiddenVotes: Scalars['Boolean'];
  id: Scalars['ID'];
  index: Scalars['Int'];
  majorityThreshold: Scalars['Int'];
  meetingId: Scalars['String'];
  numberOfWinners: Scalars['Int'];
  status: VotationStatus;
  title: Scalars['String'];
  type: VotationType;
};

export type VotationHasNoAlternatives = {
  __typename?: 'VotationHasNoAlternatives';
  message: Scalars['String'];
};

/** The results of a votation */
export type VotationResults = {
  __typename?: 'VotationResults';
  alternatives: Array<AlternativeResult>;
  blankVoteCount: Scalars['Int'];
  blankVotes: Scalars['Boolean'];
  id: Scalars['String'];
  voteCount: Scalars['Int'];
  votingEligibleCount: Scalars['Int'];
};

export type VotationReview = {
  __typename?: 'VotationReview';
  approved: Scalars['Boolean'];
};

export enum VotationStatus {
  CheckingResult = 'CHECKING_RESULT',
  Invalid = 'INVALID',
  Open = 'OPEN',
  PublishedResult = 'PUBLISHED_RESULT',
  Upcoming = 'UPCOMING'
}

export type VotationStatusUpdatedResponse = {
  __typename?: 'VotationStatusUpdatedResponse';
  reason?: Maybe<Scalars['String']>;
  votationId: Scalars['String'];
  votationStatus: VotationStatus;
};

export enum VotationType {
  Qualified = 'QUALIFIED',
  Simple = 'SIMPLE',
  Stv = 'STV'
}

export type VotationWithAlternative = {
  __typename?: 'VotationWithAlternative';
  alternatives?: Maybe<Array<Maybe<Alternative>>>;
  blankVotes: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  hiddenVotes: Scalars['Boolean'];
  id: Scalars['ID'];
  index: Scalars['Int'];
  majorityThreshold: Scalars['Int'];
  meetingId: Scalars['String'];
  numberOfWinners: Scalars['Int'];
  status: VotationStatus;
  title: Scalars['String'];
  type: VotationType;
};

export type VotationWithWinner = {
  __typename?: 'VotationWithWinner';
  alternatives: Array<Maybe<AlternativeWithWinner>>;
  id: Scalars['ID'];
};

export type Vote = {
  __typename?: 'Vote';
  alternative?: Maybe<Alternative>;
  alternativeId: Scalars['String'];
  id: Scalars['ID'];
};

/** The result of getVoteCount */
export type VoteCountResult = {
  __typename?: 'VoteCountResult';
  voteCount: Scalars['Int'];
  votingEligibleCount: Scalars['Int'];
};

export type CreateMeetingMutationVariables = Exact<{
  meeting: CreateMeetingInput;
}>;


export type CreateMeetingMutation = { __typename?: 'Mutation', createMeeting?: { __typename?: 'Meeting', id: string, title: string, organization: string, startTime: any, description?: string | null, status: MeetingStatus, allowSelfRegistration: boolean } | null };

export type UpdateMeetingMutationVariables = Exact<{
  meeting: UpdateMeetingInput;
}>;


export type UpdateMeetingMutation = { __typename?: 'Mutation', updateMeeting?: { __typename?: 'Meeting', id: string, title: string, organization: string, startTime: any, description?: string | null, status: MeetingStatus, allowSelfRegistration: boolean } | null };

export type AddParticipantsMutationVariables = Exact<{
  meetingId: Scalars['String'];
  participants: Array<ParticipantInput> | ParticipantInput;
}>;


export type AddParticipantsMutation = { __typename?: 'Mutation', addParticipants?: number | null };

export type UpdateParticipantMutationVariables = Exact<{
  meetingId: Scalars['String'];
  participant: ParticipantInput;
}>;


export type UpdateParticipantMutation = { __typename?: 'Mutation', updateParticipant?: { __typename?: 'ParticipantOrInvite', email: string, role: Role, isVotingEligible: boolean } | null };

export type DeleteParticipantsMutationVariables = Exact<{
  meetingId: Scalars['String'];
  emails: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteParticipantsMutation = { __typename?: 'Mutation', deleteParticipants?: Array<string | null> | null };

export type DeleteMeetingMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteMeetingMutation = { __typename?: 'Mutation', deleteMeeting?: { __typename?: 'Meeting', id: string } | null };

export type RegisterAsParticipantMutationVariables = Exact<{
  meetingId: Scalars['String'];
}>;


export type RegisterAsParticipantMutation = { __typename?: 'Mutation', registerAsParticipant?: { __typename?: 'Participant', role: Role, isVotingEligible: boolean } | null };

export type CreateVotationsMutationVariables = Exact<{
  meetingId: Scalars['String'];
  votations: Array<CreateVotationInput> | CreateVotationInput;
}>;


export type CreateVotationsMutation = { __typename?: 'Mutation', createVotations?: Array<{ __typename?: 'Votation', id: string, meetingId: string, title: string, description?: string | null, index: number, blankVotes: boolean, status: VotationStatus, hiddenVotes: boolean, type: VotationType, numberOfWinners: number, majorityThreshold: number, alternatives?: Array<{ __typename?: 'Alternative', id: string, text: string, index: number } | null> | null } | null> | null };

export type UpdateVotationIndexesMutationVariables = Exact<{
  votations: Array<UpdateVotationIndexInput> | UpdateVotationIndexInput;
  meetingId: Scalars['String'];
}>;


export type UpdateVotationIndexesMutation = { __typename?: 'Mutation', updateVotationIndexes?: Array<{ __typename?: 'Votation', id: string, index: number } | null> | null };

export type StartNextVotationMutationVariables = Exact<{
  meetingId: Scalars['String'];
}>;


export type StartNextVotationMutation = { __typename?: 'Mutation', startNextVotation?: { __typename: 'MaxOneOpenVotationError', message: string } | { __typename: 'NoUpcomingVotations', message: string } | { __typename: 'OpenedVotation', votationId: string, title: string } | { __typename: 'VotationHasNoAlternatives', message: string } | null };

export type UpdateVotationsMutationVariables = Exact<{
  votations: Array<UpdateVotationInput> | UpdateVotationInput;
  meetingId: Scalars['String'];
}>;


export type UpdateVotationsMutation = { __typename?: 'Mutation', updateVotations?: Array<{ __typename?: 'Votation', id: string, title: string, description?: string | null, blankVotes: boolean, index: number, hiddenVotes: boolean, type: VotationType, numberOfWinners: number, majorityThreshold: number, status: VotationStatus, alternatives?: Array<{ __typename?: 'Alternative', id: string, text: string, index: number } | null> | null } | null> | null };

export type DeleteVotationMutationVariables = Exact<{
  votationId: Scalars['String'];
}>;


export type DeleteVotationMutation = { __typename?: 'Mutation', deleteVotation?: string | null };

export type DeleteAlternativesMutationVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteAlternativesMutation = { __typename?: 'Mutation', deleteAlternatives?: Array<string | null> | null };

export type CastVoteMutationVariables = Exact<{
  alternativeId: Scalars['String'];
}>;


export type CastVoteMutation = { __typename?: 'Mutation', castVote?: { __typename?: 'Vote', alternative?: { __typename?: 'Alternative', text: string } | null } | null };

export type CastBlankVoteMutationVariables = Exact<{
  votationId: Scalars['String'];
}>;


export type CastBlankVoteMutation = { __typename?: 'Mutation', castBlankVote?: string | null };

export type CastStvVoteMutationVariables = Exact<{
  votationId: Scalars['String'];
  alternatives: Array<StvVoteAlternativeInput> | StvVoteAlternativeInput;
}>;


export type CastStvVoteMutation = { __typename?: 'Mutation', castStvVote?: string | null };

export type UpdateVotationStatusMutationVariables = Exact<{
  votationId: Scalars['String'];
  status: VotationStatus;
}>;


export type UpdateVotationStatusMutation = { __typename?: 'Mutation', updateVotationStatus?: { __typename?: 'Votation', title: string, status: VotationStatus } | null };

export type CastVotationReviewMutationVariables = Exact<{
  votationId: Scalars['String'];
  approved: Scalars['Boolean'];
}>;


export type CastVotationReviewMutation = { __typename?: 'Mutation', reviewVotation?: string | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, email: string } | { __typename?: 'UserNotFoundError', message: string } | null };

export type GetMeetingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeetingsQuery = { __typename?: 'Query', meetings: Array<{ __typename?: 'Meeting', id: string, title: string, description?: string | null, organization: string, status: MeetingStatus, startTime: any, owner?: { __typename?: 'User', id: string, email: string } | null, participants: Array<{ __typename?: 'Participant', role: Role, user?: { __typename?: 'User', id: string } | null } | null> } | null> };

export type GetParticipantQueryVariables = Exact<{
  meetingId: Scalars['String'];
}>;


export type GetParticipantQuery = { __typename?: 'Query', myParticipant?: { __typename?: 'ParticipantOrInvite', role: Role, isVotingEligible: boolean } | null };

export type GetMeetingByIdQueryVariables = Exact<{
  meetingId: Scalars['String'];
}>;


export type GetMeetingByIdQuery = { __typename?: 'Query', meetingById?: { __typename?: 'Meeting', id: string, title: string, description?: string | null, organization: string, status: MeetingStatus, startTime: any, allowSelfRegistration: boolean, owner?: { __typename?: 'User', id: string, email: string } | null } | null };

export type GetAllowSelfRegistrationQueryVariables = Exact<{
  meetingId: Scalars['String'];
}>;


export type GetAllowSelfRegistrationQuery = { __typename?: 'Query', meetingById?: { __typename?: 'Meeting', allowSelfRegistration: boolean } | null };

export type GetParticipantsByMeetingIdQueryVariables = Exact<{
  meetingId: Scalars['String'];
}>;


export type GetParticipantsByMeetingIdQuery = { __typename?: 'Query', participants?: Array<{ __typename?: 'ParticipantOrInvite', email: string, role: Role, isVotingEligible: boolean } | null> | null };

export type StvRoundResultFieldsFragment = { __typename?: 'StvRoundResult', index: number, winners: Array<{ __typename?: 'Alternative', votationId: string, id: string, index: number, text: string }>, losers: Array<{ __typename?: 'Alternative', text: string, id: string, index: number }>, alternativesWithRoundVoteCount: Array<{ __typename?: 'AlternativeRoundVoteCount', voteCount: number, alternative: { __typename?: 'Alternative', id: string, index: number, text: string } }> };

export type AlternativeResultFieldsFragment = { __typename?: 'AlternativeResult', id: string, text: string, index: number, isWinner: boolean, votes: number };

export type GetVotationByIdQueryVariables = Exact<{
  votationId: Scalars['String'];
}>;


export type GetVotationByIdQuery = { __typename?: 'Query', votationById?: { __typename?: 'Votation', id: string, title: string, description?: string | null, index: number, hasVoted?: Array<string | null> | null, status: VotationStatus, blankVotes: boolean, hiddenVotes: boolean, type: VotationType, numberOfWinners: number, majorityThreshold: number, meetingId: string, alternatives?: Array<{ __typename?: 'Alternative', id: string, text: string, index: number, votationId: string } | null> | null } | null, getVoteCount?: { __typename?: 'VoteCountResult', votingEligibleCount: number, voteCount: number } | null };

export type GetMeetingForLobbyQueryVariables = Exact<{
  meetingId: Scalars['String'];
}>;


export type GetMeetingForLobbyQuery = { __typename?: 'Query', getOpenVotation?: string | null, numberOfUpcomingVotations?: number | null, meetingById?: { __typename?: 'Meeting', id: string, title: string, allowSelfRegistration: boolean, owner?: { __typename?: 'User', email: string } | null } | null };

export type VotationsByMeetingIdQueryVariables = Exact<{
  meetingId: Scalars['String'];
}>;


export type VotationsByMeetingIdQuery = { __typename?: 'Query', meetingById?: { __typename?: 'Meeting', id: string, title: string, owner?: { __typename?: 'User', email: string } | null, votations?: Array<{ __typename?: 'Votation', id: string, title: string, status: VotationStatus, description?: string | null, blankVotes: boolean, hiddenVotes: boolean, type: VotationType, numberOfWinners: number, majorityThreshold: number, index: number, alternatives?: Array<{ __typename?: 'Alternative', id: string, text: string, index: number } | null> | null } | null> | null } | null, resultsOfPublishedVotations?: Array<{ __typename?: 'VotationWithWinner', id: string, alternatives: Array<{ __typename?: 'AlternativeWithWinner', id: string, text: string, index: number, isWinner: boolean } | null> } | null> | null };

export type GetVoteCountQueryVariables = Exact<{
  votationId: Scalars['String'];
}>;


export type GetVoteCountQuery = { __typename?: 'Query', getVoteCount?: { __typename?: 'VoteCountResult', votingEligibleCount: number, voteCount: number } | null };

export type GetVotationResultsQueryVariables = Exact<{
  votationId: Scalars['String'];
}>;


export type GetVotationResultsQuery = { __typename?: 'Query', getVotationResults?: { __typename?: 'VotationResults', id: string, voteCount: number, votingEligibleCount: number, blankVoteCount: number, alternatives: Array<{ __typename?: 'AlternativeResult', id: string, text: string, index: number, isWinner: boolean, votes: number }> } | null, getStvResult?: { __typename?: 'StvResult', votationId: string, voteCount: number, votingEligibleCount: number, quota: number, alternatives: Array<{ __typename?: 'AlternativeResult', id: string, text: string, index: number, isWinner: boolean, votes: number }>, stvRoundResults: Array<{ __typename?: 'StvRoundResult', index: number, winners: Array<{ __typename?: 'Alternative', votationId: string, id: string, index: number, text: string }>, losers: Array<{ __typename?: 'Alternative', text: string, id: string, index: number }>, alternativesWithRoundVoteCount: Array<{ __typename?: 'AlternativeRoundVoteCount', voteCount: number, alternative: { __typename?: 'Alternative', id: string, index: number, text: string } }> }> } | null, result?: { __typename?: 'Result', votationId: string, voteCount: number, votingEligibleCount: number, blankVoteCount?: number | null, quota?: number | null, alternatives: Array<{ __typename?: 'AlternativeResult', id: string, text: string, index: number, isWinner: boolean, votes: number }>, stvRoundResults?: Array<{ __typename?: 'StvRoundResult', index: number, winners: Array<{ __typename?: 'Alternative', votationId: string, id: string, index: number, text: string }>, losers: Array<{ __typename?: 'Alternative', text: string, id: string, index: number }>, alternativesWithRoundVoteCount: Array<{ __typename?: 'AlternativeRoundVoteCount', voteCount: number, alternative: { __typename?: 'Alternative', id: string, index: number, text: string } }> }> | null } | null };

export type GetWinnerOfVotationQueryVariables = Exact<{
  votationId: Scalars['String'];
}>;


export type GetWinnerOfVotationQuery = { __typename?: 'Query', getWinnerOfVotation?: Array<{ __typename?: 'Alternative', id: string, text: string, votationId: string } | null> | null };

export type GetReviewsQueryVariables = Exact<{
  votationId: Scalars['String'];
}>;


export type GetReviewsQuery = { __typename?: 'Query', getReviews?: { __typename?: 'ReviewResult', approved: number, disapproved: number } | null, getMyReview?: { __typename?: 'NoReview', message: string } | { __typename?: 'VotationReview', approved: boolean } | null };

export type ParticipantUpdatedSubscriptionVariables = Exact<{
  userId: Scalars['String'];
  meetingId: Scalars['String'];
}>;


export type ParticipantUpdatedSubscription = { __typename?: 'Subscription', participantUpdated?: { __typename?: 'ParticipantUpdatedResponse', role: Role, isVotingEligible: boolean } | null };

export type VotationStatusUpdatedSubscriptionVariables = Exact<{
  id: Scalars['String'];
}>;


export type VotationStatusUpdatedSubscription = { __typename?: 'Subscription', votationStatusUpdated?: { __typename?: 'VotationStatusUpdatedResponse', votationId: string, votationStatus: VotationStatus } | null };

export type NewVoteRegisteredSubscriptionVariables = Exact<{
  votationId: Scalars['String'];
}>;


export type NewVoteRegisteredSubscription = { __typename?: 'Subscription', newVoteRegistered?: { __typename?: 'NewVoteRegisteredResponse', votationId: string, voteCount: number, votingEligibleCount: number } | null };

export type VotationOpenedForMeetingSubscriptionVariables = Exact<{
  meetingId: Scalars['String'];
}>;


export type VotationOpenedForMeetingSubscription = { __typename?: 'Subscription', votationOpenedForMeeting?: string | null };

export type ReviewAddedSubscriptionVariables = Exact<{
  votationId: Scalars['String'];
}>;


export type ReviewAddedSubscription = { __typename?: 'Subscription', reviewAdded?: { __typename?: 'ReviewResult', approved: number, disapproved: number } | null };

export type VotationsUpdatedSubscriptionVariables = Exact<{
  meetingId: Scalars['String'];
}>;


export type VotationsUpdatedSubscription = { __typename?: 'Subscription', votationsUpdated?: Array<{ __typename?: 'VotationWithAlternative', id: string, title: string, description?: string | null, index: number, status: VotationStatus, blankVotes: boolean, hiddenVotes: boolean, type: VotationType, numberOfWinners: number, majorityThreshold: number, alternatives?: Array<{ __typename?: 'Alternative', id: string, text: string, index: number } | null> | null } | null> | null };

export type VotationDeletedSubscriptionVariables = Exact<{
  meetingId: Scalars['String'];
}>;


export type VotationDeletedSubscription = { __typename?: 'Subscription', votationDeleted?: string | null };

export const StvRoundResultFieldsFragmentDoc = gql`
    fragment StvRoundResultFields on StvRoundResult {
  index
  winners {
    votationId
    id
    index
    text
  }
  losers {
    text
    id
    index
  }
  alternativesWithRoundVoteCount {
    alternative {
      id
      index
      text
    }
    voteCount
  }
}
    `;
export const AlternativeResultFieldsFragmentDoc = gql`
    fragment AlternativeResultFields on AlternativeResult {
  id
  text
  index
  isWinner
  votes
}
    `;
export const CreateMeetingDocument = gql`
    mutation CreateMeeting($meeting: CreateMeetingInput!) {
  createMeeting(meeting: $meeting) {
    id
    title
    organization
    startTime
    description
    status
    allowSelfRegistration
  }
}
    `;
export type CreateMeetingMutationFn = Apollo.MutationFunction<CreateMeetingMutation, CreateMeetingMutationVariables>;

/**
 * __useCreateMeetingMutation__
 *
 * To run a mutation, you first call `useCreateMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMeetingMutation, { data, loading, error }] = useCreateMeetingMutation({
 *   variables: {
 *      meeting: // value for 'meeting'
 *   },
 * });
 */
export function useCreateMeetingMutation(baseOptions?: Apollo.MutationHookOptions<CreateMeetingMutation, CreateMeetingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMeetingMutation, CreateMeetingMutationVariables>(CreateMeetingDocument, options);
      }
export type CreateMeetingMutationHookResult = ReturnType<typeof useCreateMeetingMutation>;
export type CreateMeetingMutationResult = Apollo.MutationResult<CreateMeetingMutation>;
export type CreateMeetingMutationOptions = Apollo.BaseMutationOptions<CreateMeetingMutation, CreateMeetingMutationVariables>;
export const UpdateMeetingDocument = gql`
    mutation UpdateMeeting($meeting: UpdateMeetingInput!) {
  updateMeeting(meeting: $meeting) {
    id
    title
    organization
    startTime
    description
    status
    allowSelfRegistration
  }
}
    `;
export type UpdateMeetingMutationFn = Apollo.MutationFunction<UpdateMeetingMutation, UpdateMeetingMutationVariables>;

/**
 * __useUpdateMeetingMutation__
 *
 * To run a mutation, you first call `useUpdateMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeetingMutation, { data, loading, error }] = useUpdateMeetingMutation({
 *   variables: {
 *      meeting: // value for 'meeting'
 *   },
 * });
 */
export function useUpdateMeetingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeetingMutation, UpdateMeetingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeetingMutation, UpdateMeetingMutationVariables>(UpdateMeetingDocument, options);
      }
export type UpdateMeetingMutationHookResult = ReturnType<typeof useUpdateMeetingMutation>;
export type UpdateMeetingMutationResult = Apollo.MutationResult<UpdateMeetingMutation>;
export type UpdateMeetingMutationOptions = Apollo.BaseMutationOptions<UpdateMeetingMutation, UpdateMeetingMutationVariables>;
export const AddParticipantsDocument = gql`
    mutation AddParticipants($meetingId: String!, $participants: [ParticipantInput!]!) {
  addParticipants(meetingId: $meetingId, participants: $participants)
}
    `;
export type AddParticipantsMutationFn = Apollo.MutationFunction<AddParticipantsMutation, AddParticipantsMutationVariables>;

/**
 * __useAddParticipantsMutation__
 *
 * To run a mutation, you first call `useAddParticipantsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddParticipantsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addParticipantsMutation, { data, loading, error }] = useAddParticipantsMutation({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *      participants: // value for 'participants'
 *   },
 * });
 */
export function useAddParticipantsMutation(baseOptions?: Apollo.MutationHookOptions<AddParticipantsMutation, AddParticipantsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddParticipantsMutation, AddParticipantsMutationVariables>(AddParticipantsDocument, options);
      }
export type AddParticipantsMutationHookResult = ReturnType<typeof useAddParticipantsMutation>;
export type AddParticipantsMutationResult = Apollo.MutationResult<AddParticipantsMutation>;
export type AddParticipantsMutationOptions = Apollo.BaseMutationOptions<AddParticipantsMutation, AddParticipantsMutationVariables>;
export const UpdateParticipantDocument = gql`
    mutation UpdateParticipant($meetingId: String!, $participant: ParticipantInput!) {
  updateParticipant(meetingId: $meetingId, participant: $participant) {
    email
    role
    isVotingEligible
  }
}
    `;
export type UpdateParticipantMutationFn = Apollo.MutationFunction<UpdateParticipantMutation, UpdateParticipantMutationVariables>;

/**
 * __useUpdateParticipantMutation__
 *
 * To run a mutation, you first call `useUpdateParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateParticipantMutation, { data, loading, error }] = useUpdateParticipantMutation({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *      participant: // value for 'participant'
 *   },
 * });
 */
export function useUpdateParticipantMutation(baseOptions?: Apollo.MutationHookOptions<UpdateParticipantMutation, UpdateParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateParticipantMutation, UpdateParticipantMutationVariables>(UpdateParticipantDocument, options);
      }
export type UpdateParticipantMutationHookResult = ReturnType<typeof useUpdateParticipantMutation>;
export type UpdateParticipantMutationResult = Apollo.MutationResult<UpdateParticipantMutation>;
export type UpdateParticipantMutationOptions = Apollo.BaseMutationOptions<UpdateParticipantMutation, UpdateParticipantMutationVariables>;
export const DeleteParticipantsDocument = gql`
    mutation DeleteParticipants($meetingId: String!, $emails: [String!]!) {
  deleteParticipants(meetingId: $meetingId, emails: $emails)
}
    `;
export type DeleteParticipantsMutationFn = Apollo.MutationFunction<DeleteParticipantsMutation, DeleteParticipantsMutationVariables>;

/**
 * __useDeleteParticipantsMutation__
 *
 * To run a mutation, you first call `useDeleteParticipantsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteParticipantsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteParticipantsMutation, { data, loading, error }] = useDeleteParticipantsMutation({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *      emails: // value for 'emails'
 *   },
 * });
 */
export function useDeleteParticipantsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteParticipantsMutation, DeleteParticipantsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteParticipantsMutation, DeleteParticipantsMutationVariables>(DeleteParticipantsDocument, options);
      }
export type DeleteParticipantsMutationHookResult = ReturnType<typeof useDeleteParticipantsMutation>;
export type DeleteParticipantsMutationResult = Apollo.MutationResult<DeleteParticipantsMutation>;
export type DeleteParticipantsMutationOptions = Apollo.BaseMutationOptions<DeleteParticipantsMutation, DeleteParticipantsMutationVariables>;
export const DeleteMeetingDocument = gql`
    mutation DeleteMeeting($id: String!) {
  deleteMeeting(id: $id) {
    id
  }
}
    `;
export type DeleteMeetingMutationFn = Apollo.MutationFunction<DeleteMeetingMutation, DeleteMeetingMutationVariables>;

/**
 * __useDeleteMeetingMutation__
 *
 * To run a mutation, you first call `useDeleteMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMeetingMutation, { data, loading, error }] = useDeleteMeetingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMeetingMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMeetingMutation, DeleteMeetingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMeetingMutation, DeleteMeetingMutationVariables>(DeleteMeetingDocument, options);
      }
export type DeleteMeetingMutationHookResult = ReturnType<typeof useDeleteMeetingMutation>;
export type DeleteMeetingMutationResult = Apollo.MutationResult<DeleteMeetingMutation>;
export type DeleteMeetingMutationOptions = Apollo.BaseMutationOptions<DeleteMeetingMutation, DeleteMeetingMutationVariables>;
export const RegisterAsParticipantDocument = gql`
    mutation RegisterAsParticipant($meetingId: String!) {
  registerAsParticipant(meetingId: $meetingId) {
    role
    isVotingEligible
  }
}
    `;
export type RegisterAsParticipantMutationFn = Apollo.MutationFunction<RegisterAsParticipantMutation, RegisterAsParticipantMutationVariables>;

/**
 * __useRegisterAsParticipantMutation__
 *
 * To run a mutation, you first call `useRegisterAsParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterAsParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerAsParticipantMutation, { data, loading, error }] = useRegisterAsParticipantMutation({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useRegisterAsParticipantMutation(baseOptions?: Apollo.MutationHookOptions<RegisterAsParticipantMutation, RegisterAsParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterAsParticipantMutation, RegisterAsParticipantMutationVariables>(RegisterAsParticipantDocument, options);
      }
export type RegisterAsParticipantMutationHookResult = ReturnType<typeof useRegisterAsParticipantMutation>;
export type RegisterAsParticipantMutationResult = Apollo.MutationResult<RegisterAsParticipantMutation>;
export type RegisterAsParticipantMutationOptions = Apollo.BaseMutationOptions<RegisterAsParticipantMutation, RegisterAsParticipantMutationVariables>;
export const CreateVotationsDocument = gql`
    mutation CreateVotations($meetingId: String!, $votations: [CreateVotationInput!]!) {
  createVotations(meetingId: $meetingId, votations: $votations) {
    id
    meetingId
    title
    description
    index
    blankVotes
    status
    hiddenVotes
    type
    numberOfWinners
    majorityThreshold
    alternatives {
      id
      text
      index
    }
  }
}
    `;
export type CreateVotationsMutationFn = Apollo.MutationFunction<CreateVotationsMutation, CreateVotationsMutationVariables>;

/**
 * __useCreateVotationsMutation__
 *
 * To run a mutation, you first call `useCreateVotationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVotationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVotationsMutation, { data, loading, error }] = useCreateVotationsMutation({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *      votations: // value for 'votations'
 *   },
 * });
 */
export function useCreateVotationsMutation(baseOptions?: Apollo.MutationHookOptions<CreateVotationsMutation, CreateVotationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVotationsMutation, CreateVotationsMutationVariables>(CreateVotationsDocument, options);
      }
export type CreateVotationsMutationHookResult = ReturnType<typeof useCreateVotationsMutation>;
export type CreateVotationsMutationResult = Apollo.MutationResult<CreateVotationsMutation>;
export type CreateVotationsMutationOptions = Apollo.BaseMutationOptions<CreateVotationsMutation, CreateVotationsMutationVariables>;
export const UpdateVotationIndexesDocument = gql`
    mutation UpdateVotationIndexes($votations: [UpdateVotationIndexInput!]!, $meetingId: String!) {
  updateVotationIndexes(votations: $votations, meetingId: $meetingId) {
    id
    index
  }
}
    `;
export type UpdateVotationIndexesMutationFn = Apollo.MutationFunction<UpdateVotationIndexesMutation, UpdateVotationIndexesMutationVariables>;

/**
 * __useUpdateVotationIndexesMutation__
 *
 * To run a mutation, you first call `useUpdateVotationIndexesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVotationIndexesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVotationIndexesMutation, { data, loading, error }] = useUpdateVotationIndexesMutation({
 *   variables: {
 *      votations: // value for 'votations'
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useUpdateVotationIndexesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVotationIndexesMutation, UpdateVotationIndexesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVotationIndexesMutation, UpdateVotationIndexesMutationVariables>(UpdateVotationIndexesDocument, options);
      }
export type UpdateVotationIndexesMutationHookResult = ReturnType<typeof useUpdateVotationIndexesMutation>;
export type UpdateVotationIndexesMutationResult = Apollo.MutationResult<UpdateVotationIndexesMutation>;
export type UpdateVotationIndexesMutationOptions = Apollo.BaseMutationOptions<UpdateVotationIndexesMutation, UpdateVotationIndexesMutationVariables>;
export const StartNextVotationDocument = gql`
    mutation StartNextVotation($meetingId: String!) {
  startNextVotation(meetingId: $meetingId) {
    __typename
    ... on MaxOneOpenVotationError {
      message
    }
    ... on NoUpcomingVotations {
      message
    }
    ... on VotationHasNoAlternatives {
      message
    }
    ... on OpenedVotation {
      votationId
      title
    }
  }
}
    `;
export type StartNextVotationMutationFn = Apollo.MutationFunction<StartNextVotationMutation, StartNextVotationMutationVariables>;

/**
 * __useStartNextVotationMutation__
 *
 * To run a mutation, you first call `useStartNextVotationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartNextVotationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startNextVotationMutation, { data, loading, error }] = useStartNextVotationMutation({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useStartNextVotationMutation(baseOptions?: Apollo.MutationHookOptions<StartNextVotationMutation, StartNextVotationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartNextVotationMutation, StartNextVotationMutationVariables>(StartNextVotationDocument, options);
      }
export type StartNextVotationMutationHookResult = ReturnType<typeof useStartNextVotationMutation>;
export type StartNextVotationMutationResult = Apollo.MutationResult<StartNextVotationMutation>;
export type StartNextVotationMutationOptions = Apollo.BaseMutationOptions<StartNextVotationMutation, StartNextVotationMutationVariables>;
export const UpdateVotationsDocument = gql`
    mutation UpdateVotations($votations: [UpdateVotationInput!]!, $meetingId: String!) {
  updateVotations(votations: $votations, meetingId: $meetingId) {
    id
    title
    description
    blankVotes
    index
    hiddenVotes
    type
    numberOfWinners
    majorityThreshold
    status
    alternatives {
      id
      text
      index
    }
  }
}
    `;
export type UpdateVotationsMutationFn = Apollo.MutationFunction<UpdateVotationsMutation, UpdateVotationsMutationVariables>;

/**
 * __useUpdateVotationsMutation__
 *
 * To run a mutation, you first call `useUpdateVotationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVotationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVotationsMutation, { data, loading, error }] = useUpdateVotationsMutation({
 *   variables: {
 *      votations: // value for 'votations'
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useUpdateVotationsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVotationsMutation, UpdateVotationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVotationsMutation, UpdateVotationsMutationVariables>(UpdateVotationsDocument, options);
      }
export type UpdateVotationsMutationHookResult = ReturnType<typeof useUpdateVotationsMutation>;
export type UpdateVotationsMutationResult = Apollo.MutationResult<UpdateVotationsMutation>;
export type UpdateVotationsMutationOptions = Apollo.BaseMutationOptions<UpdateVotationsMutation, UpdateVotationsMutationVariables>;
export const DeleteVotationDocument = gql`
    mutation DeleteVotation($votationId: String!) {
  deleteVotation(votationId: $votationId)
}
    `;
export type DeleteVotationMutationFn = Apollo.MutationFunction<DeleteVotationMutation, DeleteVotationMutationVariables>;

/**
 * __useDeleteVotationMutation__
 *
 * To run a mutation, you first call `useDeleteVotationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVotationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVotationMutation, { data, loading, error }] = useDeleteVotationMutation({
 *   variables: {
 *      votationId: // value for 'votationId'
 *   },
 * });
 */
export function useDeleteVotationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVotationMutation, DeleteVotationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteVotationMutation, DeleteVotationMutationVariables>(DeleteVotationDocument, options);
      }
export type DeleteVotationMutationHookResult = ReturnType<typeof useDeleteVotationMutation>;
export type DeleteVotationMutationResult = Apollo.MutationResult<DeleteVotationMutation>;
export type DeleteVotationMutationOptions = Apollo.BaseMutationOptions<DeleteVotationMutation, DeleteVotationMutationVariables>;
export const DeleteAlternativesDocument = gql`
    mutation DeleteAlternatives($ids: [String!]!) {
  deleteAlternatives(ids: $ids)
}
    `;
export type DeleteAlternativesMutationFn = Apollo.MutationFunction<DeleteAlternativesMutation, DeleteAlternativesMutationVariables>;

/**
 * __useDeleteAlternativesMutation__
 *
 * To run a mutation, you first call `useDeleteAlternativesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAlternativesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAlternativesMutation, { data, loading, error }] = useDeleteAlternativesMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteAlternativesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAlternativesMutation, DeleteAlternativesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAlternativesMutation, DeleteAlternativesMutationVariables>(DeleteAlternativesDocument, options);
      }
export type DeleteAlternativesMutationHookResult = ReturnType<typeof useDeleteAlternativesMutation>;
export type DeleteAlternativesMutationResult = Apollo.MutationResult<DeleteAlternativesMutation>;
export type DeleteAlternativesMutationOptions = Apollo.BaseMutationOptions<DeleteAlternativesMutation, DeleteAlternativesMutationVariables>;
export const CastVoteDocument = gql`
    mutation CastVote($alternativeId: String!) {
  castVote(alternativeId: $alternativeId) {
    alternative {
      text
    }
  }
}
    `;
export type CastVoteMutationFn = Apollo.MutationFunction<CastVoteMutation, CastVoteMutationVariables>;

/**
 * __useCastVoteMutation__
 *
 * To run a mutation, you first call `useCastVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCastVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [castVoteMutation, { data, loading, error }] = useCastVoteMutation({
 *   variables: {
 *      alternativeId: // value for 'alternativeId'
 *   },
 * });
 */
export function useCastVoteMutation(baseOptions?: Apollo.MutationHookOptions<CastVoteMutation, CastVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CastVoteMutation, CastVoteMutationVariables>(CastVoteDocument, options);
      }
export type CastVoteMutationHookResult = ReturnType<typeof useCastVoteMutation>;
export type CastVoteMutationResult = Apollo.MutationResult<CastVoteMutation>;
export type CastVoteMutationOptions = Apollo.BaseMutationOptions<CastVoteMutation, CastVoteMutationVariables>;
export const CastBlankVoteDocument = gql`
    mutation CastBlankVote($votationId: String!) {
  castBlankVote(votationId: $votationId)
}
    `;
export type CastBlankVoteMutationFn = Apollo.MutationFunction<CastBlankVoteMutation, CastBlankVoteMutationVariables>;

/**
 * __useCastBlankVoteMutation__
 *
 * To run a mutation, you first call `useCastBlankVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCastBlankVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [castBlankVoteMutation, { data, loading, error }] = useCastBlankVoteMutation({
 *   variables: {
 *      votationId: // value for 'votationId'
 *   },
 * });
 */
export function useCastBlankVoteMutation(baseOptions?: Apollo.MutationHookOptions<CastBlankVoteMutation, CastBlankVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CastBlankVoteMutation, CastBlankVoteMutationVariables>(CastBlankVoteDocument, options);
      }
export type CastBlankVoteMutationHookResult = ReturnType<typeof useCastBlankVoteMutation>;
export type CastBlankVoteMutationResult = Apollo.MutationResult<CastBlankVoteMutation>;
export type CastBlankVoteMutationOptions = Apollo.BaseMutationOptions<CastBlankVoteMutation, CastBlankVoteMutationVariables>;
export const CastStvVoteDocument = gql`
    mutation CastStvVote($votationId: String!, $alternatives: [StvVoteAlternativeInput!]!) {
  castStvVote(votationId: $votationId, alternatives: $alternatives)
}
    `;
export type CastStvVoteMutationFn = Apollo.MutationFunction<CastStvVoteMutation, CastStvVoteMutationVariables>;

/**
 * __useCastStvVoteMutation__
 *
 * To run a mutation, you first call `useCastStvVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCastStvVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [castStvVoteMutation, { data, loading, error }] = useCastStvVoteMutation({
 *   variables: {
 *      votationId: // value for 'votationId'
 *      alternatives: // value for 'alternatives'
 *   },
 * });
 */
export function useCastStvVoteMutation(baseOptions?: Apollo.MutationHookOptions<CastStvVoteMutation, CastStvVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CastStvVoteMutation, CastStvVoteMutationVariables>(CastStvVoteDocument, options);
      }
export type CastStvVoteMutationHookResult = ReturnType<typeof useCastStvVoteMutation>;
export type CastStvVoteMutationResult = Apollo.MutationResult<CastStvVoteMutation>;
export type CastStvVoteMutationOptions = Apollo.BaseMutationOptions<CastStvVoteMutation, CastStvVoteMutationVariables>;
export const UpdateVotationStatusDocument = gql`
    mutation UpdateVotationStatus($votationId: String!, $status: VotationStatus!) {
  updateVotationStatus(votationId: $votationId, status: $status) {
    title
    status
  }
}
    `;
export type UpdateVotationStatusMutationFn = Apollo.MutationFunction<UpdateVotationStatusMutation, UpdateVotationStatusMutationVariables>;

/**
 * __useUpdateVotationStatusMutation__
 *
 * To run a mutation, you first call `useUpdateVotationStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVotationStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVotationStatusMutation, { data, loading, error }] = useUpdateVotationStatusMutation({
 *   variables: {
 *      votationId: // value for 'votationId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateVotationStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVotationStatusMutation, UpdateVotationStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVotationStatusMutation, UpdateVotationStatusMutationVariables>(UpdateVotationStatusDocument, options);
      }
export type UpdateVotationStatusMutationHookResult = ReturnType<typeof useUpdateVotationStatusMutation>;
export type UpdateVotationStatusMutationResult = Apollo.MutationResult<UpdateVotationStatusMutation>;
export type UpdateVotationStatusMutationOptions = Apollo.BaseMutationOptions<UpdateVotationStatusMutation, UpdateVotationStatusMutationVariables>;
export const CastVotationReviewDocument = gql`
    mutation CastVotationReview($votationId: String!, $approved: Boolean!) {
  reviewVotation(votationId: $votationId, approved: $approved)
}
    `;
export type CastVotationReviewMutationFn = Apollo.MutationFunction<CastVotationReviewMutation, CastVotationReviewMutationVariables>;

/**
 * __useCastVotationReviewMutation__
 *
 * To run a mutation, you first call `useCastVotationReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCastVotationReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [castVotationReviewMutation, { data, loading, error }] = useCastVotationReviewMutation({
 *   variables: {
 *      votationId: // value for 'votationId'
 *      approved: // value for 'approved'
 *   },
 * });
 */
export function useCastVotationReviewMutation(baseOptions?: Apollo.MutationHookOptions<CastVotationReviewMutation, CastVotationReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CastVotationReviewMutation, CastVotationReviewMutationVariables>(CastVotationReviewDocument, options);
      }
export type CastVotationReviewMutationHookResult = ReturnType<typeof useCastVotationReviewMutation>;
export type CastVotationReviewMutationResult = Apollo.MutationResult<CastVotationReviewMutation>;
export type CastVotationReviewMutationOptions = Apollo.BaseMutationOptions<CastVotationReviewMutation, CastVotationReviewMutationVariables>;
export const GetUserDocument = gql`
    query GetUser {
  user {
    ... on User {
      id
      email
    }
    ... on UserNotFoundError {
      message
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetMeetingsDocument = gql`
    query GetMeetings {
  meetings {
    id
    title
    description
    owner {
      id
      email
    }
    organization
    status
    startTime
    participants {
      user {
        id
      }
      role
    }
  }
}
    `;

/**
 * __useGetMeetingsQuery__
 *
 * To run a query within a React component, call `useGetMeetingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeetingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeetingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeetingsQuery(baseOptions?: Apollo.QueryHookOptions<GetMeetingsQuery, GetMeetingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeetingsQuery, GetMeetingsQueryVariables>(GetMeetingsDocument, options);
      }
export function useGetMeetingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeetingsQuery, GetMeetingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeetingsQuery, GetMeetingsQueryVariables>(GetMeetingsDocument, options);
        }
export type GetMeetingsQueryHookResult = ReturnType<typeof useGetMeetingsQuery>;
export type GetMeetingsLazyQueryHookResult = ReturnType<typeof useGetMeetingsLazyQuery>;
export type GetMeetingsQueryResult = Apollo.QueryResult<GetMeetingsQuery, GetMeetingsQueryVariables>;
export const GetParticipantDocument = gql`
    query GetParticipant($meetingId: String!) {
  myParticipant(meetingId: $meetingId) {
    role
    isVotingEligible
  }
}
    `;

/**
 * __useGetParticipantQuery__
 *
 * To run a query within a React component, call `useGetParticipantQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetParticipantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetParticipantQuery({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useGetParticipantQuery(baseOptions: Apollo.QueryHookOptions<GetParticipantQuery, GetParticipantQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetParticipantQuery, GetParticipantQueryVariables>(GetParticipantDocument, options);
      }
export function useGetParticipantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetParticipantQuery, GetParticipantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetParticipantQuery, GetParticipantQueryVariables>(GetParticipantDocument, options);
        }
export type GetParticipantQueryHookResult = ReturnType<typeof useGetParticipantQuery>;
export type GetParticipantLazyQueryHookResult = ReturnType<typeof useGetParticipantLazyQuery>;
export type GetParticipantQueryResult = Apollo.QueryResult<GetParticipantQuery, GetParticipantQueryVariables>;
export const GetMeetingByIdDocument = gql`
    query GetMeetingById($meetingId: String!) {
  meetingById(meetingId: $meetingId) {
    id
    title
    description
    owner {
      id
      email
    }
    organization
    status
    startTime
    allowSelfRegistration
  }
}
    `;

/**
 * __useGetMeetingByIdQuery__
 *
 * To run a query within a React component, call `useGetMeetingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeetingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeetingByIdQuery({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useGetMeetingByIdQuery(baseOptions: Apollo.QueryHookOptions<GetMeetingByIdQuery, GetMeetingByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeetingByIdQuery, GetMeetingByIdQueryVariables>(GetMeetingByIdDocument, options);
      }
export function useGetMeetingByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeetingByIdQuery, GetMeetingByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeetingByIdQuery, GetMeetingByIdQueryVariables>(GetMeetingByIdDocument, options);
        }
export type GetMeetingByIdQueryHookResult = ReturnType<typeof useGetMeetingByIdQuery>;
export type GetMeetingByIdLazyQueryHookResult = ReturnType<typeof useGetMeetingByIdLazyQuery>;
export type GetMeetingByIdQueryResult = Apollo.QueryResult<GetMeetingByIdQuery, GetMeetingByIdQueryVariables>;
export const GetAllowSelfRegistrationDocument = gql`
    query GetAllowSelfRegistration($meetingId: String!) {
  meetingById(meetingId: $meetingId) {
    allowSelfRegistration
  }
}
    `;

/**
 * __useGetAllowSelfRegistrationQuery__
 *
 * To run a query within a React component, call `useGetAllowSelfRegistrationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllowSelfRegistrationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllowSelfRegistrationQuery({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useGetAllowSelfRegistrationQuery(baseOptions: Apollo.QueryHookOptions<GetAllowSelfRegistrationQuery, GetAllowSelfRegistrationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllowSelfRegistrationQuery, GetAllowSelfRegistrationQueryVariables>(GetAllowSelfRegistrationDocument, options);
      }
export function useGetAllowSelfRegistrationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllowSelfRegistrationQuery, GetAllowSelfRegistrationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllowSelfRegistrationQuery, GetAllowSelfRegistrationQueryVariables>(GetAllowSelfRegistrationDocument, options);
        }
export type GetAllowSelfRegistrationQueryHookResult = ReturnType<typeof useGetAllowSelfRegistrationQuery>;
export type GetAllowSelfRegistrationLazyQueryHookResult = ReturnType<typeof useGetAllowSelfRegistrationLazyQuery>;
export type GetAllowSelfRegistrationQueryResult = Apollo.QueryResult<GetAllowSelfRegistrationQuery, GetAllowSelfRegistrationQueryVariables>;
export const GetParticipantsByMeetingIdDocument = gql`
    query GetParticipantsByMeetingId($meetingId: String!) {
  participants(meetingId: $meetingId) {
    email
    role
    isVotingEligible
  }
}
    `;

/**
 * __useGetParticipantsByMeetingIdQuery__
 *
 * To run a query within a React component, call `useGetParticipantsByMeetingIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetParticipantsByMeetingIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetParticipantsByMeetingIdQuery({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useGetParticipantsByMeetingIdQuery(baseOptions: Apollo.QueryHookOptions<GetParticipantsByMeetingIdQuery, GetParticipantsByMeetingIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetParticipantsByMeetingIdQuery, GetParticipantsByMeetingIdQueryVariables>(GetParticipantsByMeetingIdDocument, options);
      }
export function useGetParticipantsByMeetingIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetParticipantsByMeetingIdQuery, GetParticipantsByMeetingIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetParticipantsByMeetingIdQuery, GetParticipantsByMeetingIdQueryVariables>(GetParticipantsByMeetingIdDocument, options);
        }
export type GetParticipantsByMeetingIdQueryHookResult = ReturnType<typeof useGetParticipantsByMeetingIdQuery>;
export type GetParticipantsByMeetingIdLazyQueryHookResult = ReturnType<typeof useGetParticipantsByMeetingIdLazyQuery>;
export type GetParticipantsByMeetingIdQueryResult = Apollo.QueryResult<GetParticipantsByMeetingIdQuery, GetParticipantsByMeetingIdQueryVariables>;
export const GetVotationByIdDocument = gql`
    query GetVotationById($votationId: String!) {
  votationById(votationId: $votationId) {
    id
    title
    description
    index
    hasVoted
    alternatives {
      id
      text
      index
      votationId
    }
    status
    blankVotes
    hiddenVotes
    type
    numberOfWinners
    majorityThreshold
    meetingId
  }
  getVoteCount(votationId: $votationId) {
    votingEligibleCount
    voteCount
  }
}
    `;

/**
 * __useGetVotationByIdQuery__
 *
 * To run a query within a React component, call `useGetVotationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVotationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVotationByIdQuery({
 *   variables: {
 *      votationId: // value for 'votationId'
 *   },
 * });
 */
export function useGetVotationByIdQuery(baseOptions: Apollo.QueryHookOptions<GetVotationByIdQuery, GetVotationByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVotationByIdQuery, GetVotationByIdQueryVariables>(GetVotationByIdDocument, options);
      }
export function useGetVotationByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVotationByIdQuery, GetVotationByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVotationByIdQuery, GetVotationByIdQueryVariables>(GetVotationByIdDocument, options);
        }
export type GetVotationByIdQueryHookResult = ReturnType<typeof useGetVotationByIdQuery>;
export type GetVotationByIdLazyQueryHookResult = ReturnType<typeof useGetVotationByIdLazyQuery>;
export type GetVotationByIdQueryResult = Apollo.QueryResult<GetVotationByIdQuery, GetVotationByIdQueryVariables>;
export const GetMeetingForLobbyDocument = gql`
    query GetMeetingForLobby($meetingId: String!) {
  meetingById(meetingId: $meetingId) {
    id
    title
    allowSelfRegistration
    owner {
      email
    }
  }
  getOpenVotation(meetingId: $meetingId)
  numberOfUpcomingVotations(meetingId: $meetingId)
}
    `;

/**
 * __useGetMeetingForLobbyQuery__
 *
 * To run a query within a React component, call `useGetMeetingForLobbyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeetingForLobbyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeetingForLobbyQuery({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useGetMeetingForLobbyQuery(baseOptions: Apollo.QueryHookOptions<GetMeetingForLobbyQuery, GetMeetingForLobbyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeetingForLobbyQuery, GetMeetingForLobbyQueryVariables>(GetMeetingForLobbyDocument, options);
      }
export function useGetMeetingForLobbyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeetingForLobbyQuery, GetMeetingForLobbyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeetingForLobbyQuery, GetMeetingForLobbyQueryVariables>(GetMeetingForLobbyDocument, options);
        }
export type GetMeetingForLobbyQueryHookResult = ReturnType<typeof useGetMeetingForLobbyQuery>;
export type GetMeetingForLobbyLazyQueryHookResult = ReturnType<typeof useGetMeetingForLobbyLazyQuery>;
export type GetMeetingForLobbyQueryResult = Apollo.QueryResult<GetMeetingForLobbyQuery, GetMeetingForLobbyQueryVariables>;
export const VotationsByMeetingIdDocument = gql`
    query VotationsByMeetingId($meetingId: String!) {
  meetingById(meetingId: $meetingId) {
    id
    title
    owner {
      email
    }
    votations {
      id
      title
      status
      description
      blankVotes
      hiddenVotes
      type
      numberOfWinners
      majorityThreshold
      index
      alternatives {
        id
        text
        index
      }
    }
  }
  resultsOfPublishedVotations(meetingId: $meetingId) {
    id
    alternatives {
      id
      text
      index
      isWinner
    }
  }
}
    `;

/**
 * __useVotationsByMeetingIdQuery__
 *
 * To run a query within a React component, call `useVotationsByMeetingIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useVotationsByMeetingIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVotationsByMeetingIdQuery({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useVotationsByMeetingIdQuery(baseOptions: Apollo.QueryHookOptions<VotationsByMeetingIdQuery, VotationsByMeetingIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VotationsByMeetingIdQuery, VotationsByMeetingIdQueryVariables>(VotationsByMeetingIdDocument, options);
      }
export function useVotationsByMeetingIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VotationsByMeetingIdQuery, VotationsByMeetingIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VotationsByMeetingIdQuery, VotationsByMeetingIdQueryVariables>(VotationsByMeetingIdDocument, options);
        }
export type VotationsByMeetingIdQueryHookResult = ReturnType<typeof useVotationsByMeetingIdQuery>;
export type VotationsByMeetingIdLazyQueryHookResult = ReturnType<typeof useVotationsByMeetingIdLazyQuery>;
export type VotationsByMeetingIdQueryResult = Apollo.QueryResult<VotationsByMeetingIdQuery, VotationsByMeetingIdQueryVariables>;
export const GetVoteCountDocument = gql`
    query GetVoteCount($votationId: String!) {
  getVoteCount(votationId: $votationId) {
    votingEligibleCount
    voteCount
  }
}
    `;

/**
 * __useGetVoteCountQuery__
 *
 * To run a query within a React component, call `useGetVoteCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVoteCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVoteCountQuery({
 *   variables: {
 *      votationId: // value for 'votationId'
 *   },
 * });
 */
export function useGetVoteCountQuery(baseOptions: Apollo.QueryHookOptions<GetVoteCountQuery, GetVoteCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVoteCountQuery, GetVoteCountQueryVariables>(GetVoteCountDocument, options);
      }
export function useGetVoteCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVoteCountQuery, GetVoteCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVoteCountQuery, GetVoteCountQueryVariables>(GetVoteCountDocument, options);
        }
export type GetVoteCountQueryHookResult = ReturnType<typeof useGetVoteCountQuery>;
export type GetVoteCountLazyQueryHookResult = ReturnType<typeof useGetVoteCountLazyQuery>;
export type GetVoteCountQueryResult = Apollo.QueryResult<GetVoteCountQuery, GetVoteCountQueryVariables>;
export const GetVotationResultsDocument = gql`
    query GetVotationResults($votationId: String!) {
  getVotationResults(votationId: $votationId) {
    id
    voteCount
    votingEligibleCount
    alternatives {
      ...AlternativeResultFields
    }
    blankVoteCount
  }
  getStvResult(votationId: $votationId) {
    votationId
    voteCount
    votingEligibleCount
    alternatives {
      ...AlternativeResultFields
    }
    quota
    stvRoundResults {
      ...StvRoundResultFields
    }
  }
  result(votationId: $votationId) {
    votationId
    voteCount
    votingEligibleCount
    alternatives {
      ...AlternativeResultFields
    }
    blankVoteCount
    quota
    stvRoundResults {
      ...StvRoundResultFields
    }
  }
}
    ${AlternativeResultFieldsFragmentDoc}
${StvRoundResultFieldsFragmentDoc}`;

/**
 * __useGetVotationResultsQuery__
 *
 * To run a query within a React component, call `useGetVotationResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVotationResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVotationResultsQuery({
 *   variables: {
 *      votationId: // value for 'votationId'
 *   },
 * });
 */
export function useGetVotationResultsQuery(baseOptions: Apollo.QueryHookOptions<GetVotationResultsQuery, GetVotationResultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVotationResultsQuery, GetVotationResultsQueryVariables>(GetVotationResultsDocument, options);
      }
export function useGetVotationResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVotationResultsQuery, GetVotationResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVotationResultsQuery, GetVotationResultsQueryVariables>(GetVotationResultsDocument, options);
        }
export type GetVotationResultsQueryHookResult = ReturnType<typeof useGetVotationResultsQuery>;
export type GetVotationResultsLazyQueryHookResult = ReturnType<typeof useGetVotationResultsLazyQuery>;
export type GetVotationResultsQueryResult = Apollo.QueryResult<GetVotationResultsQuery, GetVotationResultsQueryVariables>;
export const GetWinnerOfVotationDocument = gql`
    query GetWinnerOfVotation($votationId: String!) {
  getWinnerOfVotation(votationId: $votationId) {
    id
    text
    votationId
  }
}
    `;

/**
 * __useGetWinnerOfVotationQuery__
 *
 * To run a query within a React component, call `useGetWinnerOfVotationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWinnerOfVotationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWinnerOfVotationQuery({
 *   variables: {
 *      votationId: // value for 'votationId'
 *   },
 * });
 */
export function useGetWinnerOfVotationQuery(baseOptions: Apollo.QueryHookOptions<GetWinnerOfVotationQuery, GetWinnerOfVotationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWinnerOfVotationQuery, GetWinnerOfVotationQueryVariables>(GetWinnerOfVotationDocument, options);
      }
export function useGetWinnerOfVotationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWinnerOfVotationQuery, GetWinnerOfVotationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWinnerOfVotationQuery, GetWinnerOfVotationQueryVariables>(GetWinnerOfVotationDocument, options);
        }
export type GetWinnerOfVotationQueryHookResult = ReturnType<typeof useGetWinnerOfVotationQuery>;
export type GetWinnerOfVotationLazyQueryHookResult = ReturnType<typeof useGetWinnerOfVotationLazyQuery>;
export type GetWinnerOfVotationQueryResult = Apollo.QueryResult<GetWinnerOfVotationQuery, GetWinnerOfVotationQueryVariables>;
export const GetReviewsDocument = gql`
    query GetReviews($votationId: String!) {
  getReviews(votationId: $votationId) {
    approved
    disapproved
  }
  getMyReview(votationId: $votationId) {
    ... on VotationReview {
      approved
    }
    ... on NoReview {
      message
    }
  }
}
    `;

/**
 * __useGetReviewsQuery__
 *
 * To run a query within a React component, call `useGetReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewsQuery({
 *   variables: {
 *      votationId: // value for 'votationId'
 *   },
 * });
 */
export function useGetReviewsQuery(baseOptions: Apollo.QueryHookOptions<GetReviewsQuery, GetReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReviewsQuery, GetReviewsQueryVariables>(GetReviewsDocument, options);
      }
export function useGetReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewsQuery, GetReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReviewsQuery, GetReviewsQueryVariables>(GetReviewsDocument, options);
        }
export type GetReviewsQueryHookResult = ReturnType<typeof useGetReviewsQuery>;
export type GetReviewsLazyQueryHookResult = ReturnType<typeof useGetReviewsLazyQuery>;
export type GetReviewsQueryResult = Apollo.QueryResult<GetReviewsQuery, GetReviewsQueryVariables>;
export const ParticipantUpdatedDocument = gql`
    subscription ParticipantUpdated($userId: String!, $meetingId: String!) {
  participantUpdated(userId: $userId, meetingId: $meetingId) {
    role
    isVotingEligible
  }
}
    `;

/**
 * __useParticipantUpdatedSubscription__
 *
 * To run a query within a React component, call `useParticipantUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useParticipantUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipantUpdatedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useParticipantUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ParticipantUpdatedSubscription, ParticipantUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ParticipantUpdatedSubscription, ParticipantUpdatedSubscriptionVariables>(ParticipantUpdatedDocument, options);
      }
export type ParticipantUpdatedSubscriptionHookResult = ReturnType<typeof useParticipantUpdatedSubscription>;
export type ParticipantUpdatedSubscriptionResult = Apollo.SubscriptionResult<ParticipantUpdatedSubscription>;
export const VotationStatusUpdatedDocument = gql`
    subscription VotationStatusUpdated($id: String!) {
  votationStatusUpdated(id: $id) {
    votationId
    votationStatus
  }
}
    `;

/**
 * __useVotationStatusUpdatedSubscription__
 *
 * To run a query within a React component, call `useVotationStatusUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useVotationStatusUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVotationStatusUpdatedSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVotationStatusUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<VotationStatusUpdatedSubscription, VotationStatusUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<VotationStatusUpdatedSubscription, VotationStatusUpdatedSubscriptionVariables>(VotationStatusUpdatedDocument, options);
      }
export type VotationStatusUpdatedSubscriptionHookResult = ReturnType<typeof useVotationStatusUpdatedSubscription>;
export type VotationStatusUpdatedSubscriptionResult = Apollo.SubscriptionResult<VotationStatusUpdatedSubscription>;
export const NewVoteRegisteredDocument = gql`
    subscription NewVoteRegistered($votationId: String!) {
  newVoteRegistered(votationId: $votationId) {
    votationId
    voteCount
    votingEligibleCount
  }
}
    `;

/**
 * __useNewVoteRegisteredSubscription__
 *
 * To run a query within a React component, call `useNewVoteRegisteredSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewVoteRegisteredSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewVoteRegisteredSubscription({
 *   variables: {
 *      votationId: // value for 'votationId'
 *   },
 * });
 */
export function useNewVoteRegisteredSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewVoteRegisteredSubscription, NewVoteRegisteredSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewVoteRegisteredSubscription, NewVoteRegisteredSubscriptionVariables>(NewVoteRegisteredDocument, options);
      }
export type NewVoteRegisteredSubscriptionHookResult = ReturnType<typeof useNewVoteRegisteredSubscription>;
export type NewVoteRegisteredSubscriptionResult = Apollo.SubscriptionResult<NewVoteRegisteredSubscription>;
export const VotationOpenedForMeetingDocument = gql`
    subscription VotationOpenedForMeeting($meetingId: String!) {
  votationOpenedForMeeting(meetingId: $meetingId)
}
    `;

/**
 * __useVotationOpenedForMeetingSubscription__
 *
 * To run a query within a React component, call `useVotationOpenedForMeetingSubscription` and pass it any options that fit your needs.
 * When your component renders, `useVotationOpenedForMeetingSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVotationOpenedForMeetingSubscription({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useVotationOpenedForMeetingSubscription(baseOptions: Apollo.SubscriptionHookOptions<VotationOpenedForMeetingSubscription, VotationOpenedForMeetingSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<VotationOpenedForMeetingSubscription, VotationOpenedForMeetingSubscriptionVariables>(VotationOpenedForMeetingDocument, options);
      }
export type VotationOpenedForMeetingSubscriptionHookResult = ReturnType<typeof useVotationOpenedForMeetingSubscription>;
export type VotationOpenedForMeetingSubscriptionResult = Apollo.SubscriptionResult<VotationOpenedForMeetingSubscription>;
export const ReviewAddedDocument = gql`
    subscription ReviewAdded($votationId: String!) {
  reviewAdded(votationId: $votationId) {
    approved
    disapproved
  }
}
    `;

/**
 * __useReviewAddedSubscription__
 *
 * To run a query within a React component, call `useReviewAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useReviewAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewAddedSubscription({
 *   variables: {
 *      votationId: // value for 'votationId'
 *   },
 * });
 */
export function useReviewAddedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ReviewAddedSubscription, ReviewAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ReviewAddedSubscription, ReviewAddedSubscriptionVariables>(ReviewAddedDocument, options);
      }
export type ReviewAddedSubscriptionHookResult = ReturnType<typeof useReviewAddedSubscription>;
export type ReviewAddedSubscriptionResult = Apollo.SubscriptionResult<ReviewAddedSubscription>;
export const VotationsUpdatedDocument = gql`
    subscription VotationsUpdated($meetingId: String!) {
  votationsUpdated(meetingId: $meetingId) {
    id
    title
    description
    index
    status
    blankVotes
    hiddenVotes
    type
    numberOfWinners
    majorityThreshold
    alternatives {
      id
      text
      index
    }
  }
}
    `;

/**
 * __useVotationsUpdatedSubscription__
 *
 * To run a query within a React component, call `useVotationsUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useVotationsUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVotationsUpdatedSubscription({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useVotationsUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<VotationsUpdatedSubscription, VotationsUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<VotationsUpdatedSubscription, VotationsUpdatedSubscriptionVariables>(VotationsUpdatedDocument, options);
      }
export type VotationsUpdatedSubscriptionHookResult = ReturnType<typeof useVotationsUpdatedSubscription>;
export type VotationsUpdatedSubscriptionResult = Apollo.SubscriptionResult<VotationsUpdatedSubscription>;
export const VotationDeletedDocument = gql`
    subscription VotationDeleted($meetingId: String!) {
  votationDeleted(meetingId: $meetingId)
}
    `;

/**
 * __useVotationDeletedSubscription__
 *
 * To run a query within a React component, call `useVotationDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useVotationDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVotationDeletedSubscription({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useVotationDeletedSubscription(baseOptions: Apollo.SubscriptionHookOptions<VotationDeletedSubscription, VotationDeletedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<VotationDeletedSubscription, VotationDeletedSubscriptionVariables>(VotationDeletedDocument, options);
      }
export type VotationDeletedSubscriptionHookResult = ReturnType<typeof useVotationDeletedSubscription>;
export type VotationDeletedSubscriptionResult = Apollo.SubscriptionResult<VotationDeletedSubscription>;