import { useState, useEffect } from "react";
import { Box, Typography, Popover } from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "#0a071a;",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const CustomModal = (openModal, children, modalCloseCallback) => {
	// const [open, setOpen] = useState(openModal);

	// useEffect(() => {
	// 	setOpen(openModal);
	// }, [openModal]);

	// const [anchorEl, setAnchorEl] =
	// 	(useState < HTMLButtonElement) | (null > null);

	// const handleClick = (event) => {
	// 	setAnchorEl(event.currentTarget);
	// };

	// const handleClose = () => {
	// 	setAnchorEl(null);
	// };

	// const open = Boolean(anchorEl);
	// const id = open ? "simple-popover" : undefined;

	return (
		<Popover
			id={"modal"}
			open={openModal}
			onClose={modalCloseCallback}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left",
			}}
		>
			<Box sx={style}>{children}</Box>
		</Popover>
	);
};

export default CustomModal;
