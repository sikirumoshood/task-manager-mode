import React from "react";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function TotalTaskWidget({ icon, totalTasks, color, label }) {
  return (
    <Row id="tt-w" style={{ backgroundColor: color }}>
      <Col className="col-md-6">
        <p id="t-label">{label}</p>
        <FontAwesomeIcon
          icon={icon}
          style={{ fontSize: 19, opacity: "0.8", color: "white" }}
        />
      </Col>
      <Col className="col-md-5 ml-3 ">
        <div id="n-tasks">{totalTasks}</div>
      </Col>
    </Row>
  );
}
