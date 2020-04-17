import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Counter from './guis/Counter/Counter';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Counter />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
