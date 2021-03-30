import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ClipLoader from 'react-spinners/ClipLoader';
import { Center } from '@chakra-ui/react';


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
      <ClipLoader
        css={`
          position: absolute;
          top: 50%;
        `}
      />
    </Center>
  );
};

export default AuthWrapper;
