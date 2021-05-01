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

class AchievementForm extends Form {
	static contextType = AuthContext;

	state = {
		mainContent: {
			label: "ACHIEVEMENTS",
			achievement: [
				{
					id: 1,
					name: "",
					desc: "",
					achievementDate: new Date(),
				},
			],
		},

		errors: {},
		notification: false,
	};
	componentDidMount() {
		const { currentUser, currentResume } = this.context;
		let data = { ...this.state };
		if (currentResume.achievement) {
			data.mainContent = this.generateDoc(currentResume.achievement);
		}
		data.currentUser = currentUser;
		this.setState(data);
	}
	generateDoc(data) {
		return {
			label: data.label || "ACHIEVEMENTS",
			// achievement: data.achievement || [],
			achievement: data.achievement.map((achieve) => {
				if (Boolean(achieve.achievementDate.seconds)) {
					achieve.achievementDate = achieve.achievementDate.toDate();
				}
				return achieve;
			}),
		};
	}

	schema = {
		label: Joi.string().label("Label"),
		achievement: {
			id: Joi.number(),
			name: Joi.string().required().label("Achievement Name"),
			desc: Joi.string().allow(""),
			achievementDate: Joi.date().label("Achievement Date"),
		},
	};

	doSubmit = async (type) => {
		const { mainContent, currentUser } = this.state;

		writeResume(
			{
				achievement: mainContent,
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
			const achievement = {
				id: this.state.mainContent.achievement.length + 1,
				name: "",
				desc: "",
				achievementDate: new Date(),
			};
			mainContent.achievement.push(achievement);
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
				{this.achievement()}
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

	achievement() {
		const { mainContent, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit("achievement")}>
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
					{mainContent.achievement.map((achievement, index) => (
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
								{mainContent.label} - {achievement.id}
							</AccordionSummary>
							<AccordionDetails>
								<div className="row">
									<div className="col-md-6 my-2">
										<InputField
											handleChange={this.handleChange("achievement")}
											error={errors["name" + achievement.id]}
											value={achievement.name}
											type="text"
											id={`name${achievement.id}`}
											placeholder="Achievement Name"
											name="name"
											label="Achievement Name"
										></InputField>
									</div>
									<div className="col-md-6 my-2">
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<DatePicker
												fullWidth
												views={["year", "month"]}
												label="Achievement Date"
												name="achievementDate"
												id={`achievementDate${achievement.id}`}
												helperText={errors["achievementDate" + achievement.id]}
												minDate={new Date("1990-01-01")}
												maxDate={new Date()}
												value={achievement.achievementDate}
												onChange={(date) =>
													this.handleDateChange(date, {
														id: achievement.id,
														type: "achievement",
														name: "achievementDate",
													})
												}
											/>
										</MuiPickersUtilsProvider>
									</div>
									<div className="col-md-12 my-2">
										<Tooltip
											placement="bottom"
											title={
												<React.Fragment>
													<Typography color="inherit" variant="body2">
														Use "/n" for Multiline. As I /n am render as:
													</Typography>
													<Typography color="inherit" variant="body2">
														I{" "}
													</Typography>
													<Typography color="inherit" variant="body2">
														Am
													</Typography>
												</React.Fragment>
											}
											arrow
										>
											<InputField
												handleChange={this.handleChange("achievement")}
												error={errors["desc" + achievement.id]}
												value={achievement.desc}
												type="text"
												id={`desc${achievement.id}`}
												placeholder="Description (Optional)"
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
										onClick={() => this.handleAddMore("achievement")}
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

export default AchievementForm;
