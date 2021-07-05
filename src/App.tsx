import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import Votation from './components/pages/Votation';
import AddMeeting from './components/pages/AddMeeting';
import MyMeetings from './components/pages/MyMeetings';

// The Auth0 provider is here so it can access to the router hooks for location and history
const App: FC = () => {
  return (
    <Switch>
      <Route path="/meeting/:meetingId/votation/:votationId">
        <Votation />
      </Route>
      <Route path="/mote/opprett">
        <AddMeeting />
      </Route>
      <Route path="/">
        <MyMeetings />
      </Route>
    </Switch>
  );
};

export default App;
