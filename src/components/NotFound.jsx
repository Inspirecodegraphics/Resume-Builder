import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="container">
			<div
				style={{ height: "90vh" }}
				className="row text-center d-flex align-items-center justify-content-center"
			>
				<div className="col">
					<h4>SORRY, PAGE NOT FOUND</h4>
					<h4>HEY BUDDY, IT LOOKS LIKE YOU'RE LOST.</h4>
					<h5>
						Go back<Link to="/"> Home</Link>
					</h5>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
