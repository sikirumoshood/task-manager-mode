import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div id="n-bar">
        <Navbar
          style={{
            color: "white",
            backgroundColor: "rgb(9, 0, 88)",
            margin: 0
          }}
          expand="md"
        >
          <NavbarBrand href="/" style={{ color: "white" }}>
            <b>GTM</b>
          </NavbarBrand>
          <NavbarToggler
            style={{ backgroundColor: "white" }}
            onClick={this.toggle}
          >
            <FontAwesomeIcon icon={faBars} />
          </NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="float-right">
                <Button
                  type="button"
                  onClick={this.props.onLogout}
                  style={{ color: "white", backgroundColor: "transparent" }}
                >
                  Logout
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
