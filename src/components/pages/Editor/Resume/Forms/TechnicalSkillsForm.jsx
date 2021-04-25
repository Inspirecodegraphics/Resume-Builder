import React from "react";
import Joi from "joi-browser";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

// Material UI Core
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import InputAdornment from "@material-ui/core/InputAdornment";

// Material UI Icons
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Form from "../../../../common/ExperienceFormBase";
import InputField from "../../../../common/InputField";
// import firebase from "../../../services/firebase";
import { writeResume } from "../../../../../services/utils/db";
import Typography from "@material-ui/core/Typography";

class TechnicalSkillsForm extends Form {
	state = {
		mainContent: {
			label: "TECHNICAL SKILLS",
			skills: [
				{
					id: 1,
					name: "",
					desc: "",
				},
			],
		},

		errors: {},
		notification: false,
	};
	componentDidMount() {
		// const { currentResume } = this.props;
		// const mainContent = this.generateDoc(
		// 	currentResume.mainContent,
		// 	"mainContent"
		// );
		// this.setState({ mainContent });
		// const social = this.generateDoc(currentResume.social, "social");
		// this.setState({ social });
		// this.handleExperienceError();
	}
	// generateDoc(data, dataType) {
	// 	return dataType === "mainContent"
	// 		? {
	// 				address: data.address || "",
	// 				email: data.email || "",
	// 				phoneNumber: data.phoneNumber || "",
	// 				name: data.name || "",
	// 				dob: data.dob || new Date(),
	// 				desc: data.desc || "",
	// 				tag: data.tag || "",
	// 		  }
	// 		: {
	// 				website: data.website || "",
	// 				linkedIn: data.linkedIn || "",
	// 				twitter: data.twitter || "",
	// 				facebook: data.facebook || "",
	// 				quora: data.quora || "",
	// 				instagram: data.instagram || "",
	// 				stackOverFlow: data.stackOverFlow || "",
	// 				github: data.github || "",
	// 		  };
	// }

	schema = {
		label: Joi.string().label("Label"),
		skills: {
			id: Joi.number(),
			name: Joi.string().required().label("Group Name"),
			desc: Joi.string().required().label("Description"),
		},
	};

	doSubmit = async (type) => {
		console.log("Content", this.state.mainContent);
		console.log("Error", this.state.errors);
		// writeResume(
		// 	{ [type]: this.state[type] },
		// 	this.props.currentUser.uid,
		// 	this.props.currentUser.resumeId
		// )
		// 	.then((data) => {
		// 		console.log(data);
		// 		this.setState({ notification: true });
		//    this.props.handleClose()
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	};

	move = (array, element, delta) => {
		var index = array.indexOf(element);
		var newIndex = index + delta;
		if (newIndex < 0 || newIndex === array.length) return; //Already at the top or bottom.
		var indexes = [index, newIndex].sort((a, b) => a - b); //Sort the indixes (fixed)
		array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); //Replace from lowest index, two elements, reverting the order
	};

	handleAddMore = (type) => {
		const errors = this.validate(type);
		if (Object.keys(errors).length > 0) {
			this.setState({ errors });
		} else {
			const mainContent = { ...this.state.mainContent };
			const skills = {
				id: this.state.mainContent.skills.length + 1,
				name: "",
				desc: "",
			};
			mainContent.skills.push(skills);
			this.setState({ mainContent });
		}
	};

	handleNotificationClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		this.setState({ notification: false });
	};
	render() {
		const { notification } = this.state;

		return (
			<div>
				{this.skills()}
				<Snackbar
					className="bg-suscess"
					severity="success"
					anchorOrigin={{ vertical: "top", horizontal: "right" }}
					open={notification}
					onClose={this.handleNotificationClose}
					action={
						<IconButton
							size="small"
							aria-label="close"
							color="inherit"
							onClick={this.handleNotificationClose}
						>
							<CloseIcon fontSize="small" />
						</IconButton>
					}
					message={
						<span>
							<CheckIcon classmane="p-2 m-2"></CheckIcon>
							Content Saved suscessfully
						</span>
					}
					autoHideDuration={5000}
				></Snackbar>
			</div>
		);
	}

	skills() {
		const { mainContent, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit("skills")}>
				<div className="row mb-2">
					<div className="col-md-12 my-2">
						<InputField
							handleChange={this.handleChange("label")}
							error={errors.label}
							value={mainContent.label}
							type="text"
							placeholder="Label"
							name="label"
							label="Label"
							icon={<i className="fas fa-tags text-muted" />}
						></InputField>
					</div>
					{mainContent.skills.map((skills, index) => (
						<Accordion
							TransitionProps={{ unmountOnExit: true }}
							elevation={0}
							key={index}
							className="my-2"
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="mainContent"
								id="mainContent-header"
							>
								{mainContent.label} - {skills.id}
							</AccordionSummary>
							<AccordionDetails>
								<div className="row">
									<div className="col-md-12 my-2">
										<InputField
											handleChange={this.handleChange("skills")}
											error={errors["name" + skills.id]}
											value={skills.name}
											type="text"
											id={`name${skills.id}`}
											placeholder="Group Name"
											name="name"
											label="Group Name"
										></InputField>
									</div>

									<div className="col-md-12 my-2">
										<Tooltip
											placement="bottom"
											title={`Use " , " comma for separate multiple values.`}
											arrow
										>
											<InputField
												handleChange={this.handleChange("skills")}
												error={errors["desc" + skills.id]}
												value={skills.desc}
												type="text"
												id={`desc${skills.id}`}
												placeholder="List of Technical Skills"
												name="desc"
												rows={3}
												multiline
												label="Description"
											></InputField>
										</Tooltip>
									</div>
								</div>
							</AccordionDetails>
						</Accordion>
					))}

					<div className="col-12">
						<div className="row px-3">
							<div className="col-11 px-0 d-flex align-items-center">
								<hr className="w-100" />
							</div>
							<div className="col-1 px-0">
								<Tooltip placement="bottom" title="Add More" arrow>
									<IconButton
										onClick={() => this.handleAddMore("skills")}
										aria-label="add more"
									>
										<Icon color="secondary">add_circle</Icon>
									</IconButton>
								</Tooltip>
							</div>
						</div>
					</div>
				</div>
				<DialogActions>
					<Button onClick={this.props.handleClose} color="primary">
						Close
					</Button>
					<Button type="submit" color="primary">
						Save
					</Button>
				</DialogActions>
			</form>
		);
	}
}

export default TechnicalSkillsForm;
