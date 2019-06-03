import React, { Component } from "react";
import hideUI from "../../utils/hideUI";
import BlueTop from "../common/BlueTop";
import animateTextField from "../../utils/animateTextField";
import TextField from "../common/TextField";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../redux/actions/authAction";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const regData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(regData, this.props.history);
  };
  render() {
    return (
      <React.Fragment>
        <BlueTop text="Registration Area" />
        <div id="registerArea">
          <h3>General Task Manager (GTM) </h3>
          <p>Register</p>
          <br />
          <form onSubmit={this.handleSubmit} noValidate>
            <TextField
              label="Full name"
              name="name"
              type="text"
              placeholder="Enter name ..."
              onChange={this.handleChange}
              error={this.state.errors.name}
              value={this.state.name}
              isrequired={true}
            />

            <TextField
              label="E-mail"
              name="email"
              type="text"
              placeholder="Enter email"
              onChange={this.handleChange}
              error={this.state.errors.email}
              value={this.state.email}
              isrequired={true}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={this.handleChange}
              error={this.state.errors.password}
              value={this.state.password}
              isrequired={true}
            />
            <TextField
              label="Password"
              name="password2"
              type="password"
              placeholder="Confirm password"
              onChange={this.handleChange}
              error={this.state.errors.password2}
              value={this.state.password2}
              isrequired={true}
            />

            <Button
              style={{
                backgroundColor: "blue",
                borderStyle: "none",
                marginTop: "3%"
              }}
              size="sm"
            >
              Submit
            </Button>
            <p className="mt-3">
              Already have an account? Login <Link to="/login">here</Link>
            </p>
          </form>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    hideUI();
    animateTextField();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
}

Register.propType = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
