import React, { useState } from "react";
import Joi from "joi-browser";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import Link from "@material-ui/core/Link";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import "./LoginModal.css";
import {
	signInWithFacebook,
	signInWithGoogle,
	signInWithTwitter,
	signInWithGitHub,
	signInWithEmailPassword,
} from "../services/utils/auth";

const LoginModal = ({ setLoginModalOpen, loginModalOpen }) => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		showPassword: false,
		rememberMe: true,
	});
	const schema = {
		email: Joi.string()
			.email({ minDomainSegments: 1, tlds: { allow: ["com", "net"] } })
			.label("Email")
			.required(),
		password: Joi.string().label("Password"),
	};

	const handleChange = (prop) => (event) => {
		const data = { ...values };
		if (prop === "rememberMe") {
			data[event.target.name] = event.target.checked;
		} else {
			data[prop] = event.target.value;
		}
		setValues(data);
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleOpen = () => {
		setLoginModalOpen(true);
	};

	const handleClose = () => {
		setLoginModalOpen(false);
	};

	const handleSignInClick = () => {
		signInWithEmailPassword(values.email, values.password);
	};
	const doSubmit = async () => {
		// firebase.writeToUs(this.state.mainContent);
		// setUserContact(this.state.mainContent);
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
	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			// className={classes.modal}
			open={loginModalOpen}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={loginModalOpen}>
				<div className="modal-dialog w-85 mx-auto">
					<div className="modal-content">
						<div className="modal-header py-2 text-center">
							<h5
								className="modal-title w-100 font-weight-bold"
								id="exampleModalLabel"
							>
								SIGN IN WITH
							</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true" onClick={handleClose}>
									&times;
								</span>
							</button>
						</div>
						<div className="modal-body pt-2 pb-0">
							<div className="col-sm-9 col-md-9 col-lg-10 text-center m-auto p-auto">
								<div>
									<Tooltip placement="bottom" title="Github" arrow>
										<IconButton
											onClick={signInWithGitHub}
											aria-label="github signIn"
										>
											<i class="fab fa-github text-dark"></i>
										</IconButton>
									</Tooltip>
									<Tooltip placement="bottom" title="Facebook" arrow>
										<IconButton
											onClick={signInWithFacebook}
											aria-label="facebook signIn"
										>
											<i class="fab fa-facebook text-primary"></i>
										</IconButton>
									</Tooltip>
									<Tooltip placement="bottom" title="Google" arrow>
										<IconButton
											onClick={signInWithGoogle}
											aria-label="google signIn"
										>
											<i class="social-signin google"></i>
										</IconButton>
									</Tooltip>
									<Tooltip placement="bottom" title="Twitter" arrow>
										<IconButton
											onClick={signInWithTwitter}
											aria-label="twitter signIn"
										>
											<i class="social-signin twitter"></i>
										</IconButton>
									</Tooltip>

									<p className="h6 mt-2 mb-0">Or</p>
								</div>
								<FormControl className="w-100 mt-0 pt-0 ">
									<TextField
										error={false}
										className=""
										id="filled-name"
										label="Username"
										autoFocus
										placeholder="username or email"
										value={values.email}
										onChange={handleChange("email")}
										variant="standard"
										color="primary"
										helperText="We'll never share your details with anyone else."
										required
									></TextField>
								</FormControl>
								<FormControl className="w-100">
									<InputLabel required htmlFor="standard-adornment-password">
										Password
									</InputLabel>
									<Input
										id="standard-adornment-password"
										type={values.showPassword ? "text" : "password"}
										value={values.password}
										onChange={handleChange("password")}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
												>
													{values.showPassword ? (
														<Visibility />
													) : (
														<VisibilityOff />
													)}
												</IconButton>
											</InputAdornment>
										}
									/>
									<FormHelperText id="standard-weight-helper-text">
										Your password is secured.
									</FormHelperText>
								</FormControl>
								<FormControl className="w-100 ">
									<FormGroup row className="formRemember ">
										<FormControlLabel
											className="mx-0 mb-0"
											control={
												<Checkbox
													className="px-2"
													checked={values.rememberMe}
													onChange={handleChange("rememberMe")}
													name="rememberMe"
												/>
											}
											label="Remember Me"
										/>
										<FormControlLabel
											className="mx-0 mb-0"
											control={
												<Link
													component="button"
													variant="body2"
													href="/forgot-password"
												>
													<a href="/forgot-password">Forgot Password</a>
												</Link>
											}
										/>
									</FormGroup>
								</FormControl>
							</div>
						</div>
						<div className="modal-footer p-2 text-center d-block">
							<button
								style={{ margin: "auto", borderRadius: 50 }}
								type="submit"
								className="btn btn-primary btn-block w-75"
								data-dismiss="modal"
								onClick={handleSignInClick}
							>
								Sign In
							</button>
							<FormControl className="w-75 ">
								<FormGroup row className="formRemember ">
									<FormControlLabel
										value="register"
										className="mx-0 mt-1"
										labelPlacement="start"
										control={
											<Link component="button" variant="body2" href="/register">
												<a href="/register"> Register</a>
											</Link>
										}
										label="Not a member? "
									/>
								</FormGroup>
							</FormControl>
						</div>
					</div>
				</div>
			</Fade>
		</Modal>
	);
};

export default LoginModal;
