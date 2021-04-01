import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($user: AddUserInput!) {
    addUser(user: $user) {
      id
      username
      email
    }
  }
`;
