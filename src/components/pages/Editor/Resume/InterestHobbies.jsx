import React from "react";
import { useAuth } from "../../../../Providers/AuthProvider";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
const InterestHobbies = () => {
	const classes = useStyles();

	const { currentResume } = useAuth();
	const interest = () => {
		return (
			<div className="pb-3 interest">
				<h6 className="d-flex align-items-center">
					<div className="rb-icon-circle">
						<i className="fas fa-heart"></i>
					</div>
					<b className="ps-2">{currentResume.interest.label}</b>
				</h6>
				<div>
					{currentResume.interest.interest.map((interest, index) => (
						<Button
							key={index}
							className={classes.root + " skill-btn"}
							size="small"
						>
							{interest.name.toUpperCase()}
						</Button>
					))}
				</div>
			</div>
		);
	};
	const empty = () => {
		return (
			<div className="py-3">
				<h6 className="d-flex align-items-center">
					<div className="rb-icon-circle">
						<i className="fas fa-heart"></i>
					</div>
					<b className="ps-2">INTEREST & HOBBIES</b>
				</h6>
				<b>
					<p className="my-1">Interest & Hobbies</p>
				</b>
			</div>
		);
	};
	return currentResume && currentResume.interest ? interest() : empty();
};

export default InterestHobbies;
