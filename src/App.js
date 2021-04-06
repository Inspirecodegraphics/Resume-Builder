import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import { auth } from "./services/firebase";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import SideBar from "./components/layout/Sidebar";
import Home from "./components/pages/home/Home";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainContent from "./components/layout/MainContent";
import Footer from "./components/layout/Footer";
import UserProvider from "./Providers/userProvider";
const drawerWidth = 240;

function App() {
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState(null);

	const handleDrawerToggle = () => {
		setOpen(!open);
	};
	useEffect(() => {
		auth().onAuthStateChanged((userAuth) => {
			setUser(userAuth);
		});
	});

	return (
		<UserProvider>
			<Router>
				<div>
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
		</UserProvider>
	);
}

export default App;
