import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  text: Scalars['String'];
  votationId: Scalars['String'];
};

export type AlternativeInput = {
  id: Scalars['String'];
  text: Scalars['String'];
};

export type AlternativeResult = {
  __typename?: 'AlternativeResult';
  id: Scalars['ID'];
  text: Scalars['String'];
  votationId: Scalars['String'];
  isWinner: Scalars['Boolean'];
  votes: Scalars['Int'];
};

export type AlternativeWithWinner = {
  __typename?: 'AlternativeWithWinner';
  id: Scalars['ID'];
  text: Scalars['String'];
  isWinner: Scalars['Boolean'];
};

export type CreateMeetingInput = {
  organization: Scalars['String'];
  title: Scalars['String'];
  startTime: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
};

export type CreateVotationInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  blankVotes: Scalars['Boolean'];
  hiddenVotes: Scalars['Boolean'];
  type: VotationType;
  numberOfWinners: Scalars['Int'];
  majorityThreshold: Scalars['Int'];
  index: Scalars['Int'];
  alternatives?: Maybe<Array<Scalars['String']>>;
};


export type DeleteParticipantResult = Participant | OwnerCannotBeRemovedFromParticipantError;

export type GetUserResult = User | UserNotFoundError;

export type MaxOneOpenVotationError = {
  __typename?: 'MaxOneOpenVotationError';
  message: Scalars['String'];
};

export type Meeting = {
  __typename?: 'Meeting';
  id: Scalars['ID'];
  title: Scalars['String'];
  organization: Scalars['String'];
  startTime: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  votations?: Maybe<Array<Maybe<Votation>>>;
  status: MeetingStatus;
  participants: Array<Maybe<Participant>>;
};

export enum MeetingStatus {
  Upcoming = 'UPCOMING',
  Ongoing = 'ONGOING',
  Ended = 'ENDED'
}

export type Mutation = {
  __typename?: 'Mutation';
  createVotations?: Maybe<Array<Maybe<Votation>>>;
  updateVotations?: Maybe<Array<Maybe<Votation>>>;
  updateVotationStatus?: Maybe<UpdateVotationStatusResult>;
  deleteVotations?: Maybe<Array<Maybe<Scalars['String']>>>;
  createAlternative?: Maybe<Alternative>;
  updateAlternative?: Maybe<Alternative>;
  deleteAlternatives?: Maybe<Array<Maybe<Scalars['String']>>>;
  castVote?: Maybe<Vote>;
  /** Returns the current number of blank votes */
  castBlankVote?: Maybe<Scalars['Int']>;
  createMeeting?: Maybe<Meeting>;
  updateMeeting?: Maybe<Meeting>;
  deleteMeeting?: Maybe<Meeting>;
  addParticipants?: Maybe<Array<Maybe<ParticipantOrInvite>>>;
  deleteParticipants?: Maybe<Array<Maybe<Scalars['String']>>>;
  changeView?: Maybe<ViewState>;
};


export type MutationCreateVotationsArgs = {
  meetingId: Scalars['String'];
  votations: Array<CreateVotationInput>;
};


export type MutationUpdateVotationsArgs = {
  votations: Array<UpdateVotationInput>;
};


export type MutationUpdateVotationStatusArgs = {
  id: Scalars['String'];
  status: VotationStatus;
};


export type MutationDeleteVotationsArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationCreateAlternativeArgs = {
  text: Scalars['String'];
  votationId: Scalars['String'];
};


export type MutationUpdateAlternativeArgs = {
  id: Scalars['String'];
  text: Scalars['String'];
};


export type MutationDeleteAlternativesArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationCastVoteArgs = {
  alternativeId: Scalars['String'];
};


export type MutationCastBlankVoteArgs = {
  votationId: Scalars['String'];
};


export type MutationCreateMeetingArgs = {
  meeting: CreateMeetingInput;
};


export type MutationUpdateMeetingArgs = {
  meeting: UpdateMeetingInput;
};


export type MutationDeleteMeetingArgs = {
  id: Scalars['String'];
};


