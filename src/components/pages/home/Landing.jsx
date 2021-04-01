import React from "react";
import Button from "@material-ui/core/Button";
import "./Landing.css";
const Landing = () => {
	return (
		<div className="container text-center landing">
			<h3 className="text-center">The Online Resume Builder You Deserve</h3>
			<p>
				Creating a Professional Resume and Cover Letter Has Never Been So Easy
			</p>
			<Button variant="outlined">Get Started for Free</Button>
			<div className="row landing-img-outer">
				<div className="col">
					<img
						src="https://d.novoresume.com/images/hmx/resume-builder.png"
						alt=""
						className="img-fluid"
					/>
					<img
						src="https://d.novoresume.com/images/hmx/share-advice.png"
						alt=""
						className="img-fluid r1"
					/>
					<img
						src="https://d.novoresume.com/images/hmx/themes.png"
						alt=""
						className="img-fluid r2"
					/>
				</div>
			</div>
		</div>
	);
};

export default Landing;
