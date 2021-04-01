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
  DateTime: any;
};

export type AddUserInput = {
  id?: Maybe<Scalars['ID']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Alternative = {
  __typename?: 'Alternative';
  id: Scalars['ID'];
  text: Scalars['String'];
  votationId: Scalars['String'];
  votation?: Maybe<Votation>;
  votes?: Maybe<Array<Maybe<Vote>>>;
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
  owner: User;
  votations?: Maybe<Array<Maybe<Votation>>>;
  status: Status;
  participants: Array<Maybe<Participant>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  castVote?: Maybe<Vote>;
};


export type MutationCastVoteArgs = {
  alternativeId: Scalars['String'];
  votationId: Scalars['String'];
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
  userByEmail?: Maybe<GetUserResult>;
  votationsByMeeting?: Maybe<Array<Maybe<Votation>>>;
  alternativesByVotation?: Maybe<Array<Maybe<Alternative>>>;
  /** Find meetings you are participating in */
  meetings: Array<Maybe<Meeting>>;
  /** Find a meeting by id from YOUR meetings */
  meetingsById?: Maybe<Meeting>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryVotationsByMeetingArgs = {
  meetingId: Scalars['String'];
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
  meeting: Meeting;
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

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


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
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    ) }
  )>> }
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
    query GetUser($id: ID!) {
  user(id: $id) {
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
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
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