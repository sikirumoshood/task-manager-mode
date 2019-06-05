import React, { Component } from "react";
import hideUI from "../../utils/hideUI";
import NavBar from "./NavBar";
import img from "../../img/pic.jpg";
import ImageWidget from "./ImageWidget";
import { Row, Col, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
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
import TextField from "../common/TextField";
import animateTextField from "../../utils/animateTextField";
import { createTask } from "../../redux/actions/taskAction";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      deadlineDate: "",
      done: false,
      modalIsOpen: false,
      errors: {}
    };
  }

  toggle = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  };
  handleSubmit = e => {
    e.preventDefault();
    const data = {};
    data.title = this.state.title;
    data.description = this.state.description;
    data.deadlineDate = this.state.deadlineDate;
    data.done = false;
    this.props.createTask(data);
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  renderModal = () => {
    return (
      <div>
        <Modal isOpen={this.state.modalIsOpen} toggle={this.toggle} centered>
          <ModalHeader toggle={this.toggle}>Add new task</ModalHeader>
          <ModalBody style={{ backgroundColor: "#F2F7F6" }}>
            <form onSubmit={this.handleSubmit}>
              <TextField
                label="Title"
                type="text"
                name="title"
                placeholder="Enter task title..."
                onChange={this.handleChange}
                error={this.state.errors.title}
                value={this.state.title}
                isrequired={true}
              />
              <TextField
                label="Description"
                type="text"
                name="description"
                placeholder="Enter task description..."
                onChange={this.handleChange}
                error={this.state.errors.description}
                value={this.state.description}
                isrequired={true}
              />
              <TextField
                label="Deadline date"
                type="date"
                name="deadlineDate"
                placeholder="Enter task deadline date..."
                onChange={this.handleChange}
                error={this.state.errors.deadlineDate}
                value={this.state.deadlineDate}
                isrequired={true}
              />

              <Button color="primary">Submit</Button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  };
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
        </p>
        <Row>
          <Button
            onClick={this.toggle}
            type="button"
            color="primary"
            size="sm"
            className="m-4"
          >
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
        {this.renderModal()}

        <NavBar onLogout={this.handleLogout} />
        <ImageWidget imgUrl={this.props.auth.user.avatar} />
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
    animateTextField();
    this.createChart();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
  task: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  task: state.task,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getTasks, logoutUser, createTask }
)(withRouter(Dashboard));
