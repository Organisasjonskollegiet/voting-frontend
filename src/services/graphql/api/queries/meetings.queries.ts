import { gql } from '@apollo/client';

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
