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
import Form from "./common/Form";
import {
	signInWithFacebook,
	signInWithGoogle,
	signInWithTwitter,
	signInWithGitHub,
	signInWithEmailPassword,
} from "./../services/utils/auth";

class LoginModal extends Form {
	state = {
		mainContent: {
			email: "",
			password: "",
			showPassword: false,
		},
		errors: {},
	};

	schema = {
		email: Joi.string()
			.email({ minDomainSegments: 1, tlds: { allow: ["com", "net"] } })
			.label("Email"),
		password: Joi.string().max(25).label("Subject"),
	};
	doSubmit = async () => {
		console.log("Your messege has been sent.", this.state.mainContent);

		this.setState({
			notification: true,
			mainContent: {
				email: "",
				password: "",
				showPassword: false,
			},
		});
	};

	render() {
		const { loginModalOpen, setLoginModalOpen } = this.props;
		const { mainContent, errors, subscribe, notification } = this.state;
		console.log(typeof loginModalOpen, loginModalOpen);
		return (
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				// className={classes.modal}
				open={loginModalOpen}
				onClose={setLoginModalOpen(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				{/* {loginModalOpen && "HI"} */}
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
									<span aria-hidden="true" onClick={setLoginModalOpen(false)}>
										&times;
									</span>
								</button>
							</div>
							<div className="modal-footer p-2 text-center d-block">
								<button
									style={{ margin: "auto", borderRadius: 50 }}
									type="submit"
									className="btn btn-primary btn-block w-75"
									data-dismiss="modal"
									// onClick={handleSignInClick}
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
												<Link
													component="button"
													variant="body2"
													href="/register"
												>
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
	}
}

export default LoginModal;
