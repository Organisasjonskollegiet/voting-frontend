import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import PageExample from './components/pages/PageExample';
import Votation from './components/pages/Votation';
import MyMeetings from './components/pages/MyMeetings';

// The Auth0 provider is here so it can access to the router hooks for location and history
const App: FC = () => {
  return (
    <Switch>
      <Route path="/admin">
        <PageExample page="/admin" />
      </Route>
      <Route path="/meetings">
        <MyMeetings />
      </Route>
      <Route path="/meeting/:meetingId/votation/:votationId">
        <Votation />
      </Route>
      <Route path="/">
        <PageExample page="/" />
      </Route>
    </Switch>
  );
};

export default App;
