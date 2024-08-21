import '../styles/tailwind.css';
import Layout from '../components/Layout';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloClient';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
