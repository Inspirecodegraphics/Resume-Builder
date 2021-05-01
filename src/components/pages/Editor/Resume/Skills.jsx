import React from "react";
import { useAuth } from "../../../../Providers/AuthProvider";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	root: {
		margin: "0px 5px 0px 0px",
		padding: "0px 3px",
		minWidth: "unset",
		"& > *": {
			margin: theme.spacing(0),
		},
		fontWeight: "normal",
		lineHeight: "unset",
		display: "inline-block",
	},
}));
const Skills = () => {
	const classes = useStyles();

	const { currentResume } = useAuth();
	const skill = () => {
		return (
			<div className="pb-3">
				<h6 className="d-flex align-items-center mb-1">
					<div className="rb-icon-circle">
						<i
							className="fas fa-pen-nib"
							style={{ transform: "rotate(135deg)" }}
						></i>
					</div>
					<b className="ps-2 skill">{currentResume.skill.label}</b>
				</h6>
				<div>
					{currentResume.skill.skill.map((skill, index) => (
						<Button
							key={index}
							className={classes.root + " skill"}
							size="small"
						>
							{skill.name.toUpperCase()}
						</Button>
					))}
				</div>
			</div>
		);
	};
	const empty = () => {
		return (
			<div className="py-3">
				<h6 className="d-flex align-items-center skill">
					<div className="rb-icon-circle">
						<i
							className="fas fa-pen-nib"
							style={{ transform: "rotate(135deg)" }}
						></i>
					</div>
					<b className="ps-2 skill">SKILLS</b>
				</h6>
				<b>
					<p className="my-1 skill">Skill</p>
				</b>
			</div>
		);
	};
	return currentResume && currentResume.skill ? skill() : empty();
};

export default Skills;
