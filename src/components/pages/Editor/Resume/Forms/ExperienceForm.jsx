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

// Material UI Icons
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Form from "../../../../common/ExperienceFormBase";
import InputField from "../../../../common/InputField";

import { writeResume } from "../../../../../services/utils/db";
import { AuthContext } from "../../../../../Providers/AuthProvider";

class ExperienceForm extends Form {
	static contextType = AuthContext;

	state = {
		mainContent: {
			label: "WORK EXPERIENCE",
			experience: [
				{
					id: 1,
					title: "",
					company: "",
					desc: "",
					address: "",
					startDate: new Date(),
					endDate: new Date(),
					task: "",
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
		if (currentResume.workExperience) {
			data.mainContent = this.generateDoc(currentResume.workExperience);
		}
		data.currentUser = currentUser;
		this.setState(data);
	}
	generateDoc(data) {
		return {
			label: data.label || "WORK EXPERIENCE",
			// experience: data.experience || [],
			experience: data.experience.map((exp) => {
				if (Boolean(exp.startDate.seconds)) {
					exp.startDate = exp.startDate.toDate();
				}
				if (Boolean(exp.endDate.seconds)) {
					exp.endDate = exp.endDate.toDate();
				}
				return exp;
			}),
		};
	}

	schema = {
		label: Joi.string().label("Label"),
		experience: {
			id: Joi.number(),
			title: Joi.string().required().max(30).label("Title/Position"),
			company: Joi.string().required().max(25).label("Workplace/Company"),
			desc: Joi.string().max(225).allow(""),
			address: Joi.string().max(20).allow(""),
			startDate: Joi.date().label("Start Date"),
			endDate: Joi.date().label("End Date"),
			task: Joi.string().max(50).allow(""),
			present: Joi.boolean(),
		},
	};

	doSubmit = async (type) => {
		const { mainContent, currentUser } = this.state;
		writeResume(
			{
				workExperience: mainContent,
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
			const experience = {
				id: this.state.mainContent.experience.length + 1,
				title: "",
				company: "",
				desc: "",
				address: "",
				startDate: new Date(),
				endDate: new Date(),
				task: "",
				present: false,
			};
			mainContent.experience.push(experience);
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
				{this.experience()}
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

	experience() {
		const { mainContent, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit("experience")}>
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
					{mainContent.experience.map((experience, index) => (
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
								{mainContent.label} - {experience.id}
							</AccordionSummary>
							<AccordionDetails>
								<div className="row">
									<div className="col-md-6 my-2">
										<InputField
											handleChange={this.handleChange("experience")}
											error={errors["title" + experience.id]}
											value={experience.title}
											type="text"
											id={`title${experience.id}`}
											placeholder="Title/Position"
											name="title"
											label="Title/Position"
										></InputField>
									</div>
									<div className="col-md-6 my-2">
										<InputField
											handleChange={this.handleChange("experience")}
											error={errors["company" + experience.id]}
											value={experience.company}
											type="text"
											id={`company${experience.id}`}
											placeholder="Workplace/Company"
											name="company"
											label="Workplace/Company"
										></InputField>
									</div>
									<div className="col-md-6 my-2">
										<InputField
											handleChange={this.handleChange("experience")}
											error={errors["desc" + experience.id]}
											value={experience.desc}
											type="text"
											id={`desc${experience.id}`}
											placeholder="Description (Optional)"
											name="desc"
											label="Description"
										></InputField>
									</div>
									<div className="col-md-6 my-2">
										<InputField
											handleChange={this.handleChange("experience")}
											error={errors["address" + experience.id]}
											value={experience.address}
											type="text"
											id={`address${experience.id}`}
											placeholder="City/Country (Optional)"
											name="address"
											label="Address"
										></InputField>
									</div>
									<div className="col-md-6 my-2">
										<InputField
											handleChange={this.handleChange("experience")}
											error={errors["task" + experience.id]}
											value={experience.task}
											type="text"
											id={`task${experience.id}`}
											placeholder="Achievements/Task (Optional)"
											name="task"
											label="Accomplishment/Responsibility/Task"
										></InputField>
									</div>
									<div className="col-5 col-md-2 my-2 pe-0">
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<DatePicker
												fullWidth
												views={["year", "month"]}
												label="Start"
												name="startDate"
												id={`startDate${experience.id}`}
												helperText={errors["startDate" + experience.id]}
												minDate={new Date("1990-01-01")}
												maxDate={new Date()}
												value={experience.startDate}
												onChange={(date) =>
													this.handleDateChange(date, {
														id: experience.id,
														type: "experience",
														name: "startDate",
													})
												}
											/>
										</MuiPickersUtilsProvider>
									</div>
									<div className="col-5 col-md-2 my-2 d-flex align-items-center">
										{!experience.present && (
											<MuiPickersUtilsProvider utils={DateFnsUtils}>
												<DatePicker
													fullWidth
													views={["year", "month"]}
													label="End"
													name="endDate"
													id={`endDate${experience.id}`}
													helperText={errors["endDate" + experience.id]}
													minDate={new Date("1990-01-01")}
													maxDate={new Date()}
													value={experience.endDate}
													onChange={(date) =>
														this.handleDateChange(date, {
															id: experience.id,
															type: "experience",
															name: "endDate",
														})
													}
												/>
											</MuiPickersUtilsProvider>
										)}
										{experience.present && (
											<b>
												<p className="my-0">- Present</p>
											</b>
										)}
									</div>
									<div className="col-2 col-md-2 my-2">
										<Tooltip placement="bottom" title="Present" arrow>
											<Checkbox
												checked={experience.present}
												onChange={this.handlePresentCheck(
													experience.id,
													"experience"
												)}
												inputProps={{ "aria-label": "primary checkbox" }}
											/>
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
										onClick={() => this.handleAddMore("experience")}
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

export default ExperienceForm;
