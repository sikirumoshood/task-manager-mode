import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import showUI from "../utils/showUI";

class Index extends Component {
  render() {
    return (
      <div id="float">
        <h3 style={{ fontSize: "2.5em" }}>General Task Manager (GTM)</h3>
        <p style={{ fontFamily: "Kanit", color: "skyblue", marginTop: "5%" }}>
          {" "}
          A tool that helps manage all your tasks in the simplest and intuitive
          manner possible.
          <br />
          Do you want to be able to view and take control of your daily
          schedule? <br />
          Then this tool is for you.
        </p>

        <Row>
          <Col className="md-2">
            <Link
              to="/register"
              className="btn"
              style={{
                backgroundColor: "blue",
                borderStyle: "none",
                color: "white",
                marginBottom: "4%"
              }}
            >
              Get Started!
            </Link>
          </Col>

          <Col className="md-2">
            <Link
              to="/login"
              className="btn"
              style={{
                backgroundColor: "red",
                borderStyle: "none",
                color: "white",
                marginBottom: "4%"
              }}
            >
              Sign in
            </Link>
          </Col>
        </Row>
      </div>
    );
  }

  componentDidMount() {
    showUI();
  }
}

export default Index;
