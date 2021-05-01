import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import WorkExperience from "../Resume/WorkExperience";
import Achievements from "../Resume/Achievements";
import Education from "../Resume/Education";
import Languages from "../Resume/Languages";
import TechnicalSkills from "../Resume/TechnicalSkills";
import PersonalProjects from "../Resume/PersonalProject";
import Honor from "../Resume/AwardHonor";
import Certificates from "../Resume/Certificates";
import Skills from "../Resume/Skills";
import InterestHobbies from "../Resume/InterestHobbies";
import Contact from "../Resume/Contact";
import MainContact from "./../Resume/MainContact";
import AboutMe from "./../Resume/AboutMe";
import "./Layout2.css";
const Layout2 = () => {
	return (
		<div
			className="container-fluid h-100 m-0 p-0 layout-2"
			style={{ width: "inherit" }}
		>
			<div
				className="row m-0"
				style={{ height: "inherit", maxHeight: "297mm", width: "inherit" }}
			>
				<div className="col-12 top-line">
					<div className="row">
						<div className="col-8 pe-0">
							<hr />
						</div>
						<div className="col-2 px-0">
							<h4 className="text text-center">Hello, I'm</h4>
						</div>
						<div className="col-2 ps-0">
							<hr />
						</div>
					</div>
				</div>
				<div className="col-4 ps-3 pe-0 py-2 pt-3 layout2-left">
					<Contact></Contact>
					<Languages></Languages>
					<TechnicalSkills></TechnicalSkills>

					<Skills></Skills>
					<Certificates></Certificates>

					<InterestHobbies></InterestHobbies>
				</div>
				<div className="col-8 py-2">
					<MainContact></MainContact>
					<AboutMe></AboutMe>
					<WorkExperience></WorkExperience>
					<Education></Education>
					<PersonalProjects></PersonalProjects>
					<Honor></Honor>
				</div>
			</div>
		</div>
	);
};

export default Layout2;

// <div className="row px-4 py-1">
//   <div className="col-6">
//     <Achievements></Achievements>
//   </div>
//   <div className="col-6">
//   </div>
// </div>
