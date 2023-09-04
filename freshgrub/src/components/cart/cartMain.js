import React from "react";
import CustomNavbar from "../Header/index.jsx";
import Cart from "./cart";
import { doLogout } from "../../auth";

const cartMain = () => {
	return (
		<div>
			<CustomNavbar onLogoutCallback={doLogout} />
			<Cart />
		</div>
	);
};

export default cartMain;
