import React from "react";
import { Table, Row, Col } from "reactstrap";
import uuid from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";
import {
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faTrashAlt,
  faCheck
} from "@fortawesome/free-solid-svg-icons";

import Moment from "react-moment";
import { Button } from "reactstrap";

export default function TableWidget({ tasks, ondelete, onedit, ontaskdone }) {
  const tasksRow = tasks.map(task => (
    <tr key={uuid()}>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>
        {" "}
        <Moment format="DD/MMM/YYYY">{task.created_at}</Moment>
      </td>
      <td>
        {task.done ? (
          <FontAwesomeIcon icon={faCheckCircle} style={{ color: "green" }} />
        ) : (
          <FontAwesomeIcon icon={faTimesCircle} style={{ color: "orange" }} />
        )}
      </td>
      <td>
        <Moment fromNow>{task.deadlineDate}</Moment>
      </td>
      <td>
        <Row>
          <Col className="col-md-1 ">
            <Button
              style={{
                backgroundColor: "#E4E2F2",
                margin: "3px",
                borderStyle: "none"
              }}
              taskid={task._id}
              type="button"
              size="sm"
              onClick={() => ontaskdone(task._id)}
              disabled={task.done}
            >
              <FontAwesomeIcon
                icon={faCheck}
                style={task.done ? { color: "grey" } : { color: "green" }}
              />
            </Button>
          </Col>
          <Col className="col-md-3 ml-2 mr-1">
            <Button
              style={{
                backgroundColor: "#E4E2F2",
                margin: "3px",
                borderStyle: "none"
              }}
              size="sm"
              taskid={task._id}
              type="button"
              onClick={() => onedit(task._id)}
            >
              <FontAwesomeIcon icon={faEdit} style={{ color: "blue" }} />
            </Button>
          </Col>
          <Col className="col-md-1">
            <Button
              style={{
                backgroundColor: "#E4E2F2",
                margin: "3px",
                borderStyle: "none"
              }}
              size="sm"
              taskid={task._id}
              type="button"
              onClick={() => ondelete(task._id)}
            >
              <FontAwesomeIcon icon={faTrashAlt} style={{ color: "red" }} />
            </Button>
          </Col>
        </Row>
      </td>
    </tr>
  ));
  return (
    <div style={{ width: "100%" }}>
      <Table responsive bordered hover>
        <thead style={{ backgroundColor: "black", color: "white" }}>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Created at</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Actions </th>
          </tr>
        </thead>
        <tbody>{tasksRow}</tbody>
      </Table>
    </div>
  );
}
TableWidget.propTypes = {
  tasks: PropTypes.array.isRequired
};
