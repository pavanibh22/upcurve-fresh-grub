import { Box, Typography, Icon, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import getAllItemsInCart from "../../services/Cart/getAllCartItems";
import AddIcon from "@mui/icons-material/Add";
import addToCart from "../../services/Cart/addToCart";
import decrement from "../../services/Cart/decrementItem";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";

const boxStyles = {
	width: "250px",
	height: "250px",
	backgroundColor: "#36454F",
	display: "flex",
	borderRadius: "10px",
	padding: "2px",
	justifyContent: "center",
	alignItems: "center",
	flexWrap: "wrap",
	flexDirection: "column",
};

const innerBox = {
	paddingTop: "10px",
	paddingLeft: "20px",
	paddingRight: "20px",
	borderRadius: "10px",
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between",
	alignItems: "center",
	gap: "10px",
	width: "100%",
};

const iconStyles = {
	color: "white",
	// backgroundColor: "black",
	// borderRadius: "50%",
	//padding: "10px",
	fontSize: "25px", // Increase the font size for larger icons
	cursor: "pointer", // Add cursor pointer on hover
};

const addIconStyles = {
	color: "white",
	// backgroundColor: "black",
	// borderRadius: "50%",
	//padding: "10px",
	fontSize: "25px", // Increase the font size for larger icons
	cursor: "pointer", // Add cursor pointer on hover
};

const FoodCard = ({
	name,
	price,
	img,
	width = 150,
	height = 150,
	forCart,
	forVendor,
	cartClickCallback,
	onEditCallback,
	onDeleteCallback,
	id,
}) => {
	const [count, setCount] = useState(0);
	const [cartItems, setCartItems] = useState([]);

	const localStorageData = localStorage.getItem("data");
	const userId = JSON.parse(localStorageData).userId;
	console.log("userId: ", userId);

	const getItems = async () => {
		console.log("id: ", id);
		const res = await getAllItemsInCart(userId);
		if (res.data?.success) {
			setCartItems(res.data);
			console.log("res data: ", res.data?.cartItems);
		}
	};

	const increment = async () => {
		const response = await addToCart(userId, { itemId: id, isOrdered: false });
		console.log("add to cart: ", response);
	};

	const decrementThis = async () => {
		const response = await decrement(userId, { itemId: id });
		console.log("on decrement: ", response);
		// decrement(userId, {
		// 	itemId: id,
		// }).then((r) =>
		// 	r.data?.success
		// 		? (setQtyy(qtyy - 1), updateParent(), setDisabled(false))
		// 		: toast.error("Failed: " + r?.data?.message, setDisabled(false))
		// );
	};

	useEffect(() => {
		getItems();
	}, [count]);

	const renderButton = () => {
		console.log("redner: ", count);
		if (count === 0) {
			return (
				<Button
					variant='contained'
					sx={{
						backgroundColor: "#ff7f50", // Set button color to pink
						fontSize: "16px", // Increase font size
						padding: "8px 20px", // Add padding
					}}
					onClick={() => {
						setCount(count + 1);
						cartClickCallback();
					}}
				>
					ADD
				</Button>
			);
		} else if (count > 0) {
			return (
				<Box display='flex' gap='10px' width='100px'>
					<AddIcon
						sx={iconStyles}
						onClick={() => {
							setCount(count + 1);
							increment();
						}}
					/>
					<Typography sx={iconStyles}>{count}</Typography>
					<RemoveIcon
						sx={iconStyles}
						onClick={() => {
							setCount(count - 1);
							decrementThis();
						}}
					/>
				</Box>
			);
		}
	};

	return (
		<Box sx={boxStyles}>
			<img
				src={`data:image/jpeg;base64,${img}`}
				width={width}
				height={height}
			/>
			<Typography variant='body2' color={"white"}>
				{name}
			</Typography>
			<Box sx={innerBox}>
				<Typography
					variant='caption'
					color={"white"}
				>{`Price ₹:${price}`}</Typography>
				<Box sx={{ display: "flex", gap: "10px" }}>
					{forCart && cartClickCallback ? (
						renderButton()
					) : forVendor ? (
						// <ShoppingCartIcon sx={iconStyles} onClick={cartClickCallback} />
						<>
							<EditIcon sx={iconStyles} onClick={onEditCallback} />
							<DeleteIcon sx={iconStyles} onClick={onDeleteCallback} />
						</>
					) : null}
				</Box>
			</Box>
		</Box>
	);
};

export default FoodCard;
