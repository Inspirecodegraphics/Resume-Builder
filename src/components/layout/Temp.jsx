import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
export default function SideBar({ handleDrawerToggle, open, drawerWidth }) {
	const useStyles = makeStyles((theme) => ({
		list: {
			width: drawerWidth,
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		icon: { minWidth: 40 },
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
		drawerHeader: {
			display: "flex",
			alignItems: "center",
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
			justifyContent: "center",
		},
	}));
	const classes = useStyles();

	const anchor = "left";
	const toggleDrawer = () => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		handleDrawerToggle(false);
	};

	const data = [
		{
			label: "Resume Templates",
			link: "/resume-templates",
		},
		{
			label: "CV Templates",
			link: "/cv-templates",
		},
		{
			label: "Cover Letters",
			link: "/cover-Letters",
		},
		{ protected: true, label: "My Documets", link: "/editor" },
	];

	const list = () => (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer()}
			onKeyDown={toggleDrawer()}
		>
			{/* <Button fullWidth style={{ textTransform: "unset" }}>
				Getting Started
			</Button> */}

			<List>
				{data.map((item, index) => (
					<ListItem className="p-0" key={index}>
						<Button
							className="ps-3"
							fullWidth
							style={{ textTransform: "unset", justifyContent: "start" }}
						>
							<Link className={classes.link} to={item.link}>
								{item.label}
							</Link>
						</Button>
					</ListItem>
				))}
			</List>
			<Divider />
			{/* <List>
				{["All mail", "Trash", "Spam"].map((text, index) => (
					<ListItem className="p-0" key={text}>
						<Button
							className="ps-3"
							fullWidth
							style={{ textTransform: "unset" }}
						>
							{text}
						</Button>
					</ListItem>
				))}
			</List> */}
		</div>
	);

	return (
		<div>
			<Drawer
				className={classes.drawer}
				anchor={anchor}
				open={open}
				onClose={toggleDrawer()}
			>
				<div className={classes.drawerHeader}>
					<Typography variant="subtitle1" noWrap className={classes.title}>
						<b>
							<Link className={classes.link + " text-uppercase"} to="/">
								Resume Builder
							</Link>
						</b>
						<i
							className="fa fa-times ms-4"
							style={{ cursor: "pointer" }}
							onClick={handleDrawerToggle}
						></i>
					</Typography>
				</div>
				{list()}
			</Drawer>
		</div>
	);
}
