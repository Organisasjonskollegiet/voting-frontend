import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as RouterProvider } from 'react-router-dom';
import App from './App';
import theme from './components/particles/theme';
import reportWebVitals from './reportWebVitals';
import ApolloAuthProvider from './services/apollo/ApolloProvider';
import Auth0WithHistoryProvider from './services/auth/Auth0ProviderWithHistory';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider>
        <Auth0WithHistoryProvider>
          <ApolloAuthProvider>
            <App />
          </ApolloAuthProvider>
        </Auth0WithHistoryProvider>
      </RouterProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
