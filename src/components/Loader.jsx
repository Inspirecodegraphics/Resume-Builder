import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import icon from "../static/logo.png";
import { makeStyles } from "@material-ui/core/styles";
import "./Loader.css";
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		height: "100vh",
		alignItems: "center",
		justifyContent: "center",
		"& > * + *": {
			marginLeft: theme.spacing(2),
		},
	},
	img: {
		width: "45px",
	},
	progress: {
		color: "#a95478",
	},
	circle: {
		strokeLinecap: "round",
	},
}));
const Loader = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Box position="relative" display="inline-flex" className="p-1">
				<CircularProgress
					size={75}
					thickness={2.3}
					className={classes.progress}
					classes={{
						circle: classes.circle,
					}}
				/>
				<Box
					top={0}
					left={0}
					bottom={0}
					right={0}
					position="absolute"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<i className="pulse">
						<img src={icon} className={classes.img} alt="" />
					</i>
				</Box>
			</Box>
		</div>
	);
};

export default Loader;