export type MutationAddParticipantsArgs = {
  meetingId: Scalars['String'];
  participants: Array<ParticipantInput>;
};


export type MutationDeleteParticipantsArgs = {
  meetingId: Scalars['String'];
  emails: Array<Scalars['String']>;
};


export type MutationChangeViewArgs = {
  state: ViewState;
};

export type OwnerCannotBeRemovedFromParticipantError = {
  __typename?: 'OwnerCannotBeRemovedFromParticipantError';
  message: Scalars['String'];
};

export type Participant = {
  __typename?: 'Participant';
  role: Role;
  isVotingEligible: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type ParticipantInput = {
  email: Scalars['String'];
  role: Role;
  isVotingEligible: Scalars['Boolean'];
};

export type ParticipantOrInvite = {
  __typename?: 'ParticipantOrInvite';
  email: Scalars['String'];
  role: Role;
  isVotingEligible: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<GetUserResult>;
  votationById?: Maybe<Votation>;
  alternativesByVotation?: Maybe<Array<Maybe<Alternative>>>;
  getVoteCount?: Maybe<VoteCountResult>;
  getWinnerOfVotation?: Maybe<Alternative>;
  getVotationResults?: Maybe<VotationResults>;
  /** Return the results of all the votations with votationStatus === "PUBLISHED_RESULT" of that meeting */
  resultsOfPublishedVotations?: Maybe<Array<Maybe<VotationWithWinner>>>;
  /** Find meetings you are participating in */
  meetings: Array<Maybe<Meeting>>;
  /** Find a meeting by id from meetings youre participating in */
  meetingById?: Maybe<Meeting>;
  /** Return relevant information about invites and participants connected to meeting */
  participants?: Maybe<Array<Maybe<ParticipantOrInvite>>>;
};


export type QueryVotationByIdArgs = {
  votationId: Scalars['String'];
};


export type QueryAlternativesByVotationArgs = {
  votationId: Scalars['String'];
};


export type QueryGetVoteCountArgs = {
  votationId: Scalars['String'];
};


export type QueryGetWinnerOfVotationArgs = {
  id: Scalars['String'];
};


export type QueryGetVotationResultsArgs = {
  id: Scalars['String'];
};


export type QueryResultsOfPublishedVotationsArgs = {
  meetingId: Scalars['String'];
};


export type QueryMeetingByIdArgs = {
  meetingId: Scalars['String'];
};


export type QueryParticipantsArgs = {
  meetingId: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  Participant = 'PARTICIPANT',
  Counter = 'COUNTER'
}

export type Subscription = {
  __typename?: 'Subscription';
  newVoteRegistered?: Maybe<Scalars['Int']>;
  votationStatusUpdated?: Maybe<VotationStatus>;
  votationOpenedForMeeting?: Maybe<Scalars['String']>;
  viewChanged?: Maybe<ViewState>;
};


export type SubscriptionNewVoteRegisteredArgs = {
  votationId: Scalars['String'];
};


export type SubscriptionVotationStatusUpdatedArgs = {
  id: Scalars['String'];
};


export type SubscriptionVotationOpenedForMeetingArgs = {
  meetingId: Scalars['String'];
};

export type UpdateMeetingInput = {
  id: Scalars['String'];
  organization?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<MeetingStatus>;
};

export type UpdateParticipantInput = {
  email: Scalars['String'];
  role: Role;
  isVotingEligible: Scalars['Boolean'];
  userExists: Scalars['Boolean'];
};

export type UpdateVotationInput = {
  id: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  blankVotes: Scalars['Boolean'];
  hiddenVotes: Scalars['Boolean'];
  type: VotationType;
  numberOfWinners: Scalars['Int'];
  majorityThreshold: Scalars['Int'];
  index: Scalars['Int'];
  alternatives?: Maybe<Array<AlternativeInput>>;
};

export type UpdateVotationStatusResult = Votation | MaxOneOpenVotationError;

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
};

