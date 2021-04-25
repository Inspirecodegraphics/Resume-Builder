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

class SkillForm extends Form {
	static contextType = AuthContext;

	state = {
		mainContent: {
			label: "SKILLS",
			skill: [
				{
					id: 1,
					name: "",
				},
			],
		},
		errors: {},
		notification: false,
		customErr: "",
	};

	componentDidMount() {
		const { currentUser, currentResume } = this.context;
		let data = { ...this.state };
		if (currentResume.skill) {
			data.mainContent = this.generateDoc(currentResume.skill);
		}
		data.currentUser = currentUser;
		this.setState(data);
	}
	generateDoc(data) {
		return {
			label: data.label || "SKILLS",
			skill: data.skill || [],
		};
	}

	schema = {
		label: Joi.string().label("Label"),
		skill: {
			id: Joi.number(),
			name: Joi.string().required().label("Skill"),
		},
	};

	doSubmit = async (type) => {
		const { mainContent, currentUser } = this.state;
		writeResume(
			{
				skill: mainContent,
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
			if (mainContent.skill.length >= 10) {
				return this.setState({
					customErr: "You can add maximum of 10 Skills.",
				});
			} else {
				this.setState({ customErr: "" });
			}
			const skill = {
				id: this.state.mainContent.skill.length + 1,
				name: "",
			};
			mainContent.skill.push(skill);
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
				{this.skill()}
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

	skill() {
		const { customErr, mainContent, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit("skill")}>
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
					<div className="container">
						<div className="row">
							{mainContent.skill.map((skill, index) => (
								<div key={index} className="col-md-6 my-2">
									<InputField
										handleChange={this.handleChange("skill")}
										error={errors["name" + skill.id]}
										value={skill.name}
										type="text"
										id={`name${skill.id}`}
										autoFocus
										placeholder="Skill"
										name="name"
										label="Skill"
									></InputField>
								</div>
							))}
						</div>
					</div>
					{customErr && (
						<p className="text-center pt-2 text-danger">{customErr}</p>
					)}
					<div className="col-12">
						<div className="row px-3">
							<div className="col-11 px-0 d-flex align-items-center">
								<hr className="w-100" />
							</div>
							<div className="col-1 px-0">
								<Tooltip placement="bottom" title="Add More" arrow>
									<IconButton
										onClick={() => this.handleAddMore("skill")}
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

export default SkillForm;
