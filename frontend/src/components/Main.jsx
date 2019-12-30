import React, { Component } from "react";
import MyNav from "./Navbar";
import Login from "./Login";
export class Main extends Component {
  render() {
    return (
      <div>
        <MyNav></MyNav>
        <Login></Login>
      </div>
    );
  }
}

export default Main;
