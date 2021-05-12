import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Skeleton } from '@chakra-ui/skeleton';
import { useGetUserQuery } from '../../__generated__/graphql-types';

const UseQueryExample: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const { data, loading, error } = useGetUserQuery();
  if (!isAuthenticated) return <p>Not logged in...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Skeleton isLoaded={!loading || !data}>
        <p>{JSON.stringify(data?.user)}</p>
      </Skeleton>
    </div>
  );
};

export default UseQueryExample;
