import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/pages/Navbar';
import PageExample from './components/pages/PageExample';
import Votation from './components/pages/Votation';
import MyMeetings from './components/pages/MyMeetings';

const App: FC = () => {
  return (
    <Switch>
      <Route path="/admin">
        <Navbar />
        <PageExample page="/admin" />
      </Route>
      <Route path="/meetings">
        <MyMeetings />
      </Route>
      <Route path="/votation/:id">
        <Votation />
      </Route>
      <Route path="/">
        <MyMeetings />
      </Route>
    </Switch>
  );
};

export default App;
