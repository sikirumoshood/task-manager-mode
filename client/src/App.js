import React, { Component } from "react";
import "./App.css";
import { Container, Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  render() {
    return (
      <Container>
        <h3>Hello World</h3>
        <Row>
          <Col className="col-md-5">
            <p>
              Welcome to react fontawesome{" "}
              <Button color="white" className="ml-4">
                <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
              </Button>
            </p>
          </Col>

          <Col />
        </Row>
      </Container>
    );
  }
}
export default App;
