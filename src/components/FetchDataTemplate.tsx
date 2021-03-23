import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS, GET_MEETINGS } from '../queries/queries'

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

  const { loading, error, data } = useQuery<UsersData>(GET_USERS)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data) return <p>Error</p>

  return (
    <div>
      {data.users.map( user => (
        <p>{user.id}</p>
      ))}
    </div>
  )
}

export default FetchDataTemplate;