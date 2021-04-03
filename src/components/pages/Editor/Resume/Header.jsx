import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import AccountDailog from "./AccountSettingDialog";

const Header = ({ user }) => {
	const [modalOpen, setModalOpen] = useState(true);

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
	const classes = useStyles();

	return (
		<div>
			{user && (
				<div className="rb-editor-page text-dark" id="editor">
					<div className="header pt-4 px-3">
						<div className="row">
							<div className="col-3 d-flex justify-content-end align-items-center">
								<Avatar
									alt={user.name}
									src={user.imgUrl}
									className={classes.large}
								/>
							</div>
							<div className="col-9 ">
								<h2
									className="mb-1 font-weight-normal"
									onClick={handleModalOpen}
								>
									{user.name}
								</h2>
								<h5>{user.tag}</h5>
								<p>{user.desc}</p>
							</div>
						</div>
					</div>
					<hr className="rb-divider" />
					<div className="social px-3">
						<div className="row">
							{Object.keys(user.mainContact).map((contact) => (
								<div className="col-6">
									<div className="row">
										<div className="col-1">
											<li class="list-group-item py-1">
												<i class={user.mainContact[contact].icon}></i>
											</li>
										</div>
										<div className="col-11">
											<li class="list-group-item py-1">
												{contact !== "address" && (
													<a
														target="_blank"
														rel="noreferrer"
														href={
															contact === "email"
																? `mailto:${user.mainContact[contact].link}`
																: contact === "phoneNumber"
																? `tel:${user.mainContact[contact].link}`
																: user.mainContact[contact].link
														}
													>
														{trimUrl(user.mainContact[contact].link)}
													</a>
												)}
												{contact === "address" &&
													user.mainContact[contact].link}
											</li>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="row">
							{Object.keys(user.socialInfo).map((social) => {
								return (
									user.socialInfo[social].link && (
										<div className="col-6">
											<div className="row">
												<div className="col-1">
													<li class="list-group-item py-1">
														<i class={user.socialInfo[social].icon}></i>
													</li>
												</div>
												<div className="col-11">
													<li class="list-group-item py-1">
														<a
															target="_blank"
															rel="noreferrer"
															href={user.socialInfo[social].link}
														>
															{trimUrl(user.socialInfo[social].link)}
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
				</div>
			)}

			<AccountDailog
				open={modalOpen}
				setOpen={setModalOpen}
				user={user}
			></AccountDailog>
		</div>
	);
};

export default Header;
