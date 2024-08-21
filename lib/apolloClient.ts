import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphqlzero.almansi.me/api',
  }),
  cache: new InMemoryCache(),
});

export default client;
