import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetMeetingsQuery } from '../../__generated__/graphql-types';
import { Skeleton } from '@chakra-ui/skeleton';

const UseQueryExample: React.FC = () => {
  const { loading, error, data } = useGetMeetingsQuery();
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <p>Not logged in...</p>;
  console.log(error);
  if (error) return <p>Error :(</p>;

  console.log(data);
  return (
    <div>
      <Skeleton isLoaded={!loading || !data}>
        <p>{JSON.stringify(data?.meetings)}</p>
      </Skeleton>
    </div>
  );
};

export default UseQueryExample;
