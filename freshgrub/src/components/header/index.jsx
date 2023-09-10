import React from "react";
import { Link, NavLink as ReactLink } from "react-router-dom";
import logo from "../../pages/logo5.jpg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import Profile from "../Profile/profile";

import { Nav, Button, NavItem, Navbar, NavbarBrand } from "reactstrap";
import jwtDecode from "jwt-decode";
import { ProductionQuantityLimits } from "@mui/icons-material";
import LogoPart from "./LogoPart";

const CustomNavbar = ({
  buttonText,
  secondButtonText,
  onAddCallback,
  badgeNumber,
  onLogoutCallback,
  isProfile,
}) => {
  //   const localStorageData = sessionStorage.getItem("data");
  //   const token = JSON.parse(localStorageData).token;
  //   const decodedValue = jwtDecode(token);
  //   console.log("decodedValue: ", decodedValue);
  //   const userId = decodedValue.id;

  let userId;
  const localStorageData = sessionStorage.getItem("data");

  if (localStorageData) {
    const token = JSON.parse(localStorageData).token;
    const decodedValue = jwtDecode(token);
    console.log("decodedValue: ", decodedValue);
    userId = decodedValue.id;
  } else {
    console.error("localStorageData is null or undefined");
  }

  return (
    <div>
      <Navbar color="dark" expand="md" fixed="">
        <LogoPart />
        <Nav className="ms-auto">
          {buttonText !== undefined && (
            <NavItem className="my-auto">
              {buttonText === "Go to cart" ? (
                <div style={{ padding: "10px", marginRight: "20px" }}>
                  <Badge badgeContent={badgeNumber} color="primary">
                    <ShoppingCartIcon
                      sx={{ fontSize: 28, color: "white" }}
                      onClick={() => {
                        console.log("coming here: ");
                        onAddCallback();
                      }}
                    />
                  </Badge>
                </div>
              ) : (
                <Button
                  color="primary"
                  onClick={() => {
                    console.log("coming here: ");
                    onAddCallback();
                  }}
                >
                  {buttonText}
                </Button>
              )}
            </NavItem>
          )}
          {isProfile && <Profile />}
          {/* {onLogoutCallback && (
            <NavItem>
              <Button
                color="primary"
                onClick={onLogoutCallback} // Call the logout callback function when clicked
                style={{
                  backgroundColor: "#339999",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontSize: "18px",
                  fontFamily: "fangsong",
                  cursor: "pointer",
                  transition: "background-color 0.2s, transform 0.2s",
                  marginRight: "10px",
                }}
                onMouseEnter={(e) => (e.target.style.color = "orange")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                Logout
              </Button>
            </NavItem>
          )} */}
          {/* <Profile /> */}
        </Nav>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
