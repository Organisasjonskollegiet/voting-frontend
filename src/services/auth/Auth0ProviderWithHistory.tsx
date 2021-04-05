import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AppState, Auth0Provider } from '@auth0/auth0-react';

const Auth0WithHistoryProvider: React.FC = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN ?? '';
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID ?? '';
  // Changes the callback url to the previewed deployment
  const buildCtx = process.env.REACT_APP_CONTEXT;
  const callbackUrl =
    buildCtx === 'deploy-preview' || buildCtx === 'branch-deploy'
      ? process.env.REACT_APP_DEPLOY_URL
      : process.env.REACT_APP_AUTH0_CALLBACK_URL;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const history = useHistory();
  const location = useLocation();

  const onRedirectCallback = (appState: AppState) => {
    history.push(appState?.returnTo || location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={callbackUrl}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0WithHistoryProvider;
