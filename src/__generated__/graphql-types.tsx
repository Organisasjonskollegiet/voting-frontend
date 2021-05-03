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

export type CreateMeetingInput = {
  title: Scalars['String'];
  startTime: Scalars['DateTime'];
  description?: Scalars['String'];
};

export type CreateVotationInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  blankVotes: Scalars['Boolean'];
  majorityType: MajorityType;
  majorityThreshold: Scalars['Int'];
  meetingId: Scalars['String'];
};


export type GetUserResult = User | UserNotFoundError;

export enum MajorityType {
  Qualified = 'QUALIFIED',
  Simple = 'SIMPLE'
}

export type Meeting = {
  __typename?: 'Meeting';
  id: Scalars['ID'];
  title: Scalars['String'];
  startTime: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  votations?: Maybe<Array<Maybe<Votation>>>;
  status: Status;
  participants: Array<Maybe<Participant>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createVotation?: Maybe<Votation>;
  createAlternative?: Maybe<Alternative>;
  castVote?: Maybe<Vote>;
  createMeeting?: Maybe<Meeting>;
};


export type MutationCreateVotationArgs = {
  votation: CreateVotationInput;
};


export type MutationCreateAlternativeArgs = {
  text: Scalars['String'];
  votationId: Scalars['String'];
};


export type MutationCastVoteArgs = {
  alternativeId: Scalars['String'];
  votationId: Scalars['String'];
};


export type MutationCreateMeetingArgs = {
  meeting: CreateMeetingInput;
};

export type Participant = {
  __typename?: 'Participant';
  role: Role;
  isVotingEligible: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<GetUserResult>;
  votationById?: Maybe<Votation>;
  alternativesByVotation?: Maybe<Array<Maybe<Alternative>>>;
  /** Find meetings you are participating in */
  meetings: Array<Maybe<Meeting>>;
  /** Find a meeting by id from meetings youre participating in */
  meetingsById?: Maybe<Meeting>;
};


export type QueryVotationByIdArgs = {
  votationId: Scalars['ID'];
};


export type QueryAlternativesByVotationArgs = {
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

export enum Status {
  Upcoming = 'UPCOMING',
  Ongoing = 'ONGOING',
  Ended = 'ENDED'
}

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

export type Votation = {
  __typename?: 'Votation';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
  status: Status;
  blankVotes?: Maybe<Scalars['Boolean']>;
  majorityType: MajorityType;
  majorityThreshold: Scalars['Int'];
  meetingId: Scalars['String'];
  hasVoted?: Maybe<Array<Maybe<User>>>;
  alternatives?: Maybe<Array<Maybe<Alternative>>>;
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

export type CastVoteMutationVariables = Exact<{
  alternativeId: Scalars['String'];
  votationId: Scalars['String'];
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
    & Pick<Meeting, 'id' | 'title' | 'description'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    )> }
  )>> }
);

export type GetVotationByIdQueryVariables = Exact<{
  votationId: Scalars['ID'];
}>;


export type GetVotationByIdQuery = (
  { __typename?: 'Query' }
  & { votationById?: Maybe<(
    { __typename?: 'Votation' }
    & Pick<Votation, 'id' | 'title' | 'description' | 'status' | 'blankVotes'>
    & { hasVoted?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>>>, alternatives?: Maybe<Array<Maybe<(
      { __typename?: 'Alternative' }
      & Pick<Alternative, 'id' | 'text'>
    )>>> }
  )> }
);


export const CastVoteDocument = gql`
    mutation CastVote($alternativeId: String!, $votationId: String!) {
  castVote(alternativeId: $alternativeId, votationId: $votationId) {
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
 *      votationId: // value for 'votationId'
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
    query GetVotationById($votationId: ID!) {
  votationById(votationId: $votationId) {
    id
    title
    description
    hasVoted {
      id
    }
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