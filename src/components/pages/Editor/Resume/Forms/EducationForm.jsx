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

import { writeResume } from "../../../../../services/utils/db";
import { AuthContext } from "../../../../../Providers/AuthProvider";

class EducationForm extends Form {
	static contextType = AuthContext;

	state = {
		mainContent: {
			label: "EDUCATION",
			education: [
				{
					id: 1,
					program: "",
					institution: "",
					desc: "",
					grade: "",
					startDate: new Date(),
					endDate: new Date(),
					courses: "",
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
		const data = { ...this.state };
		if (currentResume.education) {
			data.mainContent = this.generateDoc(currentResume.education);
		}
		data.currentUser = currentUser;
		this.setState(data);
	}
	generateDoc(data) {
		return {
			label: data.label || "EDUCATION",
			// education: data.education || [],
			education: data.education.map((edu) => {
				if (Boolean(edu.startDate.seconds)) {
					edu.startDate = edu.startDate.toDate();
				}
				if (Boolean(edu.endDate.seconds)) {
					edu.endDate = edu.endDate.toDate();
				}
				return edu;
			}),
		};
	}

	schema = {
		label: Joi.string().label("Label"),
		education: {
			id: Joi.number(),
			program: Joi.string().required().label("Study Program"),
			institution: Joi.string().required().label("Institution/Place"),
			desc: Joi.string().allow(""),
			grade: Joi.string().allow(""),
			startDate: Joi.date().label("Start Date"),
			endDate: Joi.date().label("End Date"),
			courses: Joi.string().allow(""),
			present: Joi.boolean(),
		},
	};

	doSubmit = async (type) => {
		const { mainContent, currentUser } = this.state;

		writeResume(
			{
				education: mainContent,
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

	handleAddMore = (type) => {
		const errors = this.validate(type);
		if (Object.keys(errors).length > 0) {
			this.setState({ errors });
		} else {
			const mainContent = { ...this.state.mainContent };
			const education = {
				id: this.state.mainContent.education.length + 1,
				program: "",
				institution: "",
				desc: "",
				grade: "",
				startDate: new Date(),
				endDate: new Date(),
				courses: "",
				present: false,
			};
			mainContent.education.push(education);
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
				{this.education()}
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

	education() {
		const { mainContent, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit("education")}>
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
					{mainContent.education.map((education, index) => (
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
								{mainContent.label} - {education.id}
							</AccordionSummary>
							<AccordionDetails>
								<div className="row">
									<div className="col-md-6 my-2">
										<InputField
											handleChange={this.handleChange("education")}
											error={errors["program" + education.id]}
											value={education.program}
											type="text"
											id={`program${education.id}`}
											placeholder="Study Program"
											name="program"
											label="Study Program"
										></InputField>
									</div>
									<div className="col-md-6 my-2">
										<InputField
											handleChange={this.handleChange("education")}
											error={errors["institution" + education.id]}
											value={education.institution}
											type="text"
											id={`institution${education.id}`}
											placeholder="Institution/Place of Education"
											name="institution"
											label="Institution"
										></InputField>
									</div>
									<div className="col-md-6 my-2">
										<InputField
											handleChange={this.handleChange("education")}
											error={errors["grade" + education.id]}
											value={education.grade}
											type="text"
											id={`grade${education.id}`}
											placeholder="Percentage or GPA (Optional)"
											name="grade"
											label="Percentage or GPA"
										></InputField>
									</div>
									<div className="col-5 col-md-2 my-2 pe-0">
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<DatePicker
												fullWidth
												views={["year", "month"]}
												label="Start"
												name="startDate"
												id={`startDate${education.id}`}
												helperText={errors["startDate" + education.id]}
												minDate={new Date("1990-01-01")}
												maxDate={new Date()}
												value={education.startDate}
												onChange={(date) =>
													this.handleDateChange(date, {
														id: education.id,
														type: "education",
														name: "startDate",
													})
												}
											/>
										</MuiPickersUtilsProvider>
									</div>
									<div className="col-5 col-md-2 pe-0 my-2 d-flex align-items-center">
										{!education.present && (
											<MuiPickersUtilsProvider utils={DateFnsUtils}>
												<DatePicker
													fullWidth
													views={["year", "month"]}
													label="End"
													name="endDate"
													id={`endDate${education.id}`}
													helperText={errors["endDate" + education.id]}
													minDate={new Date("1990-01-01")}
													maxDate={new Date()}
													value={education.endDate}
													onChange={(date) =>
														this.handleDateChange(date, {
															id: education.id,
															type: "education",
															name: "endDate",
														})
													}
												/>
											</MuiPickersUtilsProvider>
										)}
										{education.present && (
											<b>
												<p className="my-0">- Present</p>
											</b>
										)}
									</div>
									<div className="col-2 col-md-2 my-2">
										<Tooltip placement="bottom" title="Present" arrow>
											<Checkbox
												checked={education.present}
												onChange={this.handlePresentCheck(
													education.id,
													"education"
												)}
												inputProps={{ "aria-label": "primary checkbox" }}
											/>
										</Tooltip>
									</div>
									<div className="col-md-6 my-2">
										<InputField
											handleChange={this.handleChange("education")}
											error={errors["desc" + education.id]}
											value={education.desc}
											type="text"
											id={`desc${education.id}`}
											placeholder="Description (Optional)"
											name="desc"
											rows={3}
											multiline
											label="Description"
										></InputField>
									</div>
									<div className="col-md-6 my-2">
										<InputField
											handleChange={this.handleChange("education")}
											error={errors["courses" + education.id]}
											value={education.courses}
											type="text"
											rows={3}
											multiline
											id={`courses${education.id}`}
											placeholder="Comma Separated Values"
											name="courses"
											label="courses/Thesis/Project"
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
										onClick={() => this.handleAddMore("education")}
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

export default EducationForm;
