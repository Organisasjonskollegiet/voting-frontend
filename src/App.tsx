import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/atoms/Navbar';
import PageExample from './components/pages/PageExample';
import Votation from './components/pages/Votation';

// The Auth0 provider is here so it can access to the router hooks for location and history
const App: FC = () => {
  return (
    <Switch>
      <Route path="/admin">
        <PageExample page="/admin" />
      </Route>
      <Route path="/votation/:id">
        <Votation />
      </Route>
      <Route path="/">
        <Navbar />
      </Route>
    </Switch>
  );
};

export default App;
