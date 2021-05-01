import React from "react";
import { useAuth } from "../../../../Providers/AuthProvider";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
	},
	bottom: {
		color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
	},
	top: {
		color: "inherit",
		animationDuration: "550ms",
		position: "absolute",
		// left: 0,
	},
	circle: {
		strokeLinecap: "round",
	},
}));
const TechnicalSkills = () => {
	const classes = useStyles();

	const { currentResume } = useAuth();

	const technicalSkills = () => {
		return (
			<div className="pb-3">
				<h6 className="d-flex align-items-center mb-1">
					<div className="rb-icon-circle">
						<i className="fas fa-cogs"></i>
					</div>
					<b className="ps-2 technicalSkills">
						{currentResume.technicalSkills.label}
					</b>
				</h6>
				<div className="row mx-0 pe-1">
					{currentResume.technicalSkills.tech.map((tech, index) => (
						<div key={index} className="col-3 px-0 circular ">
							<Box position="relative" display="inline-flex" className="p-1">
								<CircularProgress
									variant="determinate"
									value={100}
									size={50}
									thickness={2.3}
									className={classes.bottom}
								/>
								<CircularProgress
									variant="determinate"
									value={tech.value * 10}
									size={50}
									classes={{
										circle: classes.circle,
									}}
									thickness={2.3}
									className={classes.top}
								/>
								<Box
									top={0}
									left={0}
									bottom={0}
									right={0}
									position="absolute"
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									<i
										className={tech.icon + " g-pointer technicalSkills"}
										style={{ fontSize: "25px" }}
									></i>
								</Box>
							</Box>
						</div>
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
						<i className="fas fa-cogs"></i>
					</div>
					<b className="ps-2 technicalSkills">TECHNICAL SKILLS</b>
				</h6>
				<b>
					<p className="my-1 technicalSkills">List of Technical Skills</p>
				</b>
			</div>
		);
	};
	return currentResume && currentResume.technicalSkills
		? technicalSkills()
		: empty();
};

export default TechnicalSkills;
