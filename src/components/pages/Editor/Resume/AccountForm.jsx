import React from "react";
import Joi from "joi-browser";
import Form from "../../../common/Form";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import InputAdornment from "@material-ui/core/InputAdornment";
// Material UI Icons
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import EmailIcon from "@material-ui/icons/Email";
import SubjectIcon from "@material-ui/icons/Subject";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonIcon from "@material-ui/icons/Person";
import SendIcon from "@material-ui/icons/Send";
import { setUserContact } from "../../../../services/resumeService";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

// import firebase from "../../../services/firebase";

class AccountForm extends Form {
	state = {
		mainContent: {
			email: "",
			phoneNumber: "",
			address: "",
		},
		notification: false,
		subscribe: false,
		errors: {},
	};
	componentDidMount() {
		let { user } = this.props;
		let mainContent = {
			address: user.mainContact.address.link,
			email: user.mainContact.email.link,
			phoneNumber: user.mainContact.phoneNumber.link,
		};
		this.setState({ mainContent });
	}
	schema = {
		name: Joi.string().label("Name"),
		email: Joi.string()
			.email({ minDomainSegments: 1, tlds: { allow: ["com", "net"] } })
			.label("Email"),
		phoneNumber: Joi.string().max(10).min(10).label("Contact"),
		subject: Joi.string().max(25).label("Subject"),
		address: Joi.string().max(250).label("Address"),
	};
	doSubmit = async () => {
		// firebase.writeToUs(this.state.mainContent);
		setUserContact(this.state.mainContent);
		console.log("Your messege has been sent.", this.state.mainContent);

		this.setState({
			notification: true,
			mainContent: {
				name: "",
				email: "",
				phoneNumber: "",
				subject: "",
				address: "",
			},
		});
	};
	render() {
		const { mainContent, errors, subscribe, notification } = this.state;
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="row mb-2">
					<div className="col-md-6 my-2">
						<TextField
							error={errors.email}
							className=""
							placeholder="abcd@domain.com"
							id="email"
							label="Email id"
							type="email"
							fullWidth
							name="email"
							value={mainContent.email}
							onChange={this.handleChange}
							variant="standard"
							color="primary"
							helperText={errors.email}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<EmailIcon fontSize="small" className="text-muted" />
									</InputAdornment>
								),
							}}
						></TextField>
					</div>
					<div className="col-md-6 my-2">
						<TextField
							error={errors.phoneNumber}
							className=""
							type="tel"
							id="phoneNumber"
							label="Your Phone"
							fullWidth
							placeholder="9999999999"
							value={mainContent.phoneNumber}
							name="phoneNumber"
							onChange={this.handleChange}
							variant="standard"
							color="primary"
							helperText={errors.phoneNumber}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<PhoneIphoneIcon fontSize="small" className="text-muted" />
									</InputAdornment>
								),
							}}
						></TextField>
					</div>
				</div>
				<div className="row mb-2 position-relative">
					<div className="col-12 my-2 pr-5">
						<TextField
							error={errors.address}
							id="address"
							label="Address"
							fullWidth
							className="pr-5"
							placeholder="Address"
							name="address"
							value={mainContent.address}
							onChange={this.handleChange}
							variant="standard"
							color="primary"
							helperText={errors.address}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LocationOnIcon fontSize="small" className="text-muted" />
									</InputAdornment>
								),
							}}
						></TextField>
					</div>
					<div className="col my-2">
						<FormControlLabel
							className="mx-0 mb-0"
							control={
								<Checkbox
									checked={subscribe}
									onChange={(e) =>
										this.setState({ subscribe: e.target.checked })
									}
									name="Subscribe"
								/>
							}
							label="Subscribe Us to get latest update."
						/>
					</div>
					{/* <div
						className="bg-dark btn-rounded"
						style={{ position: "absolute", top: 25, right: 12 }}
					>
						<IconButton aria-label="send" type="submit">
							<SendIcon
								style={{
									fontSize: 40,
									color: "white",
									transform: "rotate(-45deg)",
								}}
							/>
						</IconButton>
					</div> */}
				</div>
				<Snackbar
					anchorOrigin={{ vertical: "top", horizontal: "right" }}
					open={notification}
					onClose={() => {
						this.setState({ notification: false });
					}}
					message="Message sent successfully."
					autoHideDuration={2000}
				/>
				<DialogActions>
					<Button onClick={this.props.handleClose} color="primary">
						Cancel
					</Button>
					<Button
						onClick={this.props.handleClose}
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
