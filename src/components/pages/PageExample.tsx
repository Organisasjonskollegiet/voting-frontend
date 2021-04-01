import React from 'react';
import { Button, Center } from '@chakra-ui/react';
import UseQueryExample from '../molecules/UseQueryExample';
import UseMutationExample from '../molecules/UseMutationExample';
import { useAuth0 } from '@auth0/auth0-react';
import AuthWrapper from '../../services/auth/AuthWrapper';

const PageExample: React.FC = () => {
  const { isAuthenticated, user, logout, loginWithRedirect } = useAuth0();

  return (
    <AuthWrapper>
      <Center>
        <p>{!isAuthenticated ? 'Vennligst logg inn' : `Welcome ${user.name}`}</p>
        <Button
          colorScheme="blue"
          onClick={isAuthenticated ? () => logout({ returnTo: window.location.origin }) : () => loginWithRedirect()}
        >
          {isAuthenticated ? 'Log out' : 'Log in'}
        </Button>
        <UseQueryExample />
        <UseMutationExample />
      </Center>
    </AuthWrapper>
  );
};

export default PageExample;
