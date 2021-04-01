import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      username
    }
  }
`;
