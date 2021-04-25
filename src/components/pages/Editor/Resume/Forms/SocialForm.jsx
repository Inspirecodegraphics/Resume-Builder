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

class SocialForm extends Form {
	static contextType = AuthContext;
	state = {
		data: {
			website: "",
			linkedIn: "",
			twitter: "",
			facebook: "",
			quora: "",
			instagram: "",
			stackOverFlow: "",
			medium: "",
			whatsapp: "",
			github: "",
		},
		notification: false,
		errors: {},
		currentUser: {},
	};
	schema = {
		website: Joi.string().allow("").uri(),
		linkedIn: Joi.string().allow("").uri(),
		twitter: Joi.string().allow("").uri(),
		facebook: Joi.string().allow("").uri(),
		quora: Joi.string().allow("").uri(),
		instagram: Joi.string().allow("").uri(),
		stackOverFlow: Joi.string().allow("").uri(),
		medium: Joi.string().allow("").uri(),
		whatsapp: Joi.string().min(10).max(10).allow(""),
		github: Joi.string().allow("").uri(),
	};
	componentDidMount() {
		const { currentUser, currentResume } = this.context;
		let data = { ...this.state };
		if (currentResume.social) {
			data.data = this.generateDoc(currentResume.social);
		}
		data.currentUser = currentUser;
		this.setState(data);
	}
	generateDoc(data) {
		return {
			website: data.website || "",
			linkedIn: data.linkedIn || "",
			twitter: data.twitter || "",
			facebook: data.facebook || "",
			quora: data.quora || "",
			instagram: data.instagram || "",
			stackOverFlow: data.stackOverFlow || "",
			github: data.github || "",
			medium: data.medium || "",
			whatsapp: data.whatsapp || "",
		};
	}
	doSubmit = async (type) => {
		const { data, currentUser } = this.state;

		writeResume({ social: data }, currentUser.uid, currentUser.resumeId)
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
				{this.social()}
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
	social() {
		const { data, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="row mb-2">
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange}
							error={errors.website}
							value={data.website}
							type="text"
							placeholder="website.com"
							name="website"
							label="Website"
							icon={<i className="fas fa-globe" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange}
							error={errors.linkedIn}
							value={data.linkedIn}
							type="text"
							placeholder="LinkedIn"
							name="linkedIn"
							label="LinkedIn"
							icon={
								<i
									style={{ color: "#0082ca" }}
									className="fab fa-linkedin-in "
								/>
							}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange}
							error={errors.twitter}
							value={data.twitter}
							type="text"
							placeholder="Twitter"
							name="twitter"
							label="Twitter"
							icon={<i className="fab fa-twitter text-info" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange}
							error={errors.quora}
							value={data.quora}
							type="text"
							placeholder="Quora"
							name="quora"
							label="Quora"
							icon={
								<i style={{ color: "#ed302f" }} className="fab fa-quora " />
							}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange}
							error={errors.facebook}
							value={data.facebook}
							type="text"
							placeholder="Facebook"
							name="facebook"
							label="Facebook"
							icon={<i className="fab fa-facebook-f text-primary" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange}
							error={errors.instagram}
							value={data.instagram}
							type="text"
							placeholder="Instagram"
							name="instagram"
							label="Instagram"
							icon={<i className="fab fa-instagram text-danger" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange}
							error={errors.github}
							value={data.github}
							type="text"
							placeholder="Github"
							name="github"
							label="Github"
							icon={<i className="fab fa-github" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange}
							error={errors.stackOverFlow}
							value={data.stackOverFlow}
							type="text"
							placeholder="StackOverFlow"
							name="stackOverFlow"
							label="StackOverFlow"
							icon={<i className="fab fa-stack-overflow" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange}
							error={errors.medium}
							value={data.medium}
							type="text"
							placeholder="Medium"
							name="medium"
							label="Medium"
							icon={<i className="fab fa-medium-m text-dark" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange}
							error={errors.whatsapp}
							value={data.whatsapp}
							type="text"
							placeholder="WhatsApp"
							name="whatsapp"
							label="WhatsApp"
							icon={
								<i className="fab fa-whatsapp" style={{ color: "green" }} />
							}
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

export default SocialForm;
