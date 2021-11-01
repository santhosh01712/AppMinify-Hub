import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./components/Login";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Game from "./gameInitial";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
        {this.props.authenticated ? (
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/" exact component={Login} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Redirect to="/" />
          </Switch>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
  };
};

export default connect(mapStateToProps)(App);
