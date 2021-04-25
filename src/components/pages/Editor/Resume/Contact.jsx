import React from "react";
import { useAuth } from "../../../../Providers/AuthProvider";
import _ from "lodash";
const Contact = () => {
	const { currentResume } = useAuth();
	const icons = {
		address: "fas fa-map-marker-alt",
		phoneNumber: "fas fa-mobile-alt",
		dob: "fas fa-birthday-cake",
		email: "fas fa-envelope",
		website: "fas fa-globe",
		linkedIn: "fab fa-linkedin-in",
		github: "fab fa-github",
		twitter: "fab fa-twitter",
		facebook: "fab fa-facebook-f",
		quora: "fab fa-quora",
		instagram: "fab fa-instagram",
		stackOverFlow: "fab fa-stack-overflow",
		medium: "fab fa-medium-m",
		whatsapp: "fab fa-whatsapp",
	};
	const trimUrl = (url) => {
		const https = url.replace("https://", "");
		const http = https.replace("http://", "");
		return http;
	};
	_.uniq([2, 1, 2]);
	const mainContent = ["email", "phoneNumber", "dob", "address"];
	const social = ["website", "github", "linkedIn", "twitter"];
	const contact = () => {
		return (
			<div className="py-2 contact">
				<h6 className="d-flex align-items-center">
					<div className="rb-icon-circle">
						<i className="fas fa-address-book"></i>
					</div>
					<b className="ps-2">CONTACT</b>
				</h6>
				{mainContent.map((content) => {
					return (
						currentResume.mainContent &&
						currentResume.mainContent[content] && (
							<div className="row mx-0 pb-1">
								<div className="col-1 px-0 text-center">
									<i className={icons[content]}></i>
								</div>
								<div className="col-11 px-1 eclips">
									{(content === "phoneNumber" || content === "email") && (
										<a
											target="_blank"
											rel="noreferrer"
											href={`${content === "email" ? "mailto:" : "tel:"}${
												currentResume.mainContent[content]
											}`}
										>
											{trimUrl(currentResume.mainContent[content])}
										</a>
									)}
									{content === "address" && currentResume.mainContent[content]}
									{/* {content === "dob" &&
															JSON.stringify(
																currentResume.mainContent[content]
															)} */}
								</div>
							</div>
						)
					);
				})}
				{currentResume.social &&
					_.uniq(social.concat(Object.keys(currentResume.social))).map(
						(social) => {
							return (
								currentResume.social[social] && (
									<div className="row mx-0 pb-1">
										<div className="col-1 px-0 text-center">
											<i className={icons[social]}></i>
										</div>
										<div className="col-11 px-1 eclips">
											<a
												target="_blank"
												rel="noreferrer"
												href={currentResume.social[social]}
											>
												{trimUrl(currentResume.social[social])}
											</a>
										</div>
									</div>
								)
							);
						}
					)}
			</div>
		);
	};
	const empty = () => {
		return (
			<div className="py-3">
				<h6 className="d-flex align-items-center">
					<div className="rb-icon-circle">
						<i className="fas fa-address-book"></i>
					</div>
					<b className="ps-2">CONTACT</b>
				</h6>
				<b>
					<p className="my-1">Contact</p>
				</b>
				<p className="my-1">
					<i className="fas fa-city"></i> Social Profiles
				</p>
			</div>
		);
	};
	return currentResume ? contact() : empty();
};

export default Contact;
