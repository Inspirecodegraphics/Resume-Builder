import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import AccountDailog from "./AccountSettingDialog";
import { useAuth } from "../../../../Providers/AuthProvider";

const Header = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const { currentUser, currentResume } = useAuth();

	const handleModalOpen = () => {
		setModalOpen(true);
	};
	const trimUrl = (url) => {
		const https = url.replace("https://", "");
		const http = https.replace("http://", "");
		return http;
	};
	const useStyles = makeStyles((theme) => ({
		large: {
			width: theme.spacing(15),
			height: theme.spacing(15),
		},
	}));
	const icons = {
		address: "fas fa-map-marker-alt",
		phoneNumber: "fas fa-mobile-alt",
		dob: "fas fa-birthday-cake",
		email: "fas fa-envelope",
		website: "fas fa-globe",
		linkedIn: "fab fa-linkedin-in",
		twitter: "fab fa-twitter",
		facebook: "fab fa-facebook-f",
		quora: "fab fa-quora",
		instagram: "fab fa-instagram",
		stackOverFlow: "fab fa-stack-overflow",
		github: "fab fa-github",
		medium: "fab fa-medium-m",
		whatsapp: "fab fa-whatsapp",
	};

	const contentlist = ["email", "phoneNumber", "address", "dob"];
	const classes = useStyles();
	return (
		<div>
			<div className="header pt-4 px-4">
				<div className="row">
					<div className="col-2 p-0 d-flex justify-content-end align-items-center">
						<Avatar
							alt={currentUser.displayName}
							src={currentUser.photoURL}
							className={classes.large}
						/>
					</div>
					<div className="col-10 ">
						<h2
							className="mb-1 font-weight-normal text-uppercase"
							onClick={handleModalOpen}
						>
							{currentUser.displayName}
						</h2>
						<h5>{currentResume && currentResume.mainContent.tag}</h5>
						<p>{currentResume && currentResume.mainContent.desc}</p>
					</div>
				</div>
			</div>
			<hr className="rb-divider" />

			<div className="social px-3">
				<div className="row">
					{currentResume &&
						contentlist.map((content) => {
							return (
								currentResume.mainContent[content] && (
									<div key={content} className="col-6">
										<div className="row">
											<div className="col-1">
												<li className="list-group-item py-1">
													<i className={icons[content]}></i>
												</li>
											</div>
											<div className="col-11">
												<li className="list-group-item py-1">
													{(content === "phoneNumber" ||
														content === "email") && (
														<a
															target="_blank"
															rel="noreferrer"
															href={`${
																content === "email" ? "mailto:" : "tel:"
															}${currentResume.mainContent[content]}`}
														>
															{trimUrl(currentResume.mainContent[content])}
														</a>
													)}
													{content === "address" &&
														currentResume.mainContent[content]}
													{/* {content === "dob" &&
															JSON.stringify(
																currentResume.mainContent[content]
															)} */}
												</li>
											</div>
										</div>
									</div>
								)
							);
						})}
				</div>
				<div className="row">
					{currentResume &&
						Object.keys(currentResume.social).map((social) => {
							return (
								currentResume.social[social] && (
									<div key={social} className="col-6">
										<div className="row">
											<div className="col-1">
												<li className="list-group-item py-1">
													<i className={icons[social]}></i>
												</li>
											</div>
											<div className="col-11">
												<li className="list-group-item py-1">
													<a
														target="_blank"
														rel="noreferrer"
														href={currentResume.social[social]}
													>
														{trimUrl(currentResume.social[social])}
													</a>
												</li>
											</div>
										</div>
									</div>
								)
							);
						})}
				</div>
			</div>
			<hr className="rb-divider" />
			<AccountDailog open={modalOpen} setOpen={setModalOpen}></AccountDailog>
		</div>
	);
};

export default Header;
