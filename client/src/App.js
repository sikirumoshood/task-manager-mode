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
import jwt_decode from "jwt-decode";
import applyTokenToRequestHeaders from "./utils/applyTokenToRequestHeaders";
import { SET_CURRENT_USER } from "./redux/actions/types";

//TODO: CHECK IF TOKEN EXISTS IN LOCAL STORAGE
const token = localStorage.getItem("token");
if (token) {
  const data = jwt_decode(token);

  //Check if it has expired
  if (Date.now() / 1000 > data.exp) {
    applyTokenToRequestHeaders(false); //deletes token from headers
    localStorage.removeItem("token");
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: {
        user: {}
      }
    });
    window.location.href = "/login";
  } else {
    //set current user
    applyTokenToRequestHeaders(token);
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: {
        user: data
      }
    });
  }
}

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