export type UserNotFoundError = {
  __typename?: 'UserNotFoundError';
  message: Scalars['String'];
};

/** The payload of viewChanged subscription */
export type ViewChangedPayload = {
  __typename?: 'ViewChangedPayload';
  viewState: ViewState;
};

/**
 * LOADING: When the votation is loading for a new votation,
 * ONGOING: When the Votation is in process,
 * CLOSED: When the votation has closed and no new votes are allowed,
 * ENDED: When the votation has ended, the result will be announced and then switch to LOADING
 */
export enum ViewState {
  Loading = 'LOADING',
  Ongoing = 'ONGOING',
  Closed = 'CLOSED',
  Ended = 'ENDED'
}

export type Votation = {
  __typename?: 'Votation';
  id: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  status: VotationStatus;
  blankVotes: Scalars['Boolean'];
  hiddenVotes: Scalars['Boolean'];
  type: VotationType;
  numberOfWinners: Scalars['Int'];
  majorityThreshold: Scalars['Int'];
  index: Scalars['Int'];
  meetingId: Scalars['String'];
  hasVoted?: Maybe<Array<Maybe<Scalars['String']>>>;
  alternatives?: Maybe<Array<Maybe<Alternative>>>;
};

/** The results of a votation */
export type VotationResults = {
  __typename?: 'VotationResults';
  alternatives: Array<Maybe<AlternativeResult>>;
  voteCount: Scalars['Int'];
  votingEligibleCount: Scalars['Int'];
};

export enum VotationStatus {
  Upcoming = 'UPCOMING',
  Open = 'OPEN',
  CheckingResult = 'CHECKING_RESULT',
  PublishedResult = 'PUBLISHED_RESULT',
  Invalid = 'INVALID'
}

export enum VotationType {
  Qualified = 'QUALIFIED',
  Simple = 'SIMPLE',
  Stv = 'STV'
}

export type VotationWithWinner = {
  __typename?: 'VotationWithWinner';
  id: Scalars['ID'];
  alternatives: Array<Maybe<AlternativeWithWinner>>;
};

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['ID'];
  alternativeId: Scalars['String'];
  nextVoteId?: Maybe<Scalars['String']>;
  alternative?: Maybe<Alternative>;
  nextVote?: Maybe<Vote>;
  prevVote?: Maybe<Vote>;
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


export type CreateMeetingMutation = (
  { __typename?: 'Mutation' }
  & { createMeeting?: Maybe<(
    { __typename?: 'Meeting' }
    & Pick<Meeting, 'id' | 'title' | 'organization' | 'startTime' | 'description' | 'status'>
  )> }
);

export type UpdateMeetingMutationVariables = Exact<{
  meeting: UpdateMeetingInput;
}>;


export type UpdateMeetingMutation = (
  { __typename?: 'Mutation' }
  & { updateMeeting?: Maybe<(
    { __typename?: 'Meeting' }
    & Pick<Meeting, 'id' | 'title' | 'organization' | 'startTime' | 'description' | 'status'>
  )> }
);

export type AddParticipantsMutationVariables = Exact<{
  meetingId: Scalars['String'];
  participants: Array<ParticipantInput> | ParticipantInput;
}>;


export type AddParticipantsMutation = (
  { __typename?: 'Mutation' }
  & { addParticipants?: Maybe<Array<Maybe<(
    { __typename?: 'ParticipantOrInvite' }
    & Pick<ParticipantOrInvite, 'email' | 'role' | 'isVotingEligible'>
  )>>> }
);

export type DeleteParticipantsMutationVariables = Exact<{
  meetingId: Scalars['String'];
  emails: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteParticipantsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteParticipants'>
);

export type DeleteMeetingMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteMeetingMutation = (
  { __typename?: 'Mutation' }
  & { deleteMeeting?: Maybe<(
    { __typename?: 'Meeting' }
    & Pick<Meeting, 'id'>
  )> }
);

export type CreateVotationsMutationVariables = Exact<{
  meetingId: Scalars['String'];
  votations: Array<CreateVotationInput> | CreateVotationInput;
}>;


