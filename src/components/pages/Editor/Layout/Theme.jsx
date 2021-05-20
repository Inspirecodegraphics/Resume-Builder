import React from "react";
import { ReactComponent as ThemeIcon } from "../../../../static/icon/theme.svg";
// MIUI Core
import Tooltip from "@material-ui/core/Tooltip";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

// MIUI Icon
import StarIcon from "@material-ui/icons/Star";
import "./Theme.css";
const useStyles = makeStyles((theme) => ({
	top: {
		animationDuration: "550ms",
		position: "absolute",
		transform: "rotate(-80deg)!Important",
		// left: 0,
	},
	circle: {
		strokeLinecap: "round",
	},
}));
const Theme = () => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedTheme, setSelectedTheme] = React.useState(5);
	const open = Boolean(anchorEl);

	const handleClose = (font) => {
		// setSelectedFont(font);
		setAnchorEl(null);
	};
	const ColorTheme = [
		{
			id: 1,
			primary: "#ce293d",
			secondary: "#f7964d",
		},
		{
			id: 2,
			primary: "#313c4e",
			secondary: "#449399",
		},
		{
			id: 3,
			primary: "#ce293d",
			secondary: "#f7964d",
		},
		{
			id: 4,
			primary: "#313c4e",
			secondary: "#449399",
		},
		{
			id: 5,
			primary: "#ce293d",
			secondary: "#f7964d",
		},
		{
			id: 6,
			primary: "#313c4e",
			secondary: "#449399",
		},
	];
	const handleClickAway = () => {
		setAnchorEl(null);
	};
	const handleThemeSelect = (id) => {
		setSelectedTheme(id);
	};
	const handleMenu = (event) => {
		if (anchorEl) {
			setAnchorEl(null);
		} else {
			setAnchorEl(event.currentTarget);
		}
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<div>
				<Tooltip placement="bottom" title="Theme" arrow>
					<div
						aria-label="Select multiple theme"
						aria-controls="theme-select"
						aria-haspopup="true"
						onClick={handleMenu}
						color="inherit"
					>
						<p className="m-0">
							<ThemeIcon className="svg"></ThemeIcon>
							Theme
						</p>
					</div>
				</Tooltip>
				<Popper
					id="theme-select"
					disablePortal
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					className="mt-3"
					transition
				>
					{({ TransitionProps }) => (
						<Fade {...TransitionProps} timeout={350}>
							<Paper elevation={3} className="theme-outer">
								<div className="h-100 p-2">
									<div className="row m-0">
										<div className="col-6 px-0 colors">
											<div className="row mx-0">
												{ColorTheme.map((theme) => (
													<div key={theme.id} className="col-3 px-0 circular">
														<Box
															position="relative"
															display="inline-flex"
															className="circular-outline-outer"
															onClick={() => handleThemeSelect(theme.id)}
														>
															{selectedTheme !== theme.id && (
																<div className="circular-outline"> </div>
															)}
															{selectedTheme === theme.id && (
																<div className="circular-outline-selected"></div>
															)}

															<CircularProgress
																variant="determinate"
																value={100}
																size={38}
																thickness={8}
																style={{ color: theme.primary }}
															/>
															<CircularProgress
																variant="determinate"
																value={44}
																size={38}
																classes={{
																	circle: classes.circle,
																}}
																style={{ color: theme.secondary }}
																thickness={8}
																className={classes.top}
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
																<StarIcon
																	className="text-danger"
																	style={{ fontSize: "17px" }}
																></StarIcon>
																{/* <i
																	className={" g-pointer technicalSkills"}
																	style={{ fontSize: "25px" }}
																></i> */}
															</Box>
														</Box>
													</div>
												))}
											</div>
										</div>
										<div className="col-6 px-0 background"></div>
									</div>
								</div>
							</Paper>
						</Fade>
					)}
				</Popper>
			</div>
		</ClickAwayListener>
	);
};

export default Theme;
