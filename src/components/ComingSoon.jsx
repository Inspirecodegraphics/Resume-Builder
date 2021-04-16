import React from "react";
import { Link } from "react-router-dom";

const ComingSoon = () => {
	return (
		<div className="container">
			<div
				style={{ height: "90vh" }}
				className="row text-center d-flex align-items-center justify-content-center"
			>
				<div className="col">
					<h4>This Page is under construction. Come back later.</h4>
					<h5>
						Go back<Link to="/"> Home</Link>
					</h5>
				</div>
			</div>
		</div>
	);
};

export default ComingSoon;