export type CreateVotationsMutation = (
  { __typename?: 'Mutation' }
  & { createVotations?: Maybe<Array<Maybe<(
    { __typename?: 'Votation' }
    & Pick<Votation, 'id' | 'meetingId' | 'title' | 'description' | 'index' | 'blankVotes' | 'status' | 'hiddenVotes' | 'type' | 'numberOfWinners' | 'majorityThreshold'>
    & { alternatives?: Maybe<Array<Maybe<(
      { __typename?: 'Alternative' }
      & Pick<Alternative, 'id' | 'text'>
    )>>> }
  )>>> }
);

export type UpdateVotationsMutationVariables = Exact<{
  votations: Array<UpdateVotationInput> | UpdateVotationInput;
}>;


export type UpdateVotationsMutation = (
  { __typename?: 'Mutation' }
  & { updateVotations?: Maybe<Array<Maybe<(
    { __typename?: 'Votation' }
    & Pick<Votation, 'id' | 'title' | 'description' | 'blankVotes' | 'index' | 'hiddenVotes' | 'type' | 'numberOfWinners' | 'majorityThreshold' | 'status'>
    & { alternatives?: Maybe<Array<Maybe<(
      { __typename?: 'Alternative' }
      & Pick<Alternative, 'id' | 'text'>
    )>>> }
  )>>> }
);

export type DeleteVotationsMutationVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteVotationsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteVotations'>
);

export type DeleteAlternativesMutationVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteAlternativesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAlternatives'>
);

export type CastVoteMutationVariables = Exact<{
  alternativeId: Scalars['String'];
}>;


export type CastVoteMutation = (
  { __typename?: 'Mutation' }
  & { castVote?: Maybe<(
    { __typename?: 'Vote' }
    & { alternative?: Maybe<(
      { __typename?: 'Alternative' }
      & Pick<Alternative, 'text'>
    )> }
  )> }
);

export type CastBlankVoteMutationVariables = Exact<{
  votationId: Scalars['String'];
}>;


export type CastBlankVoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'castBlankVote'>
);

export type UpdateVotationStatusMutationVariables = Exact<{
  id: Scalars['String'];
  status: VotationStatus;
}>;


export type UpdateVotationStatusMutation = (
  { __typename?: 'Mutation' }
  & { updateVotationStatus?: Maybe<(
    { __typename: 'Votation' }
    & Pick<Votation, 'title' | 'status'>
  ) | (
    { __typename: 'MaxOneOpenVotationError' }
    & Pick<MaxOneOpenVotationError, 'message'>
  )> }
);

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  ) | (
    { __typename?: 'UserNotFoundError' }
    & Pick<UserNotFoundError, 'message'>
  )> }
);

export type GetMeetingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeetingsQuery = (
  { __typename?: 'Query' }
  & { meetings: Array<Maybe<(
    { __typename?: 'Meeting' }
    & Pick<Meeting, 'id' | 'title' | 'description' | 'organization' | 'status' | 'startTime'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    )>, participants: Array<Maybe<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'role'>
      & { user?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id'>
      )> }
    )>> }
  )>> }
);

export type GetRoleQueryVariables = Exact<{
  meetingId: Scalars['String'];
}>;


export type GetRoleQuery = (
  { __typename?: 'Query' }
  & { meetingById?: Maybe<(
    { __typename?: 'Meeting' }
    & Pick<Meeting, 'id'>
    & { participants: Array<Maybe<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'role'>
      & { user?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id'>
      )> }
    )>> }
  )> }
);

export type GetMeetingByIdQueryVariables = Exact<{
  meetingId: Scalars['String'];
}>;


export type GetMeetingByIdQuery = (
  { __typename?: 'Query' }
  & { meetingById?: Maybe<(
    { __typename?: 'Meeting' }
    & Pick<Meeting, 'id' | 'title' | 'description' | 'organization' | 'status' | 'startTime'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    )> }
  )> }
);

export type GetParticipantsByMeetingIdQueryVariables = Exact<{
  meetingId: Scalars['String'];
}>;


