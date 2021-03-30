import { gql } from '@apollo/client';

export const CAST_VOTE = gql`
  mutation CastVote($alternativeId: String!, $votationId: String!) {
    castVote(alternativeId: $alternativeId, votationId: $votationId) {
      alternative {
        text
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($user: AddUserInput!) {
    addUser(user: $user) {
      id
      username
      email
    }
  }
`;
