import React from "react";
import { NavLink as ReactLink } from "react-router-dom";

import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
} from "reactstrap";

const CustomNavbar1 = () => {
  return (
    <div>
      <Navbar color="dark" drak expand="md" fixed="">
        <NavbarBrand tag={ReactLink}  style={{ color: "white" }}>
        <img src="https://github.com/pavanibh22/upcurve-fresh-grub/blob/Homepage/logo5.jpg?raw=true" width="30" height="30" alt=""/>
          FreshGrub
        </NavbarBrand>
        <NavbarBrand tag={ReactLink} to="/" style={{ color: "white" }}>
          Logout
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() {}} />
 
      </Navbar>
    </div>
  );
};

export default CustomNavbar1;
