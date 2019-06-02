import React, { Component } from "react";
import "./App.css";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "./components/Index";
import Dashboard from "./components/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Route exact path="/" component={Index} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Container>
      </Router>
    );
  }
}
export default App;
