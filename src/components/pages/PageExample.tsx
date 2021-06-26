import React from 'react';
import { Button, Center } from '@chakra-ui/react';
import UseQueryExample from '../molecules/UseQueryExample';
import UseMutationExample from '../molecules/UseMutationExample';
import { useAuth0 } from '@auth0/auth0-react';
import AuthWrapper from '../../services/auth/AuthWrapper';

interface IProps {
  page: string;
}

const PageExample: React.FC<IProps> = ({ page }) => {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  return (
    <AuthWrapper>
      <h1>{page}</h1>
      <Center>
        <p>{!isAuthenticated ? 'Vennligst logg inn' : `Welcome`}</p>
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
