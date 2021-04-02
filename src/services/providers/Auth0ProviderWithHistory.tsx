import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0WithHistoryProvider: React.FC = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN ?? '';
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID ?? '';
  const callbackUrl = process.env.REACT_APP_AUTH_CALLBACK_URL ?? '';
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={callbackUrl}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0WithHistoryProvider;
