import React, { useState, useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import SideBar from "./components/layout/Temp";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import MainContent from "./components/layout/MainContent";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "./Providers/AuthProvider";
import { oneTapSignIn } from "./services/utils/auth";
import { auth } from "./services/firebase";
const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));
function App() {
	const [open, setOpen] = useState(false);
	const [oneTapLoading, setOneTapLoading] = useState(false);

	const handleDrawerToggle = () => {
		setOpen(!open);
	};

	const handleOneTapSignIn = (response) => {
		setOneTapLoading(true);
		var credential = auth.GoogleAuthProvider.credential(response.credential);
		auth()
			.signInWithCredential(credential)
			.catch((error) => {
				console.log(error);
			})
			.then((data) => {
				setOneTapLoading(false);
			});
	};
	useEffect(() => {
		const el = document.createElement("script");
		el.setAttribute("src", "https://accounts.google.com/gsi/client");
		el.onload = () => oneTapSignIn(handleOneTapSignIn);
		el.async = true;
		el.defer = true;
		document.querySelector("body").appendChild(el);
	}, []);
	const classes = useStyles();
	return (
		<AuthProvider>
			<Router>
				<div className="default-theme">
					<Backdrop className={classes.backdrop} open={oneTapLoading}>
						<CircularProgress color="inherit" />
					</Backdrop>
					<CssBaseline />
					<SideBar
						drawerWidth={drawerWidth}
						open={open}
						handleDrawerToggle={handleDrawerToggle}
					></SideBar>
					<Navbar
						drawerWidth={drawerWidth}
						open={open}
						handleDrawerToggle={handleDrawerToggle}
					></Navbar>
					<MainContent></MainContent>
					<Footer></Footer>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
