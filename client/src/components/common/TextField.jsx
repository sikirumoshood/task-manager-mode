import React, { Component } from "react";
import { Progress } from "reactstrap";
import isEmpty from "../../utils/isEmpty";
import PropTypes from "prop-types";
import Zoom from "react-reveal/Zoom";

class TextField extends Component {
  render() {
    return (
      <div
        className="form-group"
        style={{ textAlign: "left", marginTop: "4%" }}
      >
        <label htmlFor={this.props.name} style={{ color: "blue" }}>
          <b>{this.props.label} </b>
          <span style={{ color: "red" }}>{this.props.isrequired && "*"}</span>
        </label>
        <input
          style={{
            borderStyle: "none",
            width: "100%"
          }}
          className="animated"
          type={isEmpty(this.props.type) ? "" : this.props.type}
          id={this.props.name}
          name={this.props.name}
          onChange={this.props.onChange}
          placeholder={
            isEmpty(this.props.placeholder) ? "" : this.props.placeholder
          }
          value={isEmpty(this.props.value) ? "" : this.props.value}
          error={isEmpty(this.props.error) ? "" : this.props.error}
          isrequired={!isEmpty(this.props.isrequired)}
        />
        <Progress
          className={this.props.name + "-p"}
          value={0}
          color="primary"
        />
        <div>
          {this.props.error && (
            <span style={{ color: "red" }}>
              <Zoom delay="300" left cascade>
                <small>{this.props.error}</small>
              </Zoom>
            </span>
          )}
        </div>
      </div>
    );
  }
}
TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isrequired: PropTypes.bool
};
export default TextField;
