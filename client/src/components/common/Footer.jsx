import React from "react";
import { Row } from "reactstrap";
export default function Footer() {
  return (
    <div id="footer">
      <Row>
        <footer>Copyright &copy; {new Date().getFullYear()}</footer>
      </Row>
    </div>
  );
}
