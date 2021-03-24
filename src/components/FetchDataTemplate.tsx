import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS, GET_MEETINGS } from '../queries/queries'
import { useAuth0 } from '@auth0/auth0-react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface UsersData {
  users: User[];
}

interface Meeting {
  id: string;
  title: string;
  description: string;
  owner: User;
}

interface MeetingsData {
  meetings: Meeting[];
}

const FetchDataTemplate = () => {

  const { loading, error, data } = useQuery<UsersData>(GET_MEETINGS)
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <p>Not logged in...</p>

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data) return <p>Error</p>
  
  console.log(data);
  return (
    <div>
      <p>Hei</p>
    </div>
  )
}

export default FetchDataTemplate;