import React, { FC } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Navbar from './components/pages/Navbar';
import PageExample from './components/pages/PageExample';
import Votation from './components/pages/Votation';
import MyMeetings from './components/pages/MyMeetings';
import { Box } from '@chakra-ui/react';
import { darkblue } from './components/particles/theme';

const App: FC = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname.includes('votation') ? <Box h="57px" w="100vw" bgColor={darkblue}></Box> : <Navbar />}
      <Switch>
        <Route path="/admin">
          <PageExample page="/admin" />
        </Route>
        <Route path="/votation/:id">
          <Votation />
        </Route>
        <Route path="/">
          <MyMeetings />
        </Route>
      </Switch>
    </>
  );
};

export default App;
