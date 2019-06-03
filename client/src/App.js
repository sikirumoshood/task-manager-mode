import React, { Component } from "react";
import "./App.css";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "./components/Index";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { store } from "./redux/store";

import { Provider } from "react-redux";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div id="overlay" className="overlay" />
          <Container fluid>
            <Route exact path="/" component={Index} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Container>
        </Router>
      </Provider>
    );
  }
}
export default App;
