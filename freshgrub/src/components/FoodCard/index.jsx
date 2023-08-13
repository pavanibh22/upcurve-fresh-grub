import { Box, Typography, Icon } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

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
};
const FoodCard = ({
	name,
	price,
	img,
	width = 150,
	height = 150,
	onEditCallback,
	onDeleteCallback,
}) => {
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
					<EditIcon sx={iconStyles} onClick={onEditCallback} />
					<DeleteIcon sx={iconStyles} onClick={onDeleteCallback} />
				</Box>
			</Box>
		</Box>
	);
};

export default FoodCard;
