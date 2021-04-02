import { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageExample from './components/pages/PageExample';

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <PageExample page="/admin"/>
        </Route>
        <Route path="/">
          <PageExample page="/" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
