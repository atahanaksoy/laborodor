import React from "react";
import "./Navbar.css";
import Navbar from "react-bootstrap/Navbar";

class navbar extends React.Component {
  render() {
    return (
      <Navbar bg="transparent" fixed="top">
        <Navbar.Brand>laborodor</Navbar.Brand>
      </Navbar>
    );
  }
}

export default navbar;