export type GetParticipantsByMeetingIdQuery = (
  { __typename?: 'Query' }
  & { participants?: Maybe<Array<Maybe<(
    { __typename?: 'ParticipantOrInvite' }
    & Pick<ParticipantOrInvite, 'email' | 'role' | 'isVotingEligible'>
  )>>> }
);

export type GetVotationByIdQueryVariables = Exact<{
  votationId: Scalars['String'];
  meetingId: Scalars['String'];
}>;


export type GetVotationByIdQuery = (
  { __typename?: 'Query' }
  & { votationById?: Maybe<(
    { __typename?: 'Votation' }
    & Pick<Votation, 'id' | 'title' | 'description' | 'index' | 'hasVoted' | 'status' | 'blankVotes' | 'hiddenVotes' | 'type' | 'numberOfWinners' | 'majorityThreshold' | 'meetingId'>
    & { alternatives?: Maybe<Array<Maybe<(
      { __typename?: 'Alternative' }
      & Pick<Alternative, 'id' | 'text' | 'votationId'>
    )>>> }
  )>, meetingById?: Maybe<(
    { __typename?: 'Meeting' }
    & { participants: Array<Maybe<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'role'>
      & { user?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email'>
      )> }
    )>> }
  )> }
);

export type VotationsByMeetingIdQueryVariables = Exact<{
  meetingId: Scalars['String'];
}>;


export type VotationsByMeetingIdQuery = (
  { __typename?: 'Query' }
  & { meetingById?: Maybe<(
    { __typename?: 'Meeting' }
    & Pick<Meeting, 'id' | 'title'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email'>
    )>, votations?: Maybe<Array<Maybe<(
      { __typename?: 'Votation' }
      & Pick<Votation, 'id' | 'title' | 'status' | 'description' | 'blankVotes' | 'hiddenVotes' | 'type' | 'numberOfWinners' | 'majorityThreshold' | 'index'>
      & { alternatives?: Maybe<Array<Maybe<(
        { __typename?: 'Alternative' }
        & Pick<Alternative, 'id' | 'text'>
      )>>> }
    )>>> }
  )>, resultsOfPublishedVotations?: Maybe<Array<Maybe<(
    { __typename?: 'VotationWithWinner' }
    & Pick<VotationWithWinner, 'id'>
    & { alternatives: Array<Maybe<(
      { __typename?: 'AlternativeWithWinner' }
      & Pick<AlternativeWithWinner, 'id' | 'text' | 'isWinner'>
    )>> }
  )>>> }
);

export type GetVoteCountQueryVariables = Exact<{
  votationId: Scalars['String'];
}>;


export type GetVoteCountQuery = (
  { __typename?: 'Query' }
  & { getVoteCount?: Maybe<(
    { __typename?: 'VoteCountResult' }
    & Pick<VoteCountResult, 'votingEligibleCount' | 'voteCount'>
  )> }
);

export type GetVotationResultsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetVotationResultsQuery = (
  { __typename?: 'Query' }
  & { getVotationResults?: Maybe<(
    { __typename?: 'VotationResults' }
    & Pick<VotationResults, 'voteCount' | 'votingEligibleCount'>
    & { alternatives: Array<Maybe<(
      { __typename?: 'AlternativeResult' }
      & Pick<AlternativeResult, 'id' | 'text' | 'isWinner' | 'votes'>
    )>> }
  )> }
);

export type GetWinnerOfVotationQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetWinnerOfVotationQuery = (
  { __typename?: 'Query' }
  & { getWinnerOfVotation?: Maybe<(
    { __typename?: 'Alternative' }
    & Pick<Alternative, 'id' | 'text' | 'votationId'>
  )> }
);

export type VotationStatusUpdatedSubscriptionVariables = Exact<{
  id: Scalars['String'];
}>;


export type VotationStatusUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'votationStatusUpdated'>
);

export type NewVoteRegisteredSubscriptionVariables = Exact<{
  votationId: Scalars['String'];
}>;


