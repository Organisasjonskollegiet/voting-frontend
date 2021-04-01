import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Auth0WithHistoryProvider from './services/providers/Auth0ProviderWithHistory';
import reportWebVitals from './reportWebVitals';
import ApolloAuthProvider from './services/providers/ApolloProvider';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Auth0WithHistoryProvider>
        <ApolloAuthProvider>
          <App />
        </ApolloAuthProvider>
      </Auth0WithHistoryProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
