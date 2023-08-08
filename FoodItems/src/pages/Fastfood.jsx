import FoodCard from "../components/FoodCard";
import Header from "../components/ItemsHeader";
import CustomModal from "../components/Modal";
import { useState } from "react";
import { TextField, Popover } from "@mui/material";

const FoodForm = () => {
	return (
		<>
			<TextField id='outlined-basic' label='Name' variant='outlined' />
			<TextField id='outlined-basic' label='Price' variant='outlined' />
			<TextField id='outlined-basic' label='Url' variant='outlined' />
		</>
	);
};

const Fastfood = () => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	return (
		<>
			<Header
				buttonText={"Add"}
				title={"FASTFOOD"}
				onButtonClick={(event) => {
					console.log("button clicked");
					setAnchorEl(event.currentTarget);
				}}
			/>
			<div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
				<FoodCard
					name='Chicken Pizza'
					img={"https://i.ibb.co/9gy1Jbr/it17.jpg"}
					price={"350"}
				/>
				<FoodCard
					name='Chicken Fried Rice'
					img={"https://i.ibb.co/wCv1Pq7/it13.jpg"}
					price={"250"}
				/>
				<FoodCard
					name='Chicken Manchuria'
					img={"https://i.ibb.co/2k2mLjS/it7.jpg"}
					price={"250"}
				/>
				<FoodCard
					name='Burger'
					img={"https://i.ibb.co/WvFKpmV/it5.jpg"}
					price={"370"}
				/>
			</div>
			{/* <Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
			>
				<TextField id='outlined-basic' label='Name' variant='outlined' />
			</Popover> */}
		</>
	);
};

export default Fastfood;
