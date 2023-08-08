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

const CustomNavbar = () => {
  return (
    <div>
      <Navbar color="dark" drak expand="md" fixed="">
        <NavbarBrand tag={ReactLink}  style={{ color: "white" }}>
        <img src="https://github.com/pavanibh22/upcurve-fresh-grub/blob/Homepage/logo5.jpg?raw=true"  width="40" height="40" alt=""/>
          FreshGrub
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() {}} />
 
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
