import React from "react";
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
		width: theme.spacing(16),
		height: theme.spacing(16),
	},
}));
const MainContact = () => {
	const classes = useStyles();

	const { currentResume, currentUser } = useAuth();

	const empty = () => {
		return (
			<div className="pt-3 pb-2 mainContact">
				<div className="row p-1 ">
					<div className="col-3 p-0 d-flex justify-content-end align-items-center">
						<div className="avtar-outer">
							<Avatar
								alt={currentUser.displayName}
								src={currentUser.photoURL}
								className={classes.large + " avtar"}
							/>
						</div>
					</div>
					<div className="col-9 px-2 main-strip">
						<h2 className="mb-0 text-uppercase">{currentUser.displayName}</h2>
						{currentResume.mainContent && (
							<div>
								<h5 style={{ fontSize: "large" }} className="mb-1">
									{currentResume.mainContent.tag}
								</h5>
								<hr className="rb-divider my-1" />
								<p style={{ height: "85px" }} className="rb-desc m-0">
									{currentResume.mainContent.desc}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	};
	return empty();
};

export default MainContact;
