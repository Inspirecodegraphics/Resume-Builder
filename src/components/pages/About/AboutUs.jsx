import React from "react";
import Team from "./Team";
import "./AboutUs.css";
const AboutUs = () => {
	function scrollToTop() {
		window.scrollTo(0, 0);
	}
	return (
		<div className="about">
			<section>
				<Team></Team>
			</section>
		</div>
	);
};

export default AboutUs;
