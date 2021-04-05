import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Center, Spinner } from '@chakra-ui/react';

const AuthWrapper: React.FC = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (!isLoading && isAuthenticated) {
    return <>{children}</>;
  }

  if (!isLoading && !isAuthenticated) {
    setTimeout(() => loginWithRedirect(), 500);
  }

  return (
    <Center>
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="gray.500" size="xl" />
    </Center>
  );
};

export default AuthWrapper;
