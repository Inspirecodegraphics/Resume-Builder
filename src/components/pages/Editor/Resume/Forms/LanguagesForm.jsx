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
import Box from "@material-ui/core/Box";

// Material UI Labs
import Rating from "@material-ui/lab/Rating";
// Material UI Icons
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Form from "../../../../common/ExperienceFormBase";
import InputField from "../../../../common/InputField";
// import firebase from "../../../services/firebase";
import { writeResume } from "../../../../../services/utils/db";
import Typography from "@material-ui/core/Typography";
import { AuthContext } from "../../../../../Providers/AuthProvider";

class LanguageForm extends Form {
	static contextType = AuthContext;

	state = {
		mainContent: {
			label: "LANGUAGES",
			language: [
				{
					id: 1,
					name: "",
					value: 3,
				},
			],
		},
		currentUser: {},
		errors: {},
		notification: false,
	};
	labels = {
		1: "Elementary Proficiency",
		2: "Limited Working Proficiency",
		3: "Professional Working Proficiency",
		4: "Full Professional Proficiency",
		5: "Native or Bilingual Proficiency",
	};
	componentDidMount() {
		const { currentUser, currentResume } = this.context;
		let data = { ...this.state };
		if (currentResume.language) {
			data.mainContent = this.generateDoc(currentResume.language);
		}
		data.currentUser = currentUser;
		this.setState(data);
	}
	generateDoc(data) {
		return {
			label: data.label || "LANGUAGES",
			language: data.language || [],
		};
	}

	schema = {
		label: Joi.string().label("Label"),
		language: {
			id: Joi.number(),
			name: Joi.string().required().label("Language"),
			value: Joi.number().required().label("Value"),
		},
	};

	doSubmit = async (type) => {
		const { mainContent, currentUser } = this.state;
		writeResume(
			{
				language: mainContent,
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
			const language = {
				id: this.state.mainContent.language.length + 1,
				name: "",
				value: 3,
			};
			mainContent.language.push(language);
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
				{this.language()}
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

	language() {
		const { mainContent, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit("language")}>
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
					{mainContent.language.map((language, index) => (
						<div key={index} className="container">
							<div className="row">
								<div className="col-md-4 my-2">
									<InputField
										handleChange={this.handleChange("language")}
										error={errors["name" + language.id]}
										value={language.name}
										type="text"
										id={`name${language.id}`}
										placeholder="Language"
										name="name"
										label="Language"
									></InputField>
								</div>

								<div className="col-md-8 my-2 d-flex align-items-center">
									<Rating
										id={`value${language.id}`}
										name={`value${language.id}`}
										value={language.value}
										precision={1}
										onChange={(event, value) => {
											this.handleRatingChange(value, language.id, "language");
										}}
									/>
									{language.value !== null && (
										<Box ml={2}>{this.labels[language.value]}</Box>
									)}
								</div>
							</div>
						</div>
					))}

					<div className="col-12">
						<div className="row px-3">
							<div className="col-11 px-0 d-flex align-items-center">
								<hr className="w-100" />
							</div>
							<div className="col-1 px-0">
								<Tooltip placement="bottom" title="Add More" arrow>
									<IconButton
										onClick={() => this.handleAddMore("language")}
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

export default LanguageForm;
