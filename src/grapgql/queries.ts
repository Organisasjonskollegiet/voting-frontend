import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      username
    }
  }
`;

export const GET_MEETINGS = gql`
  query GetMeetings {
    meetings {
      id
      title
      description
      owner {
        id
        username
      }
    }
  }
`;
