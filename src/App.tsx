import { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageExample from './components/pages/PageExample';
import Auth0WithHistoryProvider from './services/providers/Auth0ProviderWithHistory';

const App: FC = () => {
  return (
    <Router>
      <Auth0WithHistoryProvider>
      <Switch>
        <Route path="/admin">
          <PageExample page="/admin"/>
        </Route>
        <Route path="/">
          <PageExample page="/" />
        </Route>
      </Switch>
      </Auth0WithHistoryProvider>
    </Router>
  );
};

export default App;
