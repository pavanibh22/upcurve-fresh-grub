import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Container, Row, Col } from "reactstrap";

import "./menu-pack.css";

const MenuPack = () => {
	const [filter, setFilter] = useState("Meals");
	const navigate = useNavigate();

	return (
		<section>
			<Container>
				<Row>
					<Col lg='12' className='text-center mb=4'>
						<h3 className='menu__title'>Categories</h3>
					</Col>
					<Col lg='12' className='text-center mb-5'>
						<button
							className={`filter-btn ${
								filter === "FAST-FOOD" ? "active__btn" : ""
							}`}
							onClick={() => {
								setFilter("FAST-FOOD");
								navigate("/fastfood");
							}}
						>
							{" 	Fast Food "}
						</button>
						<button
							className={`filter-btn ${
								filter === "MEALS" ? "active__btn" : ""
							}`}
							onClick={() => {
								setFilter("MEALS");
								navigate("/meals");
							}}
						>
							{"Meals "}
						</button>
						<button
							className={`filter-btn ${
								filter === "BEVERAGES" ? "active__btn" : ""
							}`}
							onClick={() => {
								setFilter("BEVERAGES");
								navigate("/beverages");
							}}
						>
							{"Beverages "}
						</button>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default MenuPack;