export type NewVoteRegisteredSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'newVoteRegistered'>
);

export type VotationOpenedForMeetingSubscriptionVariables = Exact<{
  meetingId: Scalars['String'];
}>;


export type VotationOpenedForMeetingSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'votationOpenedForMeeting'>
);


export const CreateMeetingDocument = gql`
    mutation CreateMeeting($meeting: CreateMeetingInput!) {
  createMeeting(meeting: $meeting) {
    id
    title
    organization
    startTime
    description
    status
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
  addParticipants(meetingId: $meetingId, participants: $participants) {
    email
    role
    isVotingEligible
  }
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
export const UpdateVotationsDocument = gql`
    mutation UpdateVotations($votations: [UpdateVotationInput!]!) {
  updateVotations(votations: $votations) {
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
export const DeleteVotationsDocument = gql`
    mutation DeleteVotations($ids: [String!]!) {
  deleteVotations(ids: $ids)
}
    `;
export type DeleteVotationsMutationFn = Apollo.MutationFunction<DeleteVotationsMutation, DeleteVotationsMutationVariables>;

/**
 * __useDeleteVotationsMutation__
 *
 * To run a mutation, you first call `useDeleteVotationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVotationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVotationsMutation, { data, loading, error }] = useDeleteVotationsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteVotationsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVotationsMutation, DeleteVotationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteVotationsMutation, DeleteVotationsMutationVariables>(DeleteVotationsDocument, options);
      }
export type DeleteVotationsMutationHookResult = ReturnType<typeof useDeleteVotationsMutation>;
export type DeleteVotationsMutationResult = Apollo.MutationResult<DeleteVotationsMutation>;
export type DeleteVotationsMutationOptions = Apollo.BaseMutationOptions<DeleteVotationsMutation, DeleteVotationsMutationVariables>;
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
export const UpdateVotationStatusDocument = gql`
    mutation UpdateVotationStatus($id: String!, $status: VotationStatus!) {
  updateVotationStatus(id: $id, status: $status) {
    __typename
    ... on Votation {
      title
      status
    }
    ... on MaxOneOpenVotationError {
      message
    }
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
 *      id: // value for 'id'
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
export const GetRoleDocument = gql`
    query GetRole($meetingId: String!) {
  meetingById(meetingId: $meetingId) {
    id
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
 * __useGetRoleQuery__
 *
 * To run a query within a React component, call `useGetRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoleQuery({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useGetRoleQuery(baseOptions: Apollo.QueryHookOptions<GetRoleQuery, GetRoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
      }
export function useGetRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoleQuery, GetRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
        }
export type GetRoleQueryHookResult = ReturnType<typeof useGetRoleQuery>;
export type GetRoleLazyQueryHookResult = ReturnType<typeof useGetRoleLazyQuery>;
export type GetRoleQueryResult = Apollo.QueryResult<GetRoleQuery, GetRoleQueryVariables>;
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
    query GetVotationById($votationId: String!, $meetingId: String!) {
  votationById(votationId: $votationId) {
    id
    title
    description
    index
    hasVoted
    alternatives {
      id
      text
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
  meetingById(meetingId: $meetingId) {
    participants {
      user {
        id
        email
      }
      role
    }
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
 *      meetingId: // value for 'meetingId'
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
      }
    }
  }
  resultsOfPublishedVotations(meetingId: $meetingId) {
    id
    alternatives {
      id
      text
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
    query GetVotationResults($id: String!) {
  getVotationResults(id: $id) {
    alternatives {
      id
      text
      isWinner
      votes
    }
    voteCount
    votingEligibleCount
  }
}
    `;

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
 *      id: // value for 'id'
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
    query GetWinnerOfVotation($id: String!) {
  getWinnerOfVotation(id: $id) {
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
 *      id: // value for 'id'
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
export const VotationStatusUpdatedDocument = gql`
    subscription VotationStatusUpdated($id: String!) {
  votationStatusUpdated(id: $id)
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
  newVoteRegistered(votationId: $votationId)
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