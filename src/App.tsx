import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import ManageMeeting from './pages/ManageMeeting';
import MyMeetings from './pages/MyMeetings';
import MeetingLobby from './pages/MeetingLobby';

const App: FC = () => {
  return (
    <>
      <Navbar />
      <Switch>
        {/* <Route path="/meeting/:meetingId/votation/:votationId">
          <ActiveVotation />
        </Route> */}
        <Route key="edit-meeting" path="/meeting/:meetingId/edit">
          <ManageMeeting />
        </Route>
        <Route key="add-meeting" path="/meeting/new">
          <ManageMeeting />
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
