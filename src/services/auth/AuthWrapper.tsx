import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Center, Spinner } from '@chakra-ui/react';
import { useLocation } from 'react-router';

const AuthWrapper: React.FC = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();

  if (!isLoading && isAuthenticated) {
    return <>{children}</>;
  }

  if (!isLoading && !isAuthenticated) {
    setTimeout(
      () =>
        loginWithRedirect({
          appState: {
            returnTo: location.pathname,
          },
        }),
      500
    );
  }

  return (
    <Center>
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="gray.500" size="xl" />
    </Center>
  );
};

export default AuthWrapper;
