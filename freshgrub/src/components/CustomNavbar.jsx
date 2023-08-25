import React from "react";
import { NavLink as ReactLink } from "react-router-dom";
import logo from "../pages/logo5.jpg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import {
	Collapse,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	Button,
	NavItem,
	NavLink,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	UncontrolledDropdown,
} from "reactstrap";

const CustomNavbar = ({
	isFoodItem,
	isVendor,
	buttonText,
	secondButtonText,
	onAddCallback,
	onDeleteCallback,
	badgeNumber,
}) => {
	return (
		<div>
			<Navbar color='dark' drak expand='md' fixed=''>
				<NavbarBrand tag={ReactLink} style={{ color: "white" }}>
					<img src={logo} width='40' height='40' alt='' />
					FreshGrub
				</NavbarBrand>
				<NavbarToggler onClick={function noRefCheck() {}} />
				{!isFoodItem
					? buttonText &&
					  secondButtonText &&
					  onDeleteCallback && (
							<NavItem>
								<Button
									color='primary'
									onClick={onAddCallback}
									style={{ marginRight: "20px" }}
								>
									{buttonText}
								</Button>
								<Button color='primary' onClick={onDeleteCallback}>
									{secondButtonText}
								</Button>
							</NavItem>
					  )
					: buttonText !== undefined && (
							<NavItem>
								{buttonText === "Go to cart" ? (
									<Badge badgeContent={badgeNumber} color='primary'>
										<ShoppingCartIcon
											sx={{ color: "white" }}
											onClick={() => {
												console.log("coming here: ");
												onAddCallback();
											}}
										/>
									</Badge>
								) : (
									<Button
										color='primary'
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
			</Navbar>
		</div>
	);
};

export default CustomNavbar;
