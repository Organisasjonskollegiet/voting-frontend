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
  votes?: Maybe<Scalars['Int']>;
};

export type AlternativeInput = {
  id: Scalars['String'];
  text: Scalars['String'];
};

export type CreateMeetingInput = {
  organization: Scalars['String'];
  title: Scalars['String'];
  startTime: Scalars['DateTime'];
  description?: Scalars['String'];
};

export type CreateVotationInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  blankVotes: Scalars['Boolean'];
  hiddenVotes: Scalars['Boolean'];
  severalVotes: Scalars['Boolean'];
  majorityType: MajorityType;
  majorityThreshold: Scalars['Int'];
  index: Scalars['Int'];
  alternatives?: Maybe<Array<Scalars['String']>>;
};


export type DeleteParticipantResult = Participant | OwnerCannotBeRemovedFromParticipantError;

export type GetUserResult = User | UserNotFoundError;

export enum MajorityType {
  Qualified = 'QUALIFIED',
  Simple = 'SIMPLE'
}

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
  createMeeting?: Maybe<Meeting>;
  updateMeeting?: Maybe<Meeting>;
  deleteMeeting?: Maybe<Meeting>;
  addParticipants?: Maybe<Scalars['Int']>;
  deleteParticipant?: Maybe<DeleteParticipantResult>;
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


export type MutationDeleteParticipantArgs = {
  meetingId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationChangeViewArgs = {
  state: ViewState;
};

/** The payload of newVoteRegistered subscription */
export type NewVoteRegisteredPayload = {
  __typename?: 'NewVoteRegisteredPayload';
  voteCount: Scalars['Int'];
  votingEligibleCount: Scalars['Int'];
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

export type Query = {
  __typename?: 'Query';
  user?: Maybe<GetUserResult>;
  votationById?: Maybe<Votation>;
  alternativesByVotation?: Maybe<Array<Maybe<Alternative>>>;
  votingEligibleCount?: Maybe<Scalars['Int']>;
  /** Find meetings you are participating in */
  meetings: Array<Maybe<Meeting>>;
  /** Find a meeting by id from meetings youre participating in */
  meetingsById?: Maybe<Meeting>;
};


export type QueryVotationByIdArgs = {
  votationId: Scalars['String'];
};


export type QueryAlternativesByVotationArgs = {
  votationId: Scalars['String'];
};


export type QueryVotingEligibleCountArgs = {
  votationId: Scalars['String'];
};


export type QueryMeetingsByIdArgs = {
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

export type UpdateVotationInput = {
  id: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  blankVotes: Scalars['Boolean'];
  hiddenVotes: Scalars['Boolean'];
  severalVotes: Scalars['Boolean'];
  majorityType: MajorityType;
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
  description: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
  status: VotationStatus;
  blankVotes: Scalars['Boolean'];
  hiddenVotes: Scalars['Boolean'];
  severalVotes: Scalars['Boolean'];
  majorityType: MajorityType;
  majorityThreshold: Scalars['Int'];
  index: Scalars['Int'];
  meetingId: Scalars['String'];
  hasVoted?: Maybe<Array<Maybe<Scalars['String']>>>;
  alternatives?: Maybe<Array<Maybe<Alternative>>>;
};

export enum VotationStatus {
  Upcoming = 'UPCOMING',
  Open = 'OPEN',
  CheckingResult = 'CHECKING_RESULT',
  PublishedResult = 'PUBLISHED_RESULT'
}

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['ID'];
  alternativeId: Scalars['String'];
  nextVoteId?: Maybe<Scalars['String']>;
  alternative?: Maybe<Alternative>;
  nextVote?: Maybe<Vote>;
  prevVote?: Maybe<Vote>;
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
  & Pick<Mutation, 'addParticipants'>
);

export type CreateVotationsMutationVariables = Exact<{
  meetingId: Scalars['String'];
  votations: Array<CreateVotationInput> | CreateVotationInput;
}>;


export type CreateVotationsMutation = (
  { __typename?: 'Mutation' }
  & { createVotations?: Maybe<Array<Maybe<(
    { __typename?: 'Votation' }
    & Pick<Votation, 'id' | 'title' | 'description' | 'index' | 'blankVotes' | 'hiddenVotes' | 'severalVotes' | 'majorityType' | 'majorityThreshold'>
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
    & Pick<Votation, 'id' | 'title' | 'description' | 'blankVotes' | 'index' | 'hiddenVotes' | 'severalVotes' | 'majorityType' | 'majorityThreshold'>
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
    )> }
  )>> }
);

export type GetVotationByIdQueryVariables = Exact<{
  votationId: Scalars['String'];
}>;


export type GetVotationByIdQuery = (
  { __typename?: 'Query' }
  & { votationById?: Maybe<(
    { __typename?: 'Votation' }
    & Pick<Votation, 'id' | 'title' | 'description' | 'index' | 'hasVoted' | 'status' | 'blankVotes'>
    & { alternatives?: Maybe<Array<Maybe<(
      { __typename?: 'Alternative' }
      & Pick<Alternative, 'id' | 'text'>
    )>>> }
  )> }
);

export type VotingEligibleCountQueryVariables = Exact<{
  votationId: Scalars['String'];
}>;


export type VotingEligibleCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'votingEligibleCount'>
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
export const CreateVotationsDocument = gql`
    mutation CreateVotations($meetingId: String!, $votations: [CreateVotationInput!]!) {
  createVotations(meetingId: $meetingId, votations: $votations) {
    id
    title
    description
    index
    blankVotes
    hiddenVotes
    severalVotes
    majorityType
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
    severalVotes
    majorityType
    majorityThreshold
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
    }
    status
    blankVotes
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
export const VotingEligibleCountDocument = gql`
    query VotingEligibleCount($votationId: String!) {
  votingEligibleCount(votationId: $votationId)
}
    `;

/**
 * __useVotingEligibleCountQuery__
 *
 * To run a query within a React component, call `useVotingEligibleCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useVotingEligibleCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVotingEligibleCountQuery({
 *   variables: {
 *      votationId: // value for 'votationId'
 *   },
 * });
 */
export function useVotingEligibleCountQuery(baseOptions: Apollo.QueryHookOptions<VotingEligibleCountQuery, VotingEligibleCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VotingEligibleCountQuery, VotingEligibleCountQueryVariables>(VotingEligibleCountDocument, options);
      }
export function useVotingEligibleCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VotingEligibleCountQuery, VotingEligibleCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VotingEligibleCountQuery, VotingEligibleCountQueryVariables>(VotingEligibleCountDocument, options);
        }
export type VotingEligibleCountQueryHookResult = ReturnType<typeof useVotingEligibleCountQuery>;
export type VotingEligibleCountLazyQueryHookResult = ReturnType<typeof useVotingEligibleCountLazyQuery>;
export type VotingEligibleCountQueryResult = Apollo.QueryResult<VotingEligibleCountQuery, VotingEligibleCountQueryVariables>;
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