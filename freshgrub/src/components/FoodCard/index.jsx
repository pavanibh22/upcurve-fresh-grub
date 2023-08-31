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
	iconUpdateCallback,
	id,
}) => {
	const [count, setCount] = useState(0);
	const [cartItems, setCartItems] = useState([]);

	const localStorageData = localStorage.getItem("data");
	const userId = JSON.parse(localStorageData).userId;
	// console.log("userId: ", userId);

	const getItems = async () => {
		const res = await getAllItemsInCart(userId);
		if (res.data?.success) {
			const items = res.data?.cartItems;
			setCartItems(res.data?.cartItems);
			// console.log("res data: ", res.data?.cartItems);
			if (items.length > 0) {
				const cart = items.filter((cart) => cart?.item[0]?.id === id);
				console.log("cart: ", cart);
				if (cart !== undefined && cart.length > 0) {
					setCount(cart[0]?.qty);
				} else {
					console.log("cart not found: ", cart);
					setCount(0);
					// setCount(count > 0 ? count : 0);
				}
			}
		}
	};

	// const updateFoodItemCard = () => {
	// 	if (cartItems.length > 0) {
	// 		const cart = cartItems.filter((cart) => cart?.item[0]?.id === id);
	// 		console.log("cart: ", cart);
	// 		if (cart !== [] && cart !== undefined) {
	// 			setCount(cart[0]?.qty);
	// 		} else {
	// 			console.log("cart not found: ", cart);
	// 			// setCount(count > 0 ? count : 0);
	// 		}
	// 	}
	// };

	const increment = async (count) => {
		const response = await addToCart(userId, {
			itemId: id,
			qty: count,
			isOrdered: false,
		});
		console.log("increment: ", response);
		// setCount(count+1);
	};

	const decrementThis = async () => {
		const response = await decrement(userId, { itemId: id });
		console.log("on decrement: ", response);
		if (count > 0) {
			setCount(count - 1);
		}
	};

	// useEffect(() => {
	// 	getItems();
	// 	// updateFoodItemCard();
	// }, []);

	useEffect(() => {
		getItems();
		// updateFoodItemCard();
		iconUpdateCallback !== undefined && iconUpdateCallback();
	}, [count]);

	const renderButton = () => {
		// console.log("redner: ", count);
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
						console.log("ADD BTN click");
						setCount(count + 1);
						// cartClickCallback();
						increment(count + 1);
						// getItems();
						// updateFoodItemCard();
					}}
				>
					ADD
				</Button>
			);
		} else if (count > 0) {
			return (
				<Box display='flex' gap='10px' width='100px'>
					<RemoveIcon
						sx={iconStyles}
						onClick={() => {
							setCount(count - 1);
							decrementThis();
							// getItems();
							// updateFoodItemCard();
						}}
					/>
					<Typography sx={iconStyles}>{count}</Typography>
					<AddIcon
						sx={iconStyles}
						onClick={() => {
							setCount(count + 1);
							increment(count + 1);
							// getItems();
							// updateFoodItemCard();
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
			<Typography variant='body2' color={"white"} sx={{fontSize : '15px',fontFamily: "fangsong"}}>
				{name}
			</Typography>
			<Box sx={innerBox}>
				<Typography
					variant='caption'
					color={"white"}
					sx={{fontSize:'15px',fontFamily: "fangsong",}}
				>{`Price ₹:${price}`}</Typography>
				<Box sx={{ display: "flex", gap: "10px" }}>
					{forCart && cartClickCallback ? (
						renderButton()
					) : forVendor ? (
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
