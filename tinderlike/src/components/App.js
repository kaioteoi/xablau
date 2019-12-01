import React from 'react';
import Container from '@material-ui/core/Container';
import '../App.css';
import Onboarding from './Onboarding';
import Matcher from './Matcher';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/matcher">
          <Matcher />
        </Route>
        <Route path="/">
          <Onboarding />
        </Route>
      </Switch>
    </Router>
  );
}
