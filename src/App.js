import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import { Fragment } from 'react';

import Home from '../src/component/Home';
import Snake from '../src/component/Snake';
import MatchBox from '../src/component/MatchEnter';
import SnakeGame from '../src/component/SnakeGame'
import MatchGame from '../src/component/MatchBox'




function App() {
  return (

    <Fragment>
      <Switch>

        <Route path="/game1" component={SnakeGame} exact="true" />
        <Route path="/snake" component={Snake} exact="true" />
        <Route path="/matchBox" component={MatchBox} exact="true" />
        <Route path="/matchEnter" component={MatchGame} exact="true" />
        <Route path="/" component={Home} exact="true" />


      </Switch>
    </Fragment>
  );
}

export default App;
