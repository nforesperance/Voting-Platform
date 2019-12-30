import React from 'react';
import './App.css';
import Main from './components/Main';
import Error from "./components/404";
import Home from './components/Home';
import Elections from './components/election/Elections'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/home" component={Home} />
        <Route name="election" exact path="/election/:year" component={Elections} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
