import React, { Component } from "react";
import hideUI from "../../utils/hideUI";
import animateTextField from "../../utils/animateTextField";
import BlueTop from "../common/BlueTop";
import TextField from "../common/TextField";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authAction";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const loginData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(loginData, this.props.history);
  };
  render() {
    return (
      <React.Fragment>
        <BlueTop text="Login Area" />
        <div id="loginArea">
          <h3>General Task Manager (GTM) </h3>
          <p>Login Here</p>
          <br />
          <form onSubmit={this.handleSubmit} noValidate>
            <TextField
              label="E-mail"
              name="email"
              type="text"
              placeholder="Enter your email address..."
              onChange={this.handleChange}
              error={this.state.errors.email}
              value={this.state.email}
              isRequired={true}
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password..."
              onChange={this.handleChange}
              error={this.state.errors.password}
              value={this.state.password}
              isRequired={true}
            />

            <Button
              style={{
                backgroundColor: "blue",
                borderStyle: "none",
                marginTop: "3%"
              }}
              size="sm"
            >
              Login
            </Button>
            <p className="mt-3">
              Don't have an account yet ? register{" "}
              <Link to="/register">here</Link>
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

Login.propTypes = {
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
