import React from "react";
// MIUI Core
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import { ReactComponent as Font } from "../../../../static/icon/font.svg";

const FontSelect = ({ item, setSelectedFont }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (font) => {
		setSelectedFont(font);
		setAnchorEl(null);
	};
	return (
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
			<Popover
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
			>
				{item.menuItem.map((menu) => (
					<MenuItem
						key={menu.label}
						style={{ fontFamily: `${menu}, sans-serif` }}
						onClick={() => handleClose(menu)}
					>
						{menu}
					</MenuItem>
				))}
			</Popover>
		</div>
	);
};

export default FontSelect;
