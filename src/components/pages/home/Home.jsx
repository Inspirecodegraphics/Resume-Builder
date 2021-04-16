import React from "react";
import ClipPath from "../../common/ClipPath";
import AwesomeFeatures from "./AwesomeFeatures";
import Benefits from "./Benefits";
import Landing from "./Landing";

const Home = () => {
	return (
		<div className="home">
			<Landing></Landing>
			<ClipPath></ClipPath>
			<Benefits></Benefits>
			<ClipPath></ClipPath>
			<AwesomeFeatures></AwesomeFeatures>
		</div>
	);
};

export default Home;
