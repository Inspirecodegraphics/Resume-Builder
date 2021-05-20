import React, { useContext } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

// MIUI Core
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
// MIUI Icons
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";

import Dropdown from "../common/Dropdown";
import { useAuth } from "../../Providers/AuthProvider";
import LoginModal from "./../LoginModal";
import UserDropdown from "./UserDropdown";
import icon from "../../static/logo.png";
const Navbar = ({ handleDrawerToggle, drawerWidth }) => {
	const useStyles = makeStyles((theme) => ({
		appBar: {
			transition: theme.transitions.create(["margin", "width"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		title: {
			flexGrow: 1,
		},
		button: {
			...theme.typography.button,
			backgroundColor: theme.palette.background.paper,
			padding: theme.spacing(1),
		},
		drawerPaper: {
			width: drawerWidth,
		},
		search: {
			position: "relative",
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			"&:hover": {
				backgroundColor: fade(theme.palette.common.white, 0.25),
			},
			marginLeft: 0,
			width: "auto",
			cursor: "pointer",
		},
		searchIcon: {
			padding: theme.spacing(0, 2),
			height: "100%",
			position: "absolute",
			pointerEvents: "none",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		inputRoot: {
			color: "inherit",
		},

		inputInput: {
			padding: theme.spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create("width"),
			// width: "100%",
			// [theme.breakpoints.up("sm")]: {
			//   width: "0ch",
			//   "&:focus": {
			//     width: "20ch",
			//   },
			// },

			width: "0ch",
			"&:focus": {
				width: "20ch",
			},
		},
		linkButton: {
			"&:hover": {
				backgroundColor: "transparent",
			},
			backgroundColor: "transparent",
		},
		link: {
			"& > * + *": {
				marginLeft: theme.spacing(2),
			},
			"&:hover": {
				color: "orange",
			},
			color: "black",
			textTransform: "capitalize",
		},
	}));
	// const [loginModalOpen, setLoginModalOpen] = React.useState(false);
	const { currentUser, setLoginModalOpen } = useAuth();
	const classes = useStyles();

	const notification = {
		type: "Notification",
		label: "current notification",
		className: "notification-appbar",
		icon: <NotificationsNoneIcon />,
		menuItem: [
			{
				label: "Profile",
				link: "https://avatars1.githubusercontent.com/u/52340682?s=400&v=4",
				renderText: () => {
					return (
						<p>
							You can follow us on
							<a href="https://twitter.com/guptaashwanee"> Twitter</a> to
							receive exclusive tips and updates about Resume Builder and
							Inspire Code & Graphics.
						</p>
					);
				},
			},
		],
	};

	const preventDefault = (event) => event.preventDefault();
	return (
		<AppBar color="white" position="fixed" className={clsx(classes.appBar)}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
					className="d-lg-none"
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="subtitle1" noWrap className={classes.title}>
					<b>
						<Link className={classes.link + " text-uppercase"} to="/">
							<img src={icon} alt="" style={{ width: "40px" }} /> Resume Base
						</Link>
					</b>
				</Typography>

				<Typography className="d-none d-lg-block" variant="subtitle1">
					<Link className={classes.link + " px-2"} to="/resume-templates">
						Resume Templates
					</Link>
				</Typography>
				<Typography className="d-none d-lg-block" variant="subtitle1">
					<Link className={classes.link + " px-2"} to="/cv-templates">
						CV Templates
					</Link>
				</Typography>
				<Typography className="d-none d-lg-block" variant="subtitle1">
					<Link className={classes.link + " px-2"} to="/cover-Letters">
						Cover Letters
					</Link>
				</Typography>

				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder="Search…"
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ "aria-label": "search" }}
					/>
				</div>

				<Dropdown item={notification}></Dropdown>

				<Divider orientation="vertical" flexItem />
				{currentUser && (
					<Typography className="d-none d-lg-block" variant="subtitle1">
						<Link className={classes.link + " px-2"} to="/editor">
							My Documets
						</Link>
					</Typography>
				)}

				<UserDropdown setLoginModalOpen={setLoginModalOpen}></UserDropdown>
			</Toolbar>
			{!currentUser && <LoginModal></LoginModal>}
		</AppBar>
	);
};

export default Navbar;
