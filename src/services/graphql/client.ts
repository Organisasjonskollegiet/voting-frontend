import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_ENDPOINT || 'localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const { getAccessTokenSilently } = useAuth0();
  // get the authentication token from local storage if it exists
  return new Promise((sucess, fail) => {
    const token = getAccessTokenSilently();
    console.log(token);
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
