import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ApolloAuthProvider from './services/providers/ApolloProvider';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN ?? '';
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID ?? '';
const callbackUrl = process.env.REACT_APP_AUTH_CALLBACK_URL ?? '';
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={callbackUrl}
      audience={audience}
      >
        <ApolloAuthProvider>
          <App />
        </ApolloAuthProvider>
     </Auth0Provider> 
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
