import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { setContext } from '@apollo/client/link/context';

const ApolloAuthProvider: React.FC = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
  });

  const authLink = setContext(async () => {
    const token = await getAccessTokenSilently();
    console.log(token)
    return {
      headers: {
        Authorization: `Bearer ${token}`,
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
