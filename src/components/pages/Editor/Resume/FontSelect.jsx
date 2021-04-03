import React from "react";
// MIUI Core
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import { ReactComponent as Font } from "../../../../static/icon/font.svg";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const FontSelect = ({ item, setSelectedFont }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleMenu = (event) => {
		if (anchorEl) {
			setAnchorEl(null);
		} else {
			setAnchorEl(event.currentTarget);
		}
	};

	const handleClose = (font) => {
		setSelectedFont(font);
		setAnchorEl(null);
	};
	const handleClickAway = () => {
		setAnchorEl(null);
	};
	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<div>
				<Tooltip placement="bottom" title="Font" arrow>
					<div
						aria-label="Select multiple font"
						aria-controls="font-select"
						aria-haspopup="true"
						onClick={handleMenu}
						color="inherit"
					>
						<p className="m-0">
							<Font></Font>
							Font
						</p>
					</div>
				</Tooltip>
				<Popper
					id="font-select"
					keepMounted
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
					open={open}
					onClose={handleClose}
					className="mt-3"
					transition
				>
					{({ TransitionProps }) => (
						<Fade {...TransitionProps} timeout={350}>
							<Paper elevation={3}>
								{item.map((menu) => (
									<MenuItem
										key={menu.label}
										style={{ fontFamily: `${menu}, sans-serif` }}
										onClick={() => handleClose(menu)}
									>
										{menu}
									</MenuItem>
								))}
							</Paper>
						</Fade>
					)}
				</Popper>
			</div>
		</ClickAwayListener>
	);
};

export default FontSelect;
