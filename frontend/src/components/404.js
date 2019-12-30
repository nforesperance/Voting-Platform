import React from "react";
import { Link } from "react-router-dom";

class Error extends React.Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
       <h1>404 Error</h1>
        <h1>Sorry! This page does not exists</h1>
        <Link to="./">Return </Link>
      </div>
    );
  }
}

export default Error;
