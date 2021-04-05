import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import PageExample from './components/pages/PageExample';

// The Auth0 provider is here so it can access to the router hooks for location and history
const App: FC = () => {
  return (
    <Switch>
      <Route path="/admin">
        <PageExample page="/admin" />
      </Route>
      <Route path="/">
        <PageExample page="/" />
      </Route>
    </Switch>
  );
};

export default App;
