import { Fragment, useState, useEffect } from "react";
import Header from "../components/header/Header";
import MenuPack from "../components/menu-pack/MenuPack.jsx";
import CustomModal from "../components/Modal";
import {
	Box,
	Typography,
	Autocomplete,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Button,
	DialogActions,
} from "@mui/material";
import { createCategory } from "../services/Categories/createCategory";
import { getAllCategories } from "../services/Categories/getAllCategories";
import { deleteCategories } from "../services/Categories/deleteCategory";

const VendorHome = () => {

	return (
		<Fragment>
			<Header isCategory />
			<MenuPack title={"categories"} />
		</Fragment>
	);
};
export default VendorHome;
