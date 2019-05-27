import React, { Component } from 'react';
import logo from './logo.svg';
import { HashRouter as Router, Link, Route} from 'react-router-dom'
import './App.css';
import Home from './page/home';
import Movie from './page/movie';
import About from './page/about';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Home}></Route>
            <Route path="/movie" component={Movie}></Route>
            <Route path="/about" component={About}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
