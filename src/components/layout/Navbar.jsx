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
import { signInWithGoogle } from "../../services/utils/auth";
import { UserContext } from "./../../Providers/userProvider";
import LoginModal from "./../LoginModal";

const Navbar = ({ open, handleDrawerToggle, drawerWidth }) => {
	const useStyles = makeStyles((theme) => ({
		appBar: {
			transition: theme.transitions.create(["margin", "width"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		appBarShift: {
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(["margin", "width"], {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: drawerWidth,
		},
		title: {
			flexGrow: 1,
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
			width: "100%",
			cursor: "pointer",
			[theme.breakpoints.up("sm")]: {
				marginLeft: theme.spacing(1),
				width: "auto",
			},
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
	const [loginModalOpen, setLoginModalOpen] = React.useState(true);

	const currentUser = useContext(UserContext);
	const classes = useStyles();
	const user = {
		type: "User",
		label: "current user",
		className: "menu-appbar",
		icon: <AccountCircle />,
		menuItem: [
			{
				label: `${currentUser ? currentUser.displayName : "asd"}`,
				link: "/profile",
			},
			{
				label: "My account",
				link: "/my-account",
			},
		],
	};
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

	// const signInWithGoogle = () => {
	//   const provider = new firebase.auth.GoogleAuthProvider();
	//   auth.signInWithPopup(provider);
	// }
	const preventDefault = (event) => event.preventDefault();
	return (
		<AppBar
			color="white"
			position="fixed"
			className={clsx(classes.appBar, {
				[classes.appBarShift]: open,
			})}
		>
			<Toolbar
			// variant="dense"
			>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
					// className={clsx(open && classes.hide)}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="subtitle1" noWrap className={classes.title}>
					<b>
						<Link className={classes.link} to="/">
							Resume Builder
						</Link>
					</b>
				</Typography>

				<Button className={classes.linkButton}>
					<Link className={classes.link} to="/editor">
						Editor
					</Link>
				</Button>
				<Button className={classes.linkButton}>
					<Link className={classes.link} to="/resume-templates">
						Resume Templates
					</Link>
				</Button>
				<Button className={classes.linkButton}>
					<Link className={classes.link} to="/cv-templates">
						CV Templates
					</Link>
				</Button>
				<Button className={classes.linkButton}>
					<Link className={classes.link} to="/cover-Letters">
						Cover Letters
					</Link>
				</Button>

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

				<Dropdown setLoginModalOpen={setLoginModalOpen} item={user}></Dropdown>
			</Toolbar>
			<LoginModal
				loginModalOpen={loginModalOpen}
				setLoginModalOpen={setLoginModalOpen}
			></LoginModal>
		</AppBar>
	);
};

export default Navbar;
