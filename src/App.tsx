import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import ManageMeeting from './pages/ManageMeeting';
import MyMeetings from './pages/MyMeetings';
import MeetingLobby from './pages/MeetingLobby';
import RegisterForMeeting from './pages/RegisterForMeeting';
import AboutUs from './pages/AboutUs';
import MyProfile from './pages/MyProfile';

const App: FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route key="edit-meeting" path="/meeting/:meetingId/edit" element={<ManageMeeting />} />
        <Route key="add-meeting" path="/meeting/new" element={<ManageMeeting />} />
        <Route path="/meeting/:meetingId/register" element={<RegisterForMeeting />} />
        <Route path="/meeting/:meetingId" element={<MeetingLobby />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/" element={<MyMeetings />} />
      </Routes>
    </>
  );
};

export default App;
