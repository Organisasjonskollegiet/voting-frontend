import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';

const ApolloAuthProvider: React.FC = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [bearerToken, setBearerToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const token = isAuthenticated ? await getAccessTokenSilently() : '';
      setBearerToken(token);
    };
    getToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
  });
  const authLink = setContext((_, { headers, ...rest }) => {
    if (!bearerToken) return { headers, ...rest };
    const token = bearerToken;
    // return the headers to the context so httpLink can read them
    return {
      ...rest,
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloAuthProvider;
