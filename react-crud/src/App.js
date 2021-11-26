// import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SamplesList from './components/samples-list.component';
import Sample from './components/sample.component';
import AddSample from './components/add-sample.component';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/samples" className="navbar-brand">
            Project Intension
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/samples"} className="nav-link">
                Samples
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/samples"]} component={SamplesList} />
            <Route exact path="/add" component={AddSample} />
            <Route path="/samples/:id" component={Sample} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
