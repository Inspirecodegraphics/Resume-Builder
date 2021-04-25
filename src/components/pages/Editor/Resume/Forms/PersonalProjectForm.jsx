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
import Typography from "@material-ui/core/Typography";

// Material UI Icons
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Form from "../../../../common/ExperienceFormBase";
import InputField from "../../../../common/InputField";
// import firebase from "../../../services/firebase";
import { writeResume } from "../../../../../services/utils/db";
import { AuthContext } from "../../../../../Providers/AuthProvider";

class PersonalProject extends Form {
	static contextType = AuthContext;

	state = {
		mainContent: {
			label: "PROJECTS",
			project: [
				{
					id: 1,
					name: "",
					institution: "",
					desc: "",
					startDate: new Date(),
					endDate: new Date(),
					externalLink: "",
					present: false,
				},
			],
		},
		currentUser: {},
		errors: {},
		notification: false,
	};
	componentDidMount() {
		const { currentUser, currentResume } = this.context;
		let data = { ...this.state };
		if (currentResume.project) {
			data.mainContent = this.generateDoc(currentResume.project);
		}
		data.currentUser = currentUser;
		this.setState(data);
	}
	generateDoc(data) {
		return {
			label: data.label || "PROJECTS",
			project: data.project || [],
		};
	}

	schema = {
		label: Joi.string().label("Label"),
		project: {
			id: Joi.number(),
			name: Joi.string().required().label("Project Name"),
			institution: Joi.string().allow("").max(50).label("Institution/Place"),
			desc: Joi.string().allow("").max(100),
			externalLink: Joi.string().allow(""),
			startDate: Joi.date().label("Start Date"),
			endDate: Joi.date().label("End Date"),
			present: Joi.boolean(),
		},
	};

	doSubmit = async (type) => {
		const { mainContent, currentUser } = this.state;

		writeResume(
			{
				project: mainContent,
			},
			currentUser.uid,
			currentUser.resumeId
		)
			.then((data) => {
				this.setState({ notification: true });
			})
			.catch((err) => {
				console.log(err);
			});
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
			const project = {
				id: this.state.mainContent.project.length + 1,
				name: "",
				institution: "",
				desc: "",
				externalLink: "",
				startDate: new Date(),
				endDate: new Date(),
				present: false,
			};
			mainContent.project.push(project);
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
				{this.project()}
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

	project() {
		const { mainContent, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit("project")}>
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
					{mainContent.project.map((project, index) => (
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
								{mainContent.label} - {project.id}
							</AccordionSummary>
							<AccordionDetails>
								<div className="row">
									<div className="col-md-6 my-2">
										<InputField
											handleChange={this.handleChange("project")}
											error={errors["name" + project.id]}
											value={project.name}
											type="text"
											id={`name${project.id}`}
											placeholder="Project Name"
											name="name"
											label="Project Name"
										></InputField>
									</div>
									<div className="col-5 col-md-2 my-2 pe-0">
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<DatePicker
												fullWidth
												views={["year", "month"]}
												label="Start"
												name="startDate"
												id={`startDate${project.id}`}
												helperText={errors["startDate" + project.id]}
												minDate={new Date("1990-01-01")}
												maxDate={new Date()}
												value={project.startDate}
												onChange={(date) =>
													this.handleDateChange(date, {
														id: project.id,
														type: "project",
														name: "startDate",
													})
												}
											/>
										</MuiPickersUtilsProvider>
									</div>
									<div
										className={`col-5 col-md-2 pe-0 my-2 d-flex ${
											project.present && "align-items-center"
										}`}
									>
										{!project.present && (
											<MuiPickersUtilsProvider utils={DateFnsUtils}>
												<DatePicker
													fullWidth
													views={["year", "month"]}
													label="End"
													name="endDate"
													id={`endDate${project.id}`}
													helperText={errors["endDate" + project.id]}
													minDate={new Date("1990-01-01")}
													maxDate={new Date()}
													value={project.endDate}
													onChange={(date) =>
														this.handleDateChange(date, {
															id: project.id,
															type: "project",
															name: "endDate",
														})
													}
												/>
											</MuiPickersUtilsProvider>
										)}
										{project.present && (
											<b>
												<p className="my-0">- Present</p>
											</b>
										)}
									</div>
									<div className="col-2 col-md-2 my-2">
										<Tooltip placement="bottom" title="Present" arrow>
											<Checkbox
												checked={project.present}
												onChange={this.handlePresentCheck(
													project.id,
													"project"
												)}
												inputProps={{ "aria-label": "primary checkbox" }}
											/>
										</Tooltip>
									</div>
									<div className="col-md-6 my-2">
										<InputField
											handleChange={this.handleChange("project")}
											error={errors["institution" + project.id]}
											value={project.institution}
											type="text"
											id={`institution${project.id}`}
											placeholder="Institution/Place (Optional)"
											name="institution"
											label="Institution/Place"
										></InputField>
									</div>
									<div className="col-md-6 my-2">
										<InputField
											handleChange={this.handleChange("project")}
											error={errors["desc" + project.id]}
											value={project.desc}
											type="text"
											id={`desc${project.id}`}
											placeholder="Technology Used (Optional)"
											name="desc"
											label="Description"
										></InputField>
									</div>
									<div className="col-md-12 my-2">
										<InputField
											handleChange={this.handleChange("project")}
											error={errors["externalLink" + project.id]}
											value={project.externalLink}
											type="text"
											id={`externalLink${project.id}`}
											placeholder="External Link (Optional)"
											name="externalLink"
											label="External Link"
										></InputField>
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
										onClick={() => this.handleAddMore("project")}
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

export default PersonalProject;
