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

class AwardHonorForm extends Form {
	static contextType = AuthContext;

	state = {
		mainContent: {
			label: "AWARDS & HONORS",
			award: [
				{
					id: 1,
					name: "",
					institution: "",
					desc: "",
					awardDate: new Date(),
					externalLink: "",
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
		if (currentResume.award) {
			data.mainContent = this.generateDoc(currentResume.award);
		}
		data.currentUser = currentUser;
		this.setState(data);
	}
	generateDoc(data) {
		return {
			label: data.label || "CERTIFICATES",
			award: data.award || [],
		};
	}

	schema = {
		label: Joi.string().label("Label"),
		award: {
			id: Joi.number(),
			name: Joi.string().required().label("Title/Award Name"),
			institution: Joi.string().required().max(50).label("Institution/Place"),
			desc: Joi.string().allow("").max(75),
			externalLink: Joi.string().allow(""),
			awardDate: Joi.date().label("Award Date"),
		},
	};
	doSubmit = async (type) => {
		const { mainContent, currentUser } = this.state;

		writeResume(
			{
				award: mainContent,
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
			const award = {
				id: this.state.mainContent.award.length + 1,
				name: "",
				institution: "",
				desc: "",
				externalLink: "",
				awardDate: new Date(),
			};
			mainContent.award.push(award);
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
				{this.award()}
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

	award() {
		const { mainContent, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit("award")}>
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
					{mainContent.award.map((award, index) => (
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
								{mainContent.label} - {award.id}
							</AccordionSummary>
							<AccordionDetails>
								<div className="row">
									<div className="col-md-6 my-2">
										<InputField
											handleChange={this.handleChange("award")}
											error={errors["name" + award.id]}
											value={award.name}
											type="text"
											id={`name${award.id}`}
											placeholder="Title/Award Name"
											name="name"
											label="Title/Award Name"
										></InputField>
									</div>
									<div className="col-md-6 my-2">
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<DatePicker
												fullWidth
												views={["year", "month"]}
												label="Award Date"
												name="awardDate"
												id={`awardDate${award.id}`}
												helperText={errors["awardDate" + award.id]}
												minDate={new Date("1990-01-01")}
												maxDate={new Date()}
												value={award.awardDate}
												onChange={(date) =>
													this.handleDateChange(date, {
														id: award.id,
														type: "award",
														name: "awardDate",
													})
												}
											/>
										</MuiPickersUtilsProvider>
									</div>
									<div className="col-md-6 my-2">
										<InputField
											handleChange={this.handleChange("award")}
											error={errors["institution" + award.id]}
											value={award.institution}
											type="text"
											id={`institution${award.id}`}
											placeholder="Institution name that issued/Awarded it"
											name="institution"
											label="Institution"
										></InputField>
									</div>
									<div className="col-md-6 my-2">
										<InputField
											handleChange={this.handleChange("award")}
											error={errors["desc" + award.id]}
											value={award.desc}
											type="text"
											id={`desc${award.id}`}
											placeholder="Description (Optional)"
											name="desc"
											label="Description"
										></InputField>
									</div>
									<div className="col-md-12 my-2">
										<InputField
											handleChange={this.handleChange("award")}
											error={errors["externalLink" + award.id]}
											value={award.externalLink}
											type="text"
											id={`externalLink${award.id}`}
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
										onClick={() => this.handleAddMore("award")}
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

export default AwardHonorForm;
