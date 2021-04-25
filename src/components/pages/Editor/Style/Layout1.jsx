import React from "react";
import Header from "../Resume/Header";
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
const Layout1 = () => {
	return (
		<div>
			<Header></Header>
			<div className="row px-4 py-1">
				<div className="col-6">
					<WorkExperience></WorkExperience>
					<Education></Education>
					<Certificates></Certificates>
					<Achievements></Achievements>
					<TechnicalSkills></TechnicalSkills>
					<Languages></Languages>
					<PersonalProjects></PersonalProjects>
				</div>
				<div className="col-6">
					<Honor></Honor>
					<Skills></Skills>
					<InterestHobbies></InterestHobbies>
				</div>
			</div>
		</div>
	);
};

export default Layout1;
