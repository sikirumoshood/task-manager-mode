import React, { Component } from "react";
import hideUI from "../../utils/hideUI";
import NavBar from "./NavBar";
import img from "../../img/pic.jpg";
import ImageWidget from "./ImageWidget";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faColumns,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { faChartArea } from "@fortawesome/free-solid-svg-icons";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import TotalTaskWidget from "../tasks/TotalTaskWidget";
import TableWidget from "./TableWidget";
class Dashboard extends Component {
  renderLeftPane() {
    return (
      <Col id="left-pane" className="col-md-3">
        <p className="text-muted">
          {" "}
          <FontAwesomeIcon icon={faTasks} style={{ color: "purple" }} /> Task
          summary{" "}
        </p>

        <TotalTaskWidget
          color="purple"
          totalTasks="73"
          icon={faReceipt}
          label="Total tasks"
        />

        <TotalTaskWidget
          color="green"
          totalTasks="30"
          icon={faCheckCircle}
          label="Completed tasks"
        />

        <TotalTaskWidget
          color="#5E0002"
          totalTasks="30"
          icon={faTimesCircle}
          label="Uncompleted tasks"
        />
      </Col>
    );
  }

  renderRightPane() {
    return (
      <Col id="right-pane" className="col-md-8">
        <p className="text-muted">
          {" "}
          <FontAwesomeIcon
            icon={faMicrochip}
            style={{ color: "purple" }}
          />{" "}
          Operations
          <br />
          <Row>
            <Button type="button" color="primary" size="sm" className="m-4">
              <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} /> Add
              task
            </Button>
          </Row>{" "}
          <FontAwesomeIcon icon={faListAlt} style={{ color: "purple" }} /> All
          tasks
          <br />
          <Row className="m-2 p-3" style={{ width: "100%" }}>
            <TableWidget />
            {this.renderPaginationButtons()}
          </Row>
          <Row />
        </p>
      </Col>
    );
  }

  renderPaginationButtons() {
    return (
      <div>
        <Row className="p-5">
          <Button
            style={{
              backgroundColor: "#E4E2F2",
              margin: "5px",
              borderStyle: "none"
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} style={{ color: "black" }} />
          </Button>
          <Button
            style={{
              backgroundColor: "#E4E2F2",
              margin: "5px",
              borderStyle: "none"
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} style={{ color: "black" }} />
          </Button>
        </Row>
      </div>
    );
  }
  render() {
    return (
      <div>
        <NavBar />
        <ImageWidget imgUrl={img} />
        <div id="dashboard-pane">
          <p style={{ marginTop: "6%", marginBottom: "3%" }}>
            <FontAwesomeIcon icon={faColumns} style={{ color: "purple" }} />{" "}
            {"  "}
            Dashboard
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "purple", textAlign: "right" }}
            />{" "}
            Username Here
          </p>
          <Row>
            {this.renderLeftPane()}
            {this.renderRightPane()}
          </Row>
          <Row style={{ width: "96%", marginLeft: "2px" }}>
            <Col id="bottom-pane" className="col-md-12 m-auto">
              <p className="text-muted">
                {" "}
                <FontAwesomeIcon
                  icon={faChartArea}
                  style={{ color: "purple" }}
                />{" "}
                Chart area
              </p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
  componentDidMount() {
    hideUI();
  }
}

export default Dashboard;
