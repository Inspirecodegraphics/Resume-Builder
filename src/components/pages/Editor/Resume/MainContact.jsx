import React, { useEffect, useContext } from "react";
import { useAuth } from "../../../../Providers/AuthProvider";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "0px 5px 0px 0px",
		padding: "0px 3px",
		minWidth: "unset",
		"& > *": {
			margin: theme.spacing(0),
		},
		fontWeight: "normal",
		lineHeight: "unset",
		display: "inline-block",
	},
	large: {
		width: 145,
		height: 145,
		zIndex: 2,
	},
}));
const MainContact = () => {
	const classes = useStyles();
	useEffect(() => {}, []);
	const { currentResume, currentUser } = useAuth();

	const empty = () => {
		return (
			<div className="py-3 pt-4 mt-1">
				<div className="row avtar-row">
					<div className="col-2 avtar-col p-0 d-flex justify-content-end align-items-center">
						<div className="avtar-outer">
							<Avatar
								alt={currentUser.displayName}
								src={currentUser.photoURL}
								className={classes.large + " avtar"}
							/>
						</div>
					</div>
					<div className="col-1 p-0 d-flex justify-content-end align-items-center"></div>

					<div className="col-11 avtar-col px-3 main-strip">
						<div className="row">
							<div className="col">
								<h2 className="mb-0 text-uppercase mainContent">
									{(currentResume.mainContent &&
										currentResume.mainContent.name) ||
										currentUser.displayName ||
										"YOUR NAME"}
								</h2>
								<div>
									<h5
										style={{ fontSize: "large" }}
										className="mb-1 mainContent"
									>
										{(currentResume.mainContent &&
											currentResume.mainContent.tag) ||
											"Professional Title"}
									</h5>
									<hr className="rb-divider my-1" />
									<p className="rb-desc m-0 mainContent">
										{(currentResume.mainContent &&
											currentResume.mainContent.desc) ||
											"Short and engaging pitch about yourself."}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
	return currentResume ? empty() : "";
};

export default MainContact;
