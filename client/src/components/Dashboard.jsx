import React, { Component } from "react";
import hideUI from "../utils/hideUI";
class Dashboard extends Component {
  render() {
    return (
      <div>
        <p>Welcome to dashboard</p>
      </div>
    );
  }
  componentDidMount() {
    hideUI();
  }
}

export default Dashboard;
