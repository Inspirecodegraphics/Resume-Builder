import React from "react";
import clsx from "clsx";
import { Route, Redirect, Switch } from "react-router-dom";
// Material UI Core
import { makeStyles } from "@material-ui/core/styles";

// Material UI Icon
import Home from "./../pages/home/Home";
import Editor from "./../pages/Editor/Editor";
import ResumeEditor from "./../pages/Editor/Resume/ResumeEditor";
import Login from "./../pages/Login";

import "./MainContent.css";
import ProtectedRoute from "../common/ProtectedRoute";
import ComingSoon from "./../ComingSoon";
import NotFound from "./../NotFound";

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
				<Route
					path="/page/legal/privacy-policy"
					exact
					component={ComingSoon}
				></Route>
				<Route path="/editor/resume/:id" component={ResumeEditor}></Route>
				<ProtectedRoute
					path="/editor"
					exact
					component={Editor}
				></ProtectedRoute>
				<Route path="/not-found" exact component={NotFound}></Route>
				<Route path="/cover-Letters" exact component={ComingSoon}></Route>
				<Route path="/resume-templates" exact component={ComingSoon}></Route>
				<Route path="/cv-templates" exact component={ComingSoon}></Route>
				<Route path="/login" exact component={Login}></Route>
				<Route path="/" exact component={Home}></Route>
				<Redirect to="not-found"></Redirect>
			</Switch>
		</main>
	);
};
export default MainContent;
