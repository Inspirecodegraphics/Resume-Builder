import React from "react";
import clsx from "clsx";
import { Route, Redirect, Switch } from "react-router-dom";
// Material UI Core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// Material UI Icon
import Home from "./../pages/home/Home";
import Editor from "./../pages/Editor/Editor";
import ResumeEditor from "./../pages/Editor/Resume/ResumeEditor";

import "./MainContent.css";

const MainContent = ({ open, drawerWidth }) => {
	const useStyles = makeStyles((theme) => ({
		drawerHeader: {
			display: "flex",
			alignItems: "center",
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
			justifyContent: "flex-end",
		},
		content: {
			flexGrow: 1,
			// padding: theme.spacing(2),
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			marginLeft: 0,
		},
		contentShift: {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: drawerWidth,
		},
	}));
	const classes = useStyles();

	return (
		<main
			className={
				clsx(classes.content, {
					[classes.contentShift]: open,
				}) + " rb-main"
			}
		>
			<div className={classes.drawerHeader} />
			<Switch>
				<Route path="/editor/resume/:id" component={ResumeEditor}></Route>
				<Route path="/editor" exact component={Editor}></Route>
				<Route path="/" exact component={Home}></Route>
			</Switch>
		</main>
	);
};
export default MainContent;
