import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
class Index extends Component {
  render() {
    return (
      <div>
        <h3>General Task Manager (GTM)</h3>
        <Row>
          <Col className="col-md-5">
            <p>
              Welcome to react fontawesome{" "}
              <Button color="white" className="ml-4">
                <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
              </Button>
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Index;
