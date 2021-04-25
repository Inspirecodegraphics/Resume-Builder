import React, { useState } from "react";

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
export default function AccountDailog({ resume, open, setOpen }) {
	const [value, setValue] = useState(0);
	const { currentUser, currentResume } = useAuth();
	const type = [
		"Main Contact",
		"Social",
		"About",
		"Experience",
		"Education",
		"Certificate",
		"Achievement",
		"Technical Skills",
		"Honor & Awards",
		"Project",
		"Language",
		"Skill",
		"Interests",
	];
	const handleClose = () => {
		setOpen(false);
	};
	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			<Dialog
				open={open}
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
							value={value}
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

					{type[value] === "Main Contact" && (
						<AccountForm
							currentResume={currentResume}
							type={type[value]}
							currentUser={currentUser}
							handleClose={handleClose}
						></AccountForm>
					)}
					{type[value] === "Social" && (
						<SocialForm handleClose={handleClose}></SocialForm>
					)}
					{type[value] === "About" && (
						<AboutForm handleClose={handleClose}></AboutForm>
					)}
					{type[value] === "Experience" && (
						<ExperienceForm
							currentResume={currentResume}
							currentUser={currentUser}
							handleClose={handleClose}
						></ExperienceForm>
					)}
					{type[value] === "Education" && (
						<EducationForm
							currentResume={currentResume}
							currentUser={currentUser}
							handleClose={handleClose}
						></EducationForm>
					)}
					{type[value] === "Certificate" && (
						<CertificateForm
							currentResume={currentResume}
							currentUser={currentUser}
							handleClose={handleClose}
						></CertificateForm>
					)}
					{type[value] === "Achievement" && (
						<AchievementForm
							currentResume={currentResume}
							currentUser={currentUser}
							handleClose={handleClose}
						></AchievementForm>
					)}
					{type[value] === "Technical Skills" && (
						<TechnicalSkillsForm
							currentResume={currentResume}
							currentUser={currentUser}
							handleClose={handleClose}
						></TechnicalSkillsForm>
					)}
					{type[value] === "Honor & Awards" && (
						<AwardHonorForm
							currentResume={currentResume}
							currentUser={currentUser}
							handleClose={handleClose}
						></AwardHonorForm>
					)}
					{type[value] === "Project" && (
						<PersonalProject
							currentResume={currentResume}
							currentUser={currentUser}
							handleClose={handleClose}
						></PersonalProject>
					)}
					{type[value] === "Language" && (
						<LanguageForm
							currentResume={currentResume}
							currentUser={currentUser}
							handleClose={handleClose}
						></LanguageForm>
					)}
					{type[value] === "Skill" && (
						<SkillForm
							currentResume={currentResume}
							currentUser={currentUser}
							handleClose={handleClose}
						></SkillForm>
					)}
					{type[value] === "Interests" && (
						<InterestHobbiesForm
							currentResume={currentResume}
							currentUser={currentUser}
							handleClose={handleClose}
						></InterestHobbiesForm>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
// toDateString
