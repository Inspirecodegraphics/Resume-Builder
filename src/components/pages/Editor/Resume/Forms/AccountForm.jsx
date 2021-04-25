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
import Form from "../../../../common/Form";
import InputField from "../../../../common/InputField";

import { writeResume } from "../../../../../services/utils/db";
import { AuthContext } from "../../../../../Providers/AuthProvider";

class AccountForm extends Form {
	static contextType = AuthContext;

	state = {
		data: {
			email: "",
			name: "",
			dob: new Date(),
			phoneNumber: "",
			address: "",
			desc: "",
			tag: "",
		},
		errors: {},
		notification: false,
		currentUser: {},
	};
	componentDidMount() {
		const { currentUser, currentResume } = this.context;
		let data = { ...this.state };
		if (currentResume.mainContent) {
			data.data = this.generateDoc(currentResume.mainContent);
		}
		data.currentUser = currentUser;
		this.setState(data);
	}
	generateDoc(data) {
		return {
			address: data.address || "",
			email: data.email || "",
			phoneNumber: data.phoneNumber || "",
			name: data.name || "",
			dob: data.dob || new Date(),
			desc: data.desc || "",
			tag: data.tag || "",
		};
	}
	schema = {
		email: Joi.string()
			.allow("")
			.email({ minDomainSegments: 1, tlds: { allow: ["com", "net"] } })
			.label("Email"),
		phoneNumber: Joi.string().allow("").max(10).min(10).label("Contact"),
		address: Joi.string().allow("").max(250).label("Address"),
		desc: Joi.string().allow("").max(500).label("Description"),
		tag: Joi.string().allow("").max(50).label("Tagline"),
		name: Joi.string().allow("").max(25).label("Name"),
		dob: Joi.optional().label("Date"),
	};

	doSubmit = async (type) => {
		const { data, currentUser } = this.state;

		writeResume({ mainContent: data }, currentUser.uid, currentUser.resumeId)
			.then((data) => {
				this.setState({ notification: true });
			})
			.catch((err) => {
				console.log(err);
			});
	};
	handleDateChange = (date) => {
		const data = { ...this.state.data };
		data.dob = date;
		this.setState({ data });
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
				{this.main()}
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

	main() {
		const { data, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="row mb-2">
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange}
							error={errors.name}
							value={data.name}
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
								value={data.dob}
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
							handleChange={this.handleChange}
							error={errors.email}
							value={data.email}
							type="text"
							placeholder="abcd@domain.com"
							name="email"
							label="Email id"
							icon={<EmailIcon fontSize="small" className="text-muted" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange}
							error={errors.phoneNumber}
							value={data.phoneNumber}
							type="text"
							placeholder="123456789"
							name="phoneNumber"
							label="Your Phone"
							icon={<PhoneIphoneIcon fontSize="small" className="text-muted" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange}
							error={errors.address}
							value={data.address}
							type="text"
							placeholder="Address"
							name="address"
							label="Address"
							icon={<LocationOnIcon fontSize="small" className="text-muted" />}
						></InputField>
					</div>
					<div className="col-md-6 my-2">
						<InputField
							handleChange={this.handleChange}
							error={errors.tag}
							value={data.tag}
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
							handleChange={this.handleChange}
							error={errors.desc}
							value={data.desc}
							type="text"
							placeholder="Enter short description"
							name="desc"
							multiline
							rows={3}
							label="Description"
							icon={<DescriptionIcon fontSize="small" className="text-muted" />}
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

export default AccountForm;
