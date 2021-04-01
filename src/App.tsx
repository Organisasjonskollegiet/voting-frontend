import { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageExample from './components/pages/PageExample';

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <PageExample />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
