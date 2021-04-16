import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import SideBar from "./components/layout/Temp";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainContent from "./components/layout/MainContent";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "./Providers/AuthProvider";
import { oneTapSignIn } from "./services/utils/auth";
const drawerWidth = 220;

function App() {
	const [open, setOpen] = useState(false);

	const handleDrawerToggle = () => {
		setOpen(!open);
	};
	useEffect(() => {
		window.addEventListener("load", oneTapSignIn);
	}, []);

	return (
		<AuthProvider>
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
		</AuthProvider>
	);
}

export default App;
