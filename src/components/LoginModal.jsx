import React, { useState } from "react";
import Joi from "joi-browser";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Link from "@material-ui/core/Link";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import "./LoginModal.css";
import { useHistory, useLocation } from "react-router-dom";
import { auth } from "./../services/firebase";
import {
	getProvider,
	signInWithFacebook,
	signInWithGoogle,
	signInWithTwitter,
	signInWithGitHub,
	signInWithEmailPassword,
	signUpWithEmailPassword,
	resetPassword,
} from "../services/utils/auth";
import { useAuth } from "../Providers/AuthProvider";

const LoginModal = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		name: "",
	});
	const [credData, setCredData] = useState({
		email: "",
		password: "",
	});
	const { setLoginModalOpen, loginModalOpen, currentUser } = useAuth();

	const [credentialModal, setCredentialModal] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [customErrors, setCustomErrors] = useState({});
	const [cred, setCred] = useState({});
	const [credMethod, setCredMethod] = useState("");
	const [errors, setErrors] = useState({});
	const [type, setType] = useState("Sign In");
	const history = useHistory();
	const location = useLocation();

	const schema = {
		email: Joi.string()
			.required()
			.email({ minDomainSegments: 1, tlds: { allow: ["com", "net"] } })
			.label("Email"),
		password: Joi.string().required().min(8).label("Password"),
		name: Joi.string().required().label("Name"),
	};

	const validate = () => {
		let data = {};
		let currentSchema = {};
		if (type === "Reset") {
			data = { email: values.email };
			currentSchema = { email: schema.email };
		} else {
			data =
				type === "Sign In"
					? { email: values.email, password: values.password }
					: { ...values };
			currentSchema =
				type === "Sign In"
					? { email: schema.email, password: schema.password }
					: { ...schema };
		}
		const result = Joi.validate(data, currentSchema, {
			abortEarly: false,
		});
		if (!result.error) return null;

		const errors = {};
		for (let item of result.error.details)
			errors[item.path[0]] = errors[item.path[0]]
				? errors[item.path[0]]
				: item.message;
		return errors;
	};
	const handleSubmit = () => (e) => {
		e.preventDefault();
		const errors = validate();
		errors ? setErrors(errors) : setErrors({});
		if (errors) return;
		doSubmit();
	};

	const validateProperty = ({ name, value }) => {
		let obj = { [name]: value };
		const currentSchema = { [name]: schema[name] };
		const { error } = Joi.validate(obj, currentSchema);
		return error ? error.details[0].message : null;
	};

	const handleChange = (prop) => ({ currentTarget: input }) => {
		const error = { ...errors };
		!credentialModal && setCustomErrors({});
		const errorMsg = validateProperty(input);
		if (errorMsg) error[input.name] = errorMsg;
		else delete error[input.name];

		const value = { ...values };
		value[input.name] = input.value;
		setValues(value);
		setErrors(error);
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleResetPassword = () => {
		setType("Reset");
	};

	const handleTypeChange = () => {
		const currentType = type;
		resetForm();
		setErrors({});
		setCustomErrors({});
		setType(currentType === "Sign In" ? "Sign Up" : "Sign In");
	};
	const handleClose = () => {
		setLoginModalOpen(false);
	};

	const handleSocialSignIn = (provider) => {
		provider()
			.then((user) => {
				console.log(user);
				redirectUser();
				setLoginModalOpen(false);
			})
			.catch((error) => {
				if (error.code === "auth/account-exists-with-different-credential") {
					var pendingCred = error.credential;
					setCred(pendingCred);
					console.log(pendingCred);
					var email = error.email;
					auth()
						.fetchSignInMethodsForEmail(email)
						.then(function (methods) {
							setCustomErrors({
								err: `An account already exists with the same email address "${email}". Sign-in with ${methods[0]}`,
							});
							const data = { ...credData };
							data.email = email;
							setCredData(data);
							setCredMethod(methods[0]);
							setCredentialModal(true);
						});
				}
			});
	};
	const handleSignInWithCred = () => {
		if (credMethod === "password") {
			var password = values.password;
			signInWithEmailPassword(credData.email, password)
				.then((result) => {
					return result.user.linkWithCredential(cred);
				})
				.then((user) => redirectUser());
			return;
		}
		auth()
			.signInWithPopup(getProvider(credMethod))
			.then((result) => {
				result.user.linkWithCredential(cred).then((usercred) => {
					redirectUser();
				});
			});
		setCred({});
		setCredMethod("");
	};
	const doSubmit = async () => {
		if (type === "Sign In") {
			signInWithEmailPassword(values.email, values.password)
				.then((data) => {
					resetForm();
					redirectUser();
					setLoginModalOpen(false);
				})
				.catch((err) => customError(err));
		}
		if (type === "Sign Up") {
			signUpWithEmailPassword(values.email, values.password)
				.then((data) => {
					resetForm();
					redirectUser();
					setLoginModalOpen(false);
				})
				.catch((err) => customError(err));
		}
		if (type === "Reset") {
			resetPassword(values.email)
				.then((data) =>
					setCustomErrors({
						err:
							"An E-mail with instructions to create a new password has been sent to you.",
					})
				)
				.catch((err) => customError(err));
		}
	};
	const redirectUser = () => {
		const { state } = location;
		if (state) window.location = state.from.pathname;
	};
	const customError = (err) => {
		console.log(err.code);
		if (err.code === "auth/user-not-found") {
			setCustomErrors({
				err: "The account with this Email is not found. Create a new one.",
			});
			// if (type === "Reset") {
			// 	setCustomErrors({
			// 		err: "The account with this Email is not found.",
			// 	});
			// } else {
			// 	setCustomErrors({
			// 		err: "The Email or password you entered was invalid.",
			// 	});
			// }
		} else if (err.code === "auth/email-already-in-use") {
			setCustomErrors({
				err: "This email is already in use. Try RESET password.",
			});
		} else if (err.code === "auth/wrong-password") {
			setCustomErrors({
				err: "The Email or password you entered was invalid.",
			});
		} else {
			setCustomErrors({ err: err.message });
		}
	};
	const resetForm = () => {
		setValues({
			email: "",
			password: "",
			name: "",
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
						<div className="modal-header text-center">
							<h5
								className="modal-title w-100 font-weight-bold text-uppercase"
								id="Auth-modal"
							>
								{type}
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
						<div className="modal-body py-3">
							<div className="col-sm-9 col-md-9 col-lg-10 text-center m-auto p-auto">
								{type === "Reset" && (
									<p className="py-2 m-0 text-primary">
										Enter your username or email to recover your password. You
										will receive an email with instructions. If you are having
										problems recovering your password
										<Link to="/support?profile"> Contact</Link>
									</p>
								)}
								{type !== "Reset" && (
									<div>
										<Tooltip placement="bottom" title="Github" arrow>
											<IconButton
												onClick={() => handleSocialSignIn(signInWithGitHub)}
												aria-label="github signIn"
											>
												<i className="fab fa-github text-dark"></i>
											</IconButton>
										</Tooltip>
										<Tooltip placement="bottom" title="Facebook" arrow>
											<IconButton
												onClick={() => handleSocialSignIn(signInWithFacebook)}
												aria-label="facebook signIn"
											>
												<i className="fab fa-facebook text-primary"></i>
											</IconButton>
										</Tooltip>
										<Tooltip placement="bottom" title="Google" arrow>
											<IconButton
												onClick={() => handleSocialSignIn(signInWithGoogle)}
												aria-label="google signIn"
											>
												<i className="social-signin google"></i>
											</IconButton>
										</Tooltip>
										<Tooltip placement="bottom" title="Twitter" arrow>
											<IconButton
												onClick={() => handleSocialSignIn(signInWithTwitter)}
												aria-label="twitter signIn"
											>
												<i className="social-signin twitter"></i>
											</IconButton>
										</Tooltip>

										<p className="h6 mt-2 mb-0">Or</p>
									</div>
								)}
								{type === "Sign Up" && (
									<FormControl className="w-100 mt-0 pt-0 ">
										<TextField
											error={errors.name}
											className="mb-1"
											id="signUp-name"
											label="Name"
											type="text"
											placeholder="Name"
											name="name"
											value={values.name}
											onChange={handleChange()}
											variant="standard"
											color="primary"
											helperText={errors.name}
											required
										></TextField>
									</FormControl>
								)}
								<FormControl className="w-100 mt-0 pt-0 ">
									<TextField
										error={errors.email}
										className=""
										id="signIn-email"
										label="Email or Username"
										autoFocus
										type="email"
										placeholder="Email"
										name="email"
										value={values.email}
										onChange={handleChange()}
										variant="standard"
										color="primary"
										helperText={
											errors.email ||
											"We'll never share your details with anyone else."
										}
										required
									></TextField>
								</FormControl>
								{type !== "Reset" && (
									<FormControl className="w-100">
										<TextField
											error={errors.password}
											className=""
											id="signIn-password"
											label="Password"
											type={showPassword ? "text" : "password"}
											placeholder="Password"
											name="password"
											value={values.password}
											onChange={handleChange()}
											variant="standard"
											color="primary"
											helperText={
												errors.password || "Your password is secured."
											}
											required
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={handleClickShowPassword}
															onMouseDown={handleMouseDownPassword}
														>
															{showPassword ? (
																<Visibility />
															) : (
																<VisibilityOff />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
										></TextField>
									</FormControl>
								)}
								<p className="p-1 m-0 customError" style={{ color: "red" }}>
									{customErrors.err}
								</p>

								{type !== "Reset" && (
									<p
										onClick={handleResetPassword}
										className="pt-2 pb-0 m-0 d-inline-block"
										style={{ cursor: "pointer", color: "blue" }}
									>
										Reset Password
									</p>
								)}
							</div>
						</div>
						<div className="modal-footer p-3 text-center d-block">
							<button
								style={{ margin: "auto", borderRadius: 50 }}
								type="submit"
								className="btn btn-primary btn-block w-75"
								data-dismiss="modal"
								onClick={handleSubmit()}
							>
								{type}
							</button>

							<FormControl className="w-75 ">
								<FormGroup row className="formRemember">
									<FormControlLabel
										value={type}
										className="mx-0 mt-1"
										labelPlacement="start"
										control={
											<Button onClick={handleTypeChange}>
												{type === "Sign In" ? "Register" : "Sign In"}
											</Button>
										}
										label={
											type === "Sign In"
												? "Not a member? "
												: "Already have an account"
										}
									/>
								</FormGroup>
							</FormControl>
							<Dialog
								maxWidth="xs"
								open={credentialModal}
								onClose={() => setCredentialModal(false)}
								aria-labelledby="form-dialog-title"
							>
								<DialogContent>
									<DialogContentText>{customErrors.err}</DialogContentText>
									{credMethod === "password" && (
										<TextField
											error={errors.password}
											className=""
											fullWidth
											id="signIn-password"
											label="Password"
											type={showPassword ? "text" : "password"}
											placeholder="Password"
											name="password"
											value={values.password}
											onChange={handleChange()}
											variant="standard"
											color="primary"
											helperText={
												errors.password || "Your password is secured."
											}
											required
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={handleClickShowPassword}
															onMouseDown={handleMouseDownPassword}
														>
															{showPassword ? (
																<Visibility />
															) : (
																<VisibilityOff />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
										></TextField>
									)}
								</DialogContent>
								<DialogActions>
									<Button
										onClick={() => setCredentialModal(false)}
										color="primary"
									>
										Cancel
									</Button>
									<Button onClick={handleSignInWithCred} color="primary">
										Continue
									</Button>
								</DialogActions>
							</Dialog>
						</div>
					</div>
				</div>
			</Fade>
		</Modal>
	);
};

export default LoginModal;
