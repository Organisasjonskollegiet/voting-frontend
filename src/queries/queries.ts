import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
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
