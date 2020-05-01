import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Counter from './guis/1.Counter/Counter';
import TemperatureConverter from './guis/2.TemperatureConverter/TemperatureConverter';
import FlightBooker from './guis/3.FlightBooker/FlightBooker';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/flights">
          <FlightBooker />
        </Route>
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
        <li>
          <Link to="/flights">FlightBooker</Link>
        </li>
      </ul>
    </Router>
  );
}

export default App;
