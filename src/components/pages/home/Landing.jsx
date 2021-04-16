import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./Landing.css";
import { useAuth } from "../../../Providers/AuthProvider";

const Landing = () => {
	const { currentUser } = useAuth();
	return (
		<div className="container text-center ">
			<div className="row">
				<div className="col">
					<h4 className="p-2 py-4">The Online Resume Builder You Deserve</h4>
					<p className="p-2">
						Creating a Professional Resume and Cover Letter Has Never Been So
						Easy
					</p>

					<Button variant="outlined" className="mb-2">
						{currentUser ? (
							<Link className="text-dark px-2" to="/editor">
								Build My Resume
							</Link>
						) : (
							<Link className="text-dark px-2" to="/resume-templates">
								Get started for free
							</Link>
						)}
					</Button>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<p className="pt-2 m-auto" style={{ maxWidth: "500px" }}>
						Making a resume is the first step of any job search. Not sure how to
						make a resume? Our online resume builder gives you free resume
						templates to follow.
					</p>
					<hr
						className="m-auto my-3"
						style={{ width: "100px", height: "2px" }}
					/>
					<Button variant="outlined" className="mb-2">
						<Link className="text-dark px-2" to="/resume-templates">
							Get my free template
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Landing;
