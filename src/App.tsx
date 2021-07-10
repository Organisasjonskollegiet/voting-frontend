import React, { FC } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Navbar from './components/pages/Navbar';
import Votation from './components/pages/Votation';
import AddMeeting from './components/pages/AddMeeting';
import MyMeetings from './components/pages/MyMeetings';
import { Box } from '@chakra-ui/react';
import { darkblue } from './components/particles/theme';
import MeetingLobby from './components/pages/MeetingLobby';
import EditMeeting from './components/pages/EditMeeting';

const App: FC = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/meeting/:meetingId/votation/:votationId">
          <Votation />
        </Route>
        <Route path="/meeting/:meetingId/edit">
          <EditMeeting />
        </Route>
        <Route path="/meeting/new">
          <AddMeeting />
        </Route>
        <Route path="/meeting/:meetingId">
          <MeetingLobby />
        </Route>
        <Route path="/">
          <MyMeetings />
        </Route>
      </Switch>
    </>
  );
};

export default App;
