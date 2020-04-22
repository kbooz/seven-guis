import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Counter from './guis/1.Counter/Counter';
import TemperatureConverter from './guis/2.TemperatureConverter/TemperatureConverter';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/temperature">
          <TemperatureConverter />
        </Route>
        <Route path="/">
          <Counter />
        </Route>
      </Switch>
      <ul>
        <li>
          <Link to="/">Counter</Link>
        </li>
        <li>
          <Link to="/temperature">TemperatureConverter</Link>
        </li>
      </ul>
    </Router>
  );
}

export default App;
