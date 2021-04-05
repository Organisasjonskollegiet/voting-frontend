import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
  credentials: 'include', // important to include cookies
  cache: new InMemoryCache(),
});
