import React, { useRef } from "react";
import "./header.css";
import { Container } from "reactstrap";

const navLinks = [
	{
		display: "",
		url: "#",
	},
];

const Header = () => {
	const menuRef = useRef();

	const menuToggle = () => menuRef.current.classList.toggle("active__menu");
	return (
		<header className='header'>
			<Container>
				<div className='navigation'>
					<div className='logo'>
						<h2 className='d-flex align-items-center gap-1'>
							<span>
								<i class='ri-account-circle-fill'></i>
							</span>{" "}
							Hello Vendor
						</h2>
					</div>
				</div>
			</Container>
		</header>
	);
};

export default Header;
