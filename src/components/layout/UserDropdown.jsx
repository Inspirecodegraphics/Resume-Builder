import React from "react";
// MIUI Core
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
import Avatar from "@material-ui/core/Avatar";

// SVG Icons
import { useAuth } from "../../Providers/AuthProvider";
import { logout } from "../../services/utils/auth";
const useStyles = makeStyles((theme) => ({
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
}));
const UserDropdown = ({ setLoginModalOpen }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const { currentUser } = useAuth();
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
		setLoginModalOpen(true);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogout = () => {
		logout().then(() => {
			console.log("Logout");
			setLoginModalOpen(false);
			window.location = "/";
		});
	};

	const classes = useStyles();

	return (
		<div>
			<Tooltip placement="bottom" title="User" arrow>
				<IconButton
					aria-label="Current User"
					aria-controls="UserMenu-appbar"
					aria-haspopup="true"
					onClick={handleMenu}
					color="inherit"
				>
					<Avatar
						alt={currentUser && currentUser.displayName}
						className={classes.small}
						src={currentUser && currentUser.photoURL}
					>
						{currentUser &&
							currentUser.displayName &&
							currentUser.displayName[0]}
					</Avatar>
				</IconButton>
			</Tooltip>
			{currentUser && (
				<Popover
					id="UserMenu-appbar"
					keepMounted
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
					open={open}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose}>
						{currentUser.displayName || "My Profile"}
					</MenuItem>
					<MenuItem onClick={handleLogout}>Logout</MenuItem>
				</Popover>
			)}
		</div>
	);
};

export default UserDropdown;
