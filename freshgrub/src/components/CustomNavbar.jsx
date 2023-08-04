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
        <NavbarBrand tag={ReactLink} to="/" style={{ color: "white" }}>
          FreshGrub
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() {}} />
        <Collapse navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/login" style={{ color: "white" }}>
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about" style={{ color: "white" }}>
                About
              </NavLink>
            </NavItem>
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav style={{ color: "white" }}>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  tag={ReactLink}
                  to="/services"
                  style={{ color: "black" }}
                >
                  Services
                </DropdownItem>
                <DropdownItem style={{ color: "black" }}>
                  Contact Us
                </DropdownItem>
                {/* <DropdownItem divider />
                <DropdownItem>reset</DropdownItem> */}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
