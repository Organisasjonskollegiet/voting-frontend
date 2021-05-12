import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import PageExample from './components/pages/PageExample';
import Votation from './components/pages/Votation';
import AddMeetingInformation from './components/molecules/AddMeetingInformation'
import AddMeeting from './components/pages/AddMeeting'

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
        <AddMeeting />
      </Route>
    </Switch>
  );
};

export default App;
