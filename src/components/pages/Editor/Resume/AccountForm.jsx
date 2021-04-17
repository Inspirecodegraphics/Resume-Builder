import React from "react";
import Joi from "joi-browser";
import "date-fns";
// Material UI Core
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import InputAdornment from "@material-ui/core/InputAdornment";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
// Material UI Icons
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import EmailIcon from "@material-ui/icons/Email";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import DescriptionIcon from "@material-ui/icons/Description";
import Form from "../../../common/RbForm";
import InputField from "../../../common/InputField";
// import firebase from "../../../services/firebase";
import { writeResume } from "./../../../../services/utils/db";

class AccountForm extends Form {
	state = {
		mainContent: {
			email: "",
			name: "",
			dob: new Date(),
			phoneNumber: "",
			address: "",
			desc: "",
			tag: "",
		},
		social: {
			website: "",
			linkedIn: "",
			twitter: "",
			facebook: "",
			quora: "",
			instagram: "",
			stackOverFlow: "",
			github: "",
		},
		errors: {},
		notification: false,
	};
	componentDidMount() {
		const { currentResume } = this.props;
		const mainContent = this.generateDoc(
			currentResume.mainContent,
			"mainContent"
		);
		this.setState({ mainContent });
		const social = this.generateDoc(currentResume.social, "social");
		this.setState({ social });
	}
	generateDoc(data, dataType) {
		return dataType === "mainContent"
			? {
					address: data.address || "",
					email: data.email || "",
					phoneNumber: data.phoneNumber || "",
					name: data.name || "",
					dob: data.dob || new Date(),
					desc: data.desc || "",
					tag: data.tag || "",
			  }
			: {
					website: data.website || "",
					linkedIn: data.linkedIn || "",
					twitter: data.twitter || "",
					facebook: data.facebook || "",
					quora: data.quora || "",
					instagram: data.instagram || "",
					stackOverFlow: data.stackOverFlow || "",
					github: data.github || "",
			  };
	}
	schema = {
		mainContent: {
			email: Joi.string()
				.allow("")
				.email({ minDomainSegments: 1, tlds: { allow: ["com", "net"] } })
				.label("Email"),
			phoneNumber: Joi.string().allow("").max(10).min(10).label("Contact"),
			address: Joi.string().allow("").max(250).label("Address"),
			desc: Joi.string().allow("").max(250).label("Description"),
			tag: Joi.string().allow("").max(50).label("Tagline"),
			name: Joi.string().allow("").max(25).label("Name"),
			dob: Joi.optional().label("Date"),
		},
		social: {
			website: Joi.string().allow("").uri(),
			linkedIn: Joi.string().allow("").uri(),
			twitter: Joi.string().allow("").uri(),
			facebook: Joi.string().allow("").uri(),
			quora: Joi.string().allow("").uri(),
			instagram: Joi.string().allow("").uri(),
			stackOverFlow: Joi.string().allow("").uri(),
			github: Joi.string().allow("").uri(),
		},
	};

