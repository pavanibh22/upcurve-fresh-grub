import React from "react";
import { useHistory } from "react-router-dom";
import { NavLink as ReactLink, useLocation } from "react-router-dom";
import logo from "../../pages/logo5.jpg";
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
	onLogoutCallback,
}) => {
	const location = useLocation();

	const handleLogout = () => {
		sessionStorage.removeItem("token"); // Remove user token
		onLogoutCallback();
		//history.push("/login"); // Redirect to the login page
	};

	return (
		<div>
			<Navbar color='dark' expand='md' fixed=''>
				<NavbarBrand
					tag={ReactLink}
					to='/'
					style={{
						color: "white",
						textDecoration: "none",
						display: "flex",
						alignItems: "center",
						transition: "color 0.3s",
						fontSize: "24px",
						fontFamily: "fangsong",
					}}
					onMouseEnter={(e) => (e.target.style.color = "orange")}
					onMouseLeave={(e) => (e.target.style.color = "white")}
				>
					<img src={logo} width='45' height='45' alt='' />
					FreshGrub
				</NavbarBrand>
				<Nav className='ms-auto'>
					{buttonText !== undefined && (
						<NavItem className='my-auto'>
							{buttonText === "Go to cart" ? (
								<div style={{padding:"10px",marginRight:"20px"}}>
									<Badge badgeContent={badgeNumber} color='primary'>
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
					{onLogoutCallback && (
						<NavItem>
							<Button
								color='primary'
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
					)}
				</Nav>
			</Navbar>
		</div>
	);
};

export default CustomNavbar;
