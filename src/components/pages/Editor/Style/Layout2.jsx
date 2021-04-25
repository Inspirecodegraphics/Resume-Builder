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
		<div className="container-fluid h-100 m-0 p-0 layout-2">
			<div
				className="row m-0"
				style={{ height: "inherit", maxHeight: "297mm" }}
			>
				<div className="col-4 ps-3 pe-0 py-2 layout2-left">
					<Contact></Contact>
					<Languages></Languages>
					<div className="container-fluid px-0 pb-3">
						<h6>
							<i class="fas fa-cogs"></i> <b>TECHNOLOGIES</b>
						</h6>
						<div className="row mx-0 py-1">
							<div className="col-2 px-1">
								<Skeleton variant="circle" width={25} height={25} />
							</div>
							<div className="col-10 px-1">
								<Skeleton animation="wave" variant="text" />
							</div>
						</div>
						<div className="row mx-0 py-1">
							<div className="col-2 px-1">
								<Skeleton variant="circle" width={25} height={25} />
							</div>
							<div className="col-10 px-1">
								<Skeleton animation="wave" variant="text" />
							</div>
						</div>
					</div>
					<Skills></Skills>
					<InterestHobbies></InterestHobbies>
				</div>
				<div className="col-8 px-3 py-2">
					<MainContact></MainContact>
					<AboutMe></AboutMe>
					<WorkExperience></WorkExperience>
					<Education></Education>
					<PersonalProjects></PersonalProjects>
					{/* <Certificates></Certificates> */}
					<Honor></Honor>
				</div>
			</div>
		</div>
	);
};

export default Layout2;

// <div className="row px-4 py-1">
//   <div className="col-6">
//     <Certificates></Certificates>
//     <Achievements></Achievements>
//     <TechnicalSkills></TechnicalSkills>
//   </div>
//   <div className="col-6">
//   </div>
// </div>