	doSubmit = async (type) => {
		// firebase.writeToUs(this.state.mainContent);
		console.log("Content", this.state[type]);
		console.log("Error", this.state.errors);
		writeResume(
			{ [type]: this.state[type] },
			this.props.currentUser.uid,
			this.props.currentUser.resumeId
		)
			.then((data) => {
				console.log(data);
				this.setState({ notification: true });
			})
			.catch((err) => {
				console.log(err);
			});
	};
	handleDateChange = (date) => {
		const mainContent = { ...this.state.mainContent };
		mainContent.dob = date;
		this.setState({ mainContent });
	};
	handleNotificationClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		this.setState({ notification: false });
	};
	render() {
		const { type } = this.props;
		const { notification } = this.state;

		return (
			<div>
				{type === "Main Contact" ? this.main() : this.social()}
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
		const { social, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit("social")}>
				<div className="row mb-2">
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange("social")}
							error={errors.website}
							value={social.website}
							type="text"
							placeholder="website.com"
							name="website"
							label="Website"
							icon={<i className="fas fa-globe" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange("social")}
							error={errors.linkedIn}
							value={social.linkedIn}
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
							handleChange={this.handleChange("social")}
							error={errors.twitter}
							value={social.twitter}
							type="text"
							placeholder="Twitter"
							name="twitter"
							label="Twitter"
							icon={<i className="fab fa-twitter text-info" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange("social")}
							error={errors.quora}
							value={social.quora}
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
							handleChange={this.handleChange("social")}
							error={errors.facebook}
							value={social.facebook}
							type="text"
							placeholder="Facebook"
							name="facebook"
							label="Facebook"
							icon={<i className="fab fa-facebook-f text-primary" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange("social")}
							error={errors.instagram}
							value={social.instagram}
							type="text"
							placeholder="Instagram"
							name="instagram"
							label="Instagram"
							icon={<i className="fab fa-instagram text-danger" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange("social")}
							error={errors.github}
							value={social.github}
							type="text"
							placeholder="Github"
							name="github"
							label="Github"
							icon={<i className="fab fa-github" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange("social")}
							error={errors.stackOverFlow}
							value={social.stackOverFlow}
							type="text"
							placeholder="StackOverFlow"
							name="stackOverFlow"
							label="StackOverFlow"
							icon={<i className="fab fa-stack-overflow" />}
						></InputField>
					</div>
				</div>
				<DialogActions>
					<Button onClick={this.props.handleClose} color="primary">
						Cancel
					</Button>
					<Button
						// onClick={this.props.handleClose}
						type="submit"
						color="primary"
					>
						Save
					</Button>
				</DialogActions>
			</form>
		);
	}
	main() {
		const { mainContent, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit("mainContent")}>
				<div className="row mb-2">
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange("mainContent")}
							error={errors.name}
							value={mainContent.name}
							type="Name"
							placeholder="User"
							name="name"
							label="Name"
							icon={<i className="fas fa-user text-muted" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								fullWidth
								id="dob"
								placeholder="MM/dd/yyyy"
								label="Date of Birth"
								format="MM/dd/yyyy"
								value={mainContent.dob}
								onChange={this.handleDateChange}
								KeyboardButtonProps={{
									"aria-label": "change date",
								}}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<i className="far fa-calendar-alt text-muted"></i>
										</InputAdornment>
									),
								}}
							/>
						</MuiPickersUtilsProvider>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange("mainContent")}
							error={errors.email}
							value={mainContent.email}
							type="text"
							placeholder="abcd@domain.com"
							name="email"
							label="Email id"
							icon={<EmailIcon fontSize="small" className="text-muted" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange("mainContent")}
							error={errors.phoneNumber}
							value={mainContent.phoneNumber}
							type="text"
							placeholder="123456789"
							name="phoneNumber"
							label="Your Phone"
							icon={<PhoneIphoneIcon fontSize="small" className="text-muted" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange("mainContent")}
							error={errors.address}
							value={mainContent.address}
							type="text"
							placeholder="Address"
							name="address"
							label="Address"
							icon={<LocationOnIcon fontSize="small" className="text-muted" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange("mainContent")}
							error={errors.tag}
							value={mainContent.tag}
							type="text"
							placeholder="Tagline"
							name="tag"
							label="Tagline"
							icon={
								<LabelImportantIcon fontSize="small" className="text-muted" />
							}
						></InputField>
					</div>
					<div className="col-md-12 my-2">
						<InputField
							handleChange={this.handleChange("mainContent")}
							error={errors.desc}
							value={mainContent.desc}
							type="text"
							placeholder="Enter short description"
							name="desc"
							multiline
							rows={2}
							label="Description"
							icon={<DescriptionIcon fontSize="small" className="text-muted" />}
						></InputField>
					</div>
				</div>

				<DialogActions>
					<Button onClick={this.props.handleClose} color="primary">
						Cancel
					</Button>
					<Button
						// onClick={this.props.handleClose}
						type="submit"
						color="primary"
					>
						Save
					</Button>
				</DialogActions>
			</form>
		);
	}
}

export default AccountForm;
