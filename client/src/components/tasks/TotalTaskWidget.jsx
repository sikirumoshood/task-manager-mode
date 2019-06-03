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
          style={{ fontSize: 30, opacity: "0.7", color: "white" }}
        />
      </Col>
      <Col className="col-md-4">
        <div id="n-tasks">{totalTasks}</div>
      </Col>
    </Row>
  );
}
