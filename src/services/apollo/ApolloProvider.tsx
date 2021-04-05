import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { client } from './client';
import Cookies from 'js-cookie';
import { ApolloProvider } from '@apollo/client';

const ApolloAuthProvider: React.FC = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      const token = isAuthenticated ? await getAccessTokenSilently() : '';
      if (token) {
        Cookies.set('jwt', token);
      }
    };
    getToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloAuthProvider;
