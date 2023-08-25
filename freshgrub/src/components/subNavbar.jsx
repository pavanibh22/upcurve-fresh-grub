import React from "react";
import { Box, Typography } from "@mui/material";

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

// const boxStyles = {
// 	width: "100%",
// 	height: "50px",
// 	marginTop: "10px",
// 	marginBottom: "10px",
// 	display: "flex",
// 	flexDirection: "row",
// 	justifyContent: "center",
// 	alignItems: "center",
// };

const SubNavbar = ({
	title,
	forVendor,
	buttonText,
	secondButtonText,
	onAddCallback,
	onDeleteCallback,
}) => {
	return (
		<Box
			sx={{
				//...boxStyles,
				display: "flex",
        		justifyContent: "space-between",
        		alignItems: "center",
        		width: "100%",
        		height: "50px",
        		marginTop: "10px",
        		marginBottom: "10px",
				backgroundColor: "transparent",
				padding:"0 20px",
				//paddingRight:"20px",
			}}
		>
			<Typography
				variant='h5'
				//color={forVendor ? "yellow" : "black"}
				sx={{ flex: 1 ,textAlign: "center" ,fontSize: "45px", // Increase font size
				fontFamily: "fangsong",
				fontWeight:"bold",
				color: "#FFA500",}}

				
			>
				{title}
			</Typography>
			{forVendor && buttonText && secondButtonText && onDeleteCallback && (
				<Box>
					<Button
						variant="contained"
						color='primary'
						onClick={onAddCallback}
						style={{ marginRight: "20px" }}
					>
						{buttonText}
					</Button>
					<Button   variant="contained" color='primary' onClick={onDeleteCallback}>
						{secondButtonText}
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default SubNavbar;
