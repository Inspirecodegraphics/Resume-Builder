import React, { useState, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useAuth } from "../../../../Providers/AuthProvider";
import AccountForm from "./Forms/AccountForm";
import ExperienceForm from "./Forms/ExperienceForm";
import SocialForm from "./Forms/SocialForm";
import EducationForm from "./Forms/EducationForm";
import CertificateForm from "./Forms/CertificateForm";
import AchievementForm from "./Forms/AchievementForm";
import TechnicalSkillsForm from "./Forms/TechnicalSkillsForm";
import AwardHonorForm from "./Forms/AwardHonorForm";
import PersonalProject from "./Forms/PersonalProjectForm";
import LanguageForm from "./Forms/LanguagesForm";
import SkillForm from "./Forms/SkillForm";
import InterestHobbiesForm from "./Forms/InterestsForm";
import AboutForm from "./Forms/AboutForm";

export default function AccountDailog({ technology }) {
	// const { currentUser, currentResume } = useAuth();
	const [dailogOpen, setDailogOpen] = useState(false);
	const [index, setIndex] = useState(0);

	const type = [
		"mainContent",
		"social",
		"about",
		"workExperience",
		"education",
		"project",
		"technicalSkills",
		"certificate",
		"achievement",
		"award",
		"language",
		"skill",
		"interest",
	];
	useEffect(() => {
		type.forEach((target) => {
			document.querySelectorAll(`.${target}`).forEach((doc) => {
				doc.addEventListener("click", (e) => {
					e.preventDefault();
					setIndex(type.indexOf(target));
					setDailogOpen(true);
				});
			});
		});
	}, []);

	const handleClose = () => {
		setDailogOpen(false);
	};
	const handleTabChange = (event, newValue) => {
		setIndex(newValue);
	};

	return (
		<div>
			<Dialog
				open={dailogOpen}
				onClose={handleClose}
				className="m-2"
				aria-labelledby="form-dialog-title"
			>
				<DialogContent>
					<Typography variant="h6" display="block">
						Account Settings
					</Typography>

					<Paper elevation={0} square>
						<Tabs
							value={index}
							indicatorColor="primary"
							textColor="primary"
							onChange={handleTabChange}
							variant="scrollable"
							scrollButtons="auto"
							aria-label="Settings Tab"
						>
							{type.map((type, index) => (
								<Tab key={index} label={type}></Tab>
							))}
						</Tabs>
					</Paper>

					{type[index] === "technicalSkills" && (
						<TechnicalSkillsForm
							technology={technology}
							handleClose={handleClose}
						></TechnicalSkillsForm>
					)}
					{type[index] === "mainContent" && (
						<AccountForm handleClose={handleClose}></AccountForm>
					)}
					{type[index] === "social" && (
						<SocialForm handleClose={handleClose}></SocialForm>
					)}
					{type[index] === "about" && (
						<AboutForm handleClose={handleClose}></AboutForm>
					)}
					{type[index] === "workExperience" && (
						<ExperienceForm handleClose={handleClose}></ExperienceForm>
					)}
					{type[index] === "education" && (
						<EducationForm handleClose={handleClose}></EducationForm>
					)}
					{type[index] === "certificate" && (
						<CertificateForm handleClose={handleClose}></CertificateForm>
					)}
					{type[index] === "achievement" && (
						<AchievementForm handleClose={handleClose}></AchievementForm>
					)}

					{type[index] === "award" && (
						<AwardHonorForm handleClose={handleClose}></AwardHonorForm>
					)}
					{type[index] === "project" && (
						<PersonalProject handleClose={handleClose}></PersonalProject>
					)}
					{type[index] === "language" && (
						<LanguageForm handleClose={handleClose}></LanguageForm>
					)}
					{type[index] === "skill" && (
						<SkillForm handleClose={handleClose}></SkillForm>
					)}
					{type[index] === "interest" && (
						<InterestHobbiesForm
							handleClose={handleClose}
						></InterestHobbiesForm>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
