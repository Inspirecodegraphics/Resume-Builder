import React from "react";
import { useAuth } from "../../../../Providers/AuthProvider";
import _ from "lodash";
import Skeleton from "@material-ui/lab/Skeleton";

const AboutMe = () => {
	const { currentResume } = useAuth();

	const about = () => {
		return (
			<div className="pb-2">
				<h6 className="d-flex align-items-center mb-1">
					<div className="rb-icon-circle">
						<i className="fas fa-user"></i>
					</div>
					<b className="ps-2 about">{currentResume.about.label}</b>
				</h6>
				<p
					// style={{ height: "95px" }}
					className="rb-desc m-0 about"
				>
					{currentResume.about.about}
				</p>
			</div>
		);
	};
	const empty = () => {
		return (
			<div className="py-3">
				<h6 className="d-flex align-items-center">
					<div className="rb-icon-circle">
						<i className="fas fa-user"></i>
					</div>
					<b className="ps-2 about">ABOUT ME</b>
				</h6>
				<b>
					<p className="my-1 about">Description</p>
					<Skeleton animation="wave" variant="text" />
					<Skeleton animation="wave" variant="text" />
				</b>
			</div>
		);
	};

	// return empty();
	return currentResume && currentResume.about ? about() : empty();
};

export default AboutMe;
