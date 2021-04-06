import React from "react";
import { Link } from "react-router-dom";

// MIUI Core
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";

// MIUI Icons
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: "32ch",
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: "inline",
	},
}));

const Dropdown = ({ setLoginModalOpen, item }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
		setLoginModalOpen(true);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const classes = useStyles();
	return (
		<div>
			<Tooltip placement="bottom" title={item.type} arrow>
				<IconButton
					aria-label={item.label}
					aria-controls={item.className}
					aria-haspopup="true"
					onClick={handleMenu}
					color="inherit"
				>
					{item.icon}
				</IconButton>
			</Tooltip>
			<Popover
				id={item.className}
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
			>
				{item.type === "User" &&
					item.menuItem.map((menu) => (
						<MenuItem
							key={menu.label}
							component={Link}
							to={menu.link}
							onClick={handleClose}
						>
							{menu.label}
						</MenuItem>
					))}
				{item.type === "Notification" && (
					<Paper>
						<List className={classes.root}>
							{item.menuItem.map((menu) => (
								<>
									<ListItem alignItems="flex-start">
										<ListItemAvatar>
											<Avatar alt="Ashwanee Kumar Gupta" src={menu.link} />
										</ListItemAvatar>
										<ListItemText
											secondary={
												<React.Fragment>
													<Typography
														component="span"
														variant="body2"
														className={classes.inline}
														color="textPrimary"
													>
														{menu.renderText()}
													</Typography>
												</React.Fragment>
											}
										/>
									</ListItem>
									{<Divider component="li" />}
								</>
							))}
						</List>
					</Paper>
				)}
			</Popover>
		</div>
	);
};

export default Dropdown;
