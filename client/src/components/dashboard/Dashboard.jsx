import React, { Component } from "react";
import hideUI from "../../utils/hideUI";
import NavBar from "./NavBar";
import img from "../../img/pic.jpg";
import ImageWidget from "./ImageWidget";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart from "chart.js";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getTasks } from "../../redux/actions/taskAction";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authAction";
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
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import TotalTaskWidget from "../tasks/TotalTaskWidget";
import TableWidget from "./TableWidget";
import isEmpty from "../../utils/isEmpty";

class Dashboard extends Component {
  renderLeftPane = () => {
    return (
      <Col id="left-pane" className="col-md-3">
        <p className="text-muted">
          {" "}
          <FontAwesomeIcon icon={faTasks} style={{ color: "purple" }} /> Task
          summary{" "}
        </p>

        <TotalTaskWidget
          color="purple"
          totalTasks={
            isEmpty(this.props.task.stats.total) ? (
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                style={{ color: "white" }}
              />
            ) : (
              this.props.task.stats.total
            )
          }
          icon={faReceipt}
          label="Total tasks"
        />

        <TotalTaskWidget
          color="green"
          totalTasks={
            isEmpty(this.props.task.stats.completed) ? (
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                style={{ color: "white" }}
              />
            ) : (
              this.props.task.stats.completed
            )
          }
          icon={faCheckCircle}
          label="Completed tasks"
        />

        <TotalTaskWidget
          color="#5E0002"
          totalTasks={
            isEmpty(this.props.task.stats.uncompleted) ? (
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                style={{ color: "white" }}
              />
            ) : (
              this.props.task.stats.uncompleted
            )
          }
          icon={faTimesCircle}
          label="Uncompleted tasks"
        />
      </Col>
    );
  };

  renderRightPane = () => {
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
            {isEmpty(this.props.task.tasks) ? (
              <FontAwesomeIcon
                className="m-auto"
                icon={faSpinner}
                spin
                style={{ color: "blue" }}
              />
            ) : (
              <TableWidget tasks={this.props.task.tasks} />
            )}
          </Row>
          <Row />
        </p>
        {this.renderPaginationButtons()}
      </Col>
    );
  };

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

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  render() {
    return (
      <div>
        <NavBar onLogout={this.handleLogout} />
        <ImageWidget imgUrl={img} />
        <div id="dashboard-pane">
          <p style={{ marginTop: "6%", marginBottom: "3%" }}>
            <FontAwesomeIcon icon={faColumns} style={{ color: "purple" }} />{" "}
            {"  "}
            Dashboard
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "purple", marginLeft: "30px" }}
            />{" "}
            {this.props.auth.loading ? "loading..." : this.props.auth.user.name}
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
              <canvas id="myChart" style={{ width: "400px", height: "100px" }}>
                Not supported
              </canvas>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  componentDidMount() {
    hideUI();
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.getTasks();

    this.createChart();
  }

  createChart() {
    const ctx = document.getElementById("myChart").getContext("2d");

    var chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            fill: false, //Don't show area under curve
            label: "Vote count",
            data: [12, 19, 3, 5, 2, 3],

            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          },
          {
            label: "Vote count 2",
            data: [3, 11, 5, 7, 2, 18],

            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  task: state.task
});
export default connect(
  mapStateToProps,
  { getTasks, logoutUser }
)(withRouter(Dashboard));
