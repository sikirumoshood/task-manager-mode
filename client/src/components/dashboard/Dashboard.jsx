import React, { Component } from "react";
import hideUI from "../../utils/hideUI";
import NavBar from "./NavBar";
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
import {
  createTask,
  editTask,
  deleteTask,
  taskDone,
  fetchNext
} from "../../redux/actions/taskAction";
import axios from "axios";
import moment from "moment";
import { Bar } from "react-chartjs-2";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      deadlineDate: "",
      done: false,
      addTaskModalIsOpen: false,
      editTaskModalIsOpen: false,
      errors: {},
      taskToEdit: {},
      skipValue: 10,
      next: false,
      prev: false,
      stats: {},
      chartData: {}
    };
  }

  resetState = () => {
    this.setState({ title: "", description: "", deadlineDate: "" });
  };
  toggleAddTaskModal = () => {
    this.resetState();
    this.setState({ addTaskModalIsOpen: !this.state.addTaskModalIsOpen });
  };
  toggleEditTaskModal = () => {
    this.setState({ editTaskModalIsOpen: !this.state.editTaskModalIsOpen });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = {};
    data.title = this.state.title;
    data.description = this.state.description;
    data.deadlineDate = this.state.deadlineDate;
    data.done = false;
    this.props.createTask(data);
    this.resetState(); //Clear state fields
  };

  handleEditSubmit = e => {
    e.preventDefault();
    this.props.editTask(this.state.taskToEdit, this.state.skipValue - 5);
  };

  handleTaskDone = task_id => {
    const resp = window.confirm("Are you sure to mark task as COMPLETED? ");
    if (resp) {
      this.props.taskDone(task_id, this.state.skipValue - 5);
    }
  };

  handleNext = value => {
    this.props.fetchNext(value);
    this.setState({ skipValue: this.state.skipValue + 5 });
  };
  handlePrev = value => {
    this.props.fetchNext(value);
    this.setState({ skipValue: this.state.skipValue - 5 });
  };
  fetchDataToEdit = task_id => {
    axios
      .get(`/api/tasks/${task_id}`)
      .then(res => {
        this.setState({ taskToEdit: res.data });
        this.toggleEditTaskModal();
        //Clear errors object
        this.setState({ errors: {} });
      })
      .catch(err => console.log(err.response.data));
  };
  handleDelete = task_id => {
    //CALL DELETE ACTION FROM TASK_ACTIONS

    const resp = window.confirm("Are you sure about this");
    if (resp) {
      this.props.deleteTask(task_id, this.state.skipValue - 5);
    }
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleEditChange = e => {
    const taskToEdit = { ...this.state.taskToEdit };
    taskToEdit[e.target.name] = e.target.value;
    this.setState({ taskToEdit });
  };

  renderEditTaskModal = () => {
    return (
      <div>
        {" "}
        <Modal
          isOpen={this.state.editTaskModalIsOpen}
          toggle={this.toggleEditTaskModal}
          centered
        >
          <ModalHeader toggle={this.toggle}>Edit task</ModalHeader>
          <ModalBody style={{ backgroundColor: "#F2F7F6" }}>
            <form onSubmit={this.handleEditSubmit}>
              <TextField
                label="Title"
                type="text"
                name="title"
                placeholder="Enter task title..."
                onChange={this.handleEditChange}
                error={this.state.errors.title}
                value={this.state.taskToEdit.title}
                isrequired={true}
              />
              <TextField
                label="Description"
                type="text"
                name="description"
                placeholder="Enter task description..."
                onChange={this.handleEditChange}
                error={this.state.errors.description}
                value={this.state.taskToEdit.description}
                isrequired={true}
              />
              <TextField
                label="Deadline date"
                type="date"
                name="deadlineDate"
                placeholder="Enter task deadline date..."
                onChange={this.handleEditChange}
                error={this.state.errors.deadlineDate}
                value={moment(this.state.taskToEdit.deadlineDate).format(
                  "YYYY-MM-DD"
                )}
                isrequired={true}
              />

              <Button color="primary">Submit</Button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  };
  renderAddTaskModal = () => {
    return (
      <div>
        <Modal
          isOpen={this.state.addTaskModalIsOpen}
          toggle={this.toggleAddTaskModal}
          centered
        >
          <ModalHeader toggle={this.toggleAddTaskModal}>
            Add new task
          </ModalHeader>
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
    if (this.state.errors.tasks) {
      return (
        <Col className="col-md-10 m-auto">
          <div className="alert alert-info">
            Welcome {this.props.auth.user.name.split(" ")[1]}! It appears you
            are yet to create a task, click the <b>Add task</b> button below to
            add one
          </div>
        </Col>
      );
    }
    return (
      <Col id="left-pane" className="col-md-11">
        <p className="text-muted">
          {" "}
          <FontAwesomeIcon icon={faTasks} style={{ color: "purple" }} /> Task
          summary{" "}
        </p>
        <Row className="justify-content-center">
          <Col className="col-md-3">
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
          </Col>

          <Col className="col-md-3">
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
          </Col>
          <Col className="col-md-3">
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
        </Row>
      </Col>
    );
  };

  renderRightPane = () => {
    return (
      <Col id="right-pane" className="col-md-11">
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
            onClick={this.toggleAddTaskModal}
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
        {this.state.errors.tasks ? (
          <p>Please click on Add Task button to create a task</p>
        ) : (
          <Row className="m-2 p-3" style={{ width: "100%" }}>
            {isEmpty(this.props.task.tasks) ? (
              <FontAwesomeIcon
                className="m-auto"
                icon={faSpinner}
                spin
                style={{ color: "blue" }}
              />
            ) : (
              <TableWidget
                tasks={this.props.task.tasks}
                ondelete={this.handleDelete}
                onedit={this.fetchDataToEdit}
                ontaskdone={this.handleTaskDone}
              />
            )}
          </Row>
        )}
        <Row />
        {this.renderPaginationButtons()}
      </Col>
    );
  };

  renderPaginationButtons = () => {
    return (
      <div>
        <Row className="p-5">
          <Button
            style={{
              backgroundColor: "#E4E2F2",
              margin: "5px",
              borderStyle: "none"
            }}
            onClick={() => {
              this.handlePrev(this.state.skipValue - 10);
            }}
            disabled={!this.state.prev}
          >
            <FontAwesomeIcon icon={faChevronLeft} style={{ color: "black" }} />
          </Button>

          <Button
            style={{
              backgroundColor: "#E4E2F2",
              margin: "5px",
              borderStyle: "none"
            }}
            onClick={() => {
              this.handleNext(this.state.skipValue);
            }}
            disabled={!this.state.next}
          >
            <FontAwesomeIcon icon={faChevronRight} style={{ color: "black" }} />
          </Button>
        </Row>
      </div>
    );
  };

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  render() {
    return (
      <div>
        {this.renderAddTaskModal()}
        {this.renderEditTaskModal()}

        <NavBar onLogout={this.handleLogout} />
        <ImageWidget
          imgUrl={this.props.auth.loading ? "" : this.props.auth.user.avatar}
        />
        <div id="dashboard-pane">
          <p style={{ marginTop: "6%", marginBottom: "3%", marginLeft: "4%" }}>
            <FontAwesomeIcon icon={faColumns} style={{ color: "purple" }} />{" "}
            {"  "}
            Dashboard
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "purple", marginLeft: "30px" }}
            />{" "}
            {this.props.auth.loading ? "loading..." : this.props.auth.user.name}
          </p>
          <Row>{this.renderLeftPane()}</Row>
          <Row>{this.renderRightPane()}</Row>
          <Row style={{ width: "100%" }}>
            <Col id="bottom-pane" className="col-md-11 m-auto">
              <p className="text-muted">
                {" "}
                <FontAwesomeIcon
                  icon={faChartArea}
                  style={{ color: "purple" }}
                />{" "}
                Chart area
              </p>
              <div />
              <Bar
                width={200}
                height={50}
                data={this.state.chartData}
                options={{
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                          min: 0
                        }
                      }
                    ]
                  }
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  updateChartData = () => {
    this.setState({
      chartData: {
        labels: ["Complete", "Uncompleted"],
        datasets: [
          {
            label: "TASK ANALYSIS",
            data: [this.state.stats.completed, this.state.stats.uncompleted],
            backgroundColor: ["rgba(255,105,145,0.6)", "rgba(155,100,210,0.6)"]
          }
        ]
      }
    });
  };
  componentDidMount() {
    hideUI();
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.getTasks();

    animateTextField();
    // this.createChart();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.task) {
      this.setState({
        next: nextProps.task.paginate.next,
        prev: nextProps.task.paginate.prev,
        stats: nextProps.task.stats,
        chartData: {
          labels: ["Complete", "Uncompleted"],
          datasets: [
            {
              label: "TASK GRAPH",
              data: [
                nextProps.task.stats.completed,
                nextProps.task.stats.uncompleted
              ],
              backgroundColor: [
                "rgba(255,105,145,0.6)",
                "rgba(155,100,210,0.6)"
              ]
            }
          ]
        }
      });
      // this.updateChartData();
    }
  }

  //TODO SYNCHRONIZE CHART
  createChart = () => {
    const ctx = document.getElementById("myChart").getContext("2d");

    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        datasets: [
          {
            fill: true, //Don't show area under curve
            label: "COMPLETED-TASKS",
            data: [this.state.stats.completed],

            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 2
          },
          {
            fill: true, //Don't show area under curve
            label: "UNCOMPLETED-TASKS",
            data: [this.state.stats.uncompleted],

            borderColor: ["rgba(54, 162, 235, 1)"],
            backgroundColor: ["rgba(54, 162, 235, 1)"],
            borderWidth: 2
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
  };
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
  {
    getTasks,
    logoutUser,
    createTask,
    editTask,
    deleteTask,
    taskDone,
    fetchNext
  }
)(withRouter(Dashboard));
