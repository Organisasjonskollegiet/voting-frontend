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
