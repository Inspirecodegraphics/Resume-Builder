import React from "react";
import Form from "../../../../common/Form";
import Joi from "joi-browser";
// Material UI Core
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
// Material UI Icons
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

import InputField from "../../../../common/InputField";
import { writeResume } from "../../../../../services/utils/db";
import { AuthContext } from "../../../../../Providers/AuthProvider";

class AboutForm extends Form {
	static contextType = AuthContext;
	state = {
		data: {
			label: "ABOUT ME",
			about: "",
		},
		notification: false,
		errors: {},
		currentUser: {},
	};
	schema = {
		label: Joi.string().label("Label"),
		about: Joi.string().allow("").max(650).label("About me"),
	};
	componentDidMount() {
		const { currentUser, currentResume } = this.context;
		let data = { ...this.state };
		if (currentResume.about) {
			data.data = this.generateDoc(currentResume.about);
		}
		data.currentUser = currentUser;
		this.setState(data);
	}
	generateDoc(data) {
		return {
			label: data.label || "ABOUT ME",
			about: data.about || "",
		};
	}
	doSubmit = async (type) => {
		const { data, currentUser } = this.state;
		writeResume({ about: data }, currentUser.uid, currentUser.resumeId)
			.then((data) => {
				this.setState({ notification: true });
			})
			.catch((err) => {
				console.log(err);
			});
	};
	render() {
		const { notification } = this.state;

		return (
			<div>
				{this.about()}
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
	about() {
		const { data, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="row mb-2">
					<div className="col-md-12 my-2">
						<InputField
							handleChange={this.handleChange}
							error={errors.label}
							value={data.label}
							type="text"
							placeholder="Label"
							name="label"
							label="Label"
							icon={<i className="fas fa-tags text-muted" />}
						></InputField>
					</div>
					<div className="col-md-12 my-2">
						<InputField
							handleChange={this.handleChange}
							error={errors.about}
							value={data.about}
							type="text"
							placeholder="Description (Optional)"
							name="about"
							rows={5}
							multiline
							label="Description"
						></InputField>
					</div>
				</div>
				<DialogActions>
					<Button onClick={this.props.handleClose} color="primary">
						Cancel
					</Button>
					<Button type="submit" color="primary">
						Save
					</Button>
				</DialogActions>
			</form>
		);
	}
}

export default AboutForm;
