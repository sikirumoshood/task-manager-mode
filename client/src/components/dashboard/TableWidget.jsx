import React from "react";
import { Table } from "reactstrap";
import uuid from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";
import {
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";

import Moment from "react-moment";
import { Button } from "reactstrap";

export default function TableWidget({ tasks }) {
  const tasksRow = tasks.map(task => (
    <tr key={uuid()}>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>
        {" "}
        <Moment fromNow>{task.deadlineDate}</Moment>
      </td>
      <td>
        {task.done ? (
          <FontAwesomeIcon icon={faCheckCircle} style={{ color: "green" }} />
        ) : (
          <FontAwesomeIcon icon={faTimesCircle} style={{ color: "orange" }} />
        )}
      </td>
      <td>
        <Moment format="Mo/MMM/YYYY">{task.created_at}</Moment>
      </td>
      <td>
        <div>
          <Button
            style={{
              backgroundColor: "#E4E2F2",
              margin: "5px",
              borderStyle: "none"
            }}
            taskid={task._id}
          >
            <FontAwesomeIcon icon={faTrashAlt} style={{ color: "red" }} />
          </Button>

          <Button
            style={{
              backgroundColor: "#E4E2F2",
              margin: "5px",
              borderStyle: "none"
            }}
            taskid={task._id}
          >
            <FontAwesomeIcon icon={faEdit} style={{ color: "blue" }} />
          </Button>
        </div>
      </td>
    </tr>
  ));
  return (
    <div style={{ width: "100%" }}>
      <Table responsive bordered>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Deadline Date</th>
            <th>Status</th>
            <th>Created at</th>
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
