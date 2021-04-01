import { Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";

import "./Footer.css";

function Footer({ drawerWidth, open }) {
	const useStyles = makeStyles((theme) => ({
		footer: {
			transition: theme.transitions.create(["margin", "width"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		footerShift: {
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(["margin", "width"], {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: drawerWidth,
		},
	}));
	const classes = useStyles();
	function scrollToTop() {
		window.scrollTo(0, 0);
	}

	return (
		<div
			className={clsx(classes.footer, {
				[classes.footerShift]: open,
			})}
		>
			<footer className="footer">
				<Grid container>
					<Grid item xs={12} sm={6} md={3} className="footer-col">
						<h6 style={{ margin: "6px 6px 6px 0" }}>Company</h6>
						<br />
						<Link to="/" onClick={scrollToTop}>
							About Us
						</Link>
						<br />
						<br />
						<Link to="/" onClick={scrollToTop}>
							Blog
						</Link>
						<br />
						<br />
						<Link to="/" onClick={scrollToTop}>
							FAQ
						</Link>
						<br />
						<br />
						<Link to="/" onClick={scrollToTop}>
							Contact
						</Link>
						<br />
						<br />
						<Link to="/" onClick={scrollToTop}>
							Help
						</Link>
						<br />
						<br />
					</Grid>
					<Grid item xs={12} sm={6} md={3} className="footer-col">
						<h6 style={{ margin: "6px 6px 6px 0" }}>Products</h6>
						<br />
						<Link to="/" onClick={scrollToTop}>
							Parents
						</Link>
						<br />
						<br />
						<Link to="/" onClick={scrollToTop}>
							Schools
						</Link>
						<br />
						<br />
						<Link to="/" onClick={scrollToTop}>
							Partners
						</Link>
						<br />
						<br />
					</Grid>
					<Grid item xs={12} sm={6} md={3} className="footer-col">
						<h6 style={{ margin: "6px 6px 6px 0" }}>Legal</h6>
						<br />
						<Link to="/" onClick={scrollToTop}>
							Privacy Policy
						</Link>
						<br />
						<br />
						<Link to="/" onClick={scrollToTop}>
							Terms of Service
						</Link>
						<br />
						<br />
					</Grid>
					<Grid item xs={12} sm={6} md={3} className="footer-col">
						<h6 style={{ margin: "6px 6px 6px 0" }}>Office</h6>
						<br />
						<Link to="/" onClick={scrollToTop}>
							Victoria Garden City, Lagos 1234 Fruitvale Avenue, Oakland,
							California, USA.
						</Link>
						<br />
						<br />
					</Grid>
				</Grid>
			</footer>
		</div>
	);
}

export default Footer;
