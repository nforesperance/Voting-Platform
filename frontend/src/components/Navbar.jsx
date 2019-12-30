import React from "react";
import {
  Navbar,
  NavbarBrand,
} from "reactstrap";

class MyNav extends React.Component {
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
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">ASPY Voting Platform</NavbarBrand>
        </Navbar>
      </div>
    );
  }
}
export default MyNav;
