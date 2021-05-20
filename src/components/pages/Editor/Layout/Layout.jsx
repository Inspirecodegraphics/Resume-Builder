import React, { useState, useEffect } from "react";
// MIUI Core
import Tooltip from "@material-ui/core/Tooltip";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { ReactComponent as LayoutIcon } from "../../../../static/icon/layout.svg";
import "./Layout.css";
const Layout = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [photo, setPhoto] = useState(true);
	const [direction, setDirection] = useState(true);
	const [data, setData] = useState([
		{
			left: [
				{
					icon: "fas fa-address-book",
					label: "CONTACT",
					required: true,
				},
				{
					icon: "fas fa-comment-dots",
					label: "LANGUAGES",
				},
				{
					icon: "fas fa-cogs",
					label: "TECHNICAL SKILLS",
				},
				{
					icon: "fas fa-pen-nib",
					label: "SKILLS",
				},
				{
					icon: "fas fa-heart",
					label: "INTEREST & HOBBIES",
				},
			],
			right: [
				{
					icon: "fas fa-address-book",
					label: "DESCRIPTION",
					required: true,
				},
				{
					icon: "fas fa-user",
					label: "ABOUT ME",
				},
				{
					icon: "fas fa-briefcase",
					label: "EXPERIENCE",
				},
				{
					icon: "fas fa-graduation-cap",
					label: "EDUCATION",
					required: true,
				},
				{
					icon: "fas fa-file-alt",
					label: "PROJECTS",
				},
				{
					icon: "fas fa-award",
					label: "AWARD",
				},
			],
			selected: true,
		},
		{
			left: [
				{
					icon: "fas fa-address-book",
					label: "Contact",
				},
				{
					icon: "fas fa-comment-dots",
					label: "Languages",
				},
				{
					icon: "fas fa-cogs",
					label: "TECHNICAL SKILLS",
				},
			],
			right: [
				{
					icon: "fas fa-address-book",
					label: "Contact",
				},
				{
					icon: "fas fa-comment-dots",
					label: "Languages",
				},
				{
					icon: "fas fa-cogs",
					label: "TECHNICAL SKILLS",
				},
			],
		},
		{
			left: [
				{
					icon: "fas fa-address-book",
					label: "Contact",
				},
				{
					icon: "fas fa-comment-dots",
					label: "Languages",
				},
				{
					icon: "fas fa-cogs",
					label: "TECHNICAL SKILLS",
				},
			],
			right: [
				{
					icon: "fas fa-address-book",
					label: "Contact",
				},
				{
					icon: "fas fa-comment-dots",
					label: "Languages",
				},
				{
					icon: "fas fa-cogs",
					label: "TECHNICAL SKILLS",
				},
			],
		},
	]);

	const open = Boolean(anchorEl);
	const handleMenu = (event) => {
		if (anchorEl) {
			setAnchorEl(null);
		} else {
			setAnchorEl(document.querySelector(".rb-editor-setting"));
		}
	};
	const handleClickAway = () => {
		setAnchorEl(null);
	};
	const handleClose = (font) => {
		// setSelectedFont(font);
		setAnchorEl(null);
	};
	const handleBlockClick = (layoutIndex, side, label) => {
		const current = data[layoutIndex][side].map((block) => {
			if (block.label === label) {
				block.deselect = block.deselect ? false : true;
			}
			return block;
		});
		const thisData = [...data];
		thisData[layoutIndex][side] = current;
		setData(thisData);
	};
	const calculateHeight = (layoutIndex, side) => {
		return `${100 / data[layoutIndex][side].length}%`;
	};
	const handlePickMe = (layoutIndex) => {
		const layout = data.map((layout, index) => {
			if (layoutIndex === index) {
				layout.selected = true;
			} else {
				layout.selected = false;
			}
			return layout;
		});
		setData(layout);
	};

	const handleDirectionChange = (event) => {
		setDirection(event.target.checked);
	};
	const handlePhotoChange = (event) => {
		setPhoto(event.target.checked);
	};
	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<div>
				<Tooltip placement="bottom" title="Layout" arrow>
					<div
						aria-label="Select multiple layout"
						aria-controls="layout-select"
						aria-haspopup="true"
						onClick={handleMenu}
						color="inherit"
					>
						<p className="m-0">
							<LayoutIcon className="svg"></LayoutIcon>
							Layout
						</p>
					</div>
				</Tooltip>
				<Popper
					id="layout-select"
					disablePortal
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					className="mt-1"
					transition
				>
					{({ TransitionProps }) => (
						<Fade {...TransitionProps} timeout={350}>
							<Paper elevation={3} className="layout-outer">
								<div className="h-100 p-4">
									<div className="row m-0">
										<div className="col-5">
											<Typography component="div">
												<Grid
													component="label"
													container
													alignItems="center"
													spacing={1}
												>
													<Grid className="g-pointer" item>
														LTR
													</Grid>
													<Grid item>
														<Switch
															checked={direction}
															onChange={handleDirectionChange}
															name="direction"
															color="default"
															className="mx-2"
														/>
													</Grid>
													<Grid className="g-pointer" item>
														RTL
													</Grid>
												</Grid>
											</Typography>
										</div>
										<div className="col-7 text-end">
											<FormControlLabel
												control={
													<Checkbox
														checked={photo}
														onChange={handlePhotoChange}
														name="photo"
														color="default"
													/>
												}
												label="Photo"
											/>
										</div>
									</div>
									<div className="row layout-row">
										{data.map((layout, layoutIndex) => (
											<div key={layoutIndex} className="col-4 layout-col">
												{!layout.selected && (
													<div className="layout-hover">
														<Button
															color="secondary"
															variant="contained"
															className="bg-warning test-white"
															onClick={() => handlePickMe(layoutIndex)}
														>
															Pick Me
														</Button>
													</div>
												)}
												<div className="layout-inner-page">
													<div className="row h-100 page-row">
														{["left", "right"].map((side) => (
															<div key={side} className="col-6 p-0 block-outer">
																{layout[side].map((block, index) => (
																	<div
																		key={index}
																		className={`${
																			!block.required ? "g-pointer " : ""
																		}block`}
																		style={{
																			height: calculateHeight(
																				layoutIndex,
																				side
																			),
																		}}
																	>
																		{!block.required && (
																			<div
																				className={`block-hover ${
																					block.deselect
																						? "deselected-block"
																						: ""
																				}`}
																				onClick={() =>
																					handleBlockClick(
																						layoutIndex,
																						side,
																						block.label
																					)
																				}
																			>
																				<i
																					className={`${
																						block.deselect
																							? "fas fa-plus"
																							: "fas fa-trash-alt"
																					}`}
																				></i>
																			</div>
																		)}
																		<div
																			className={`block-inner ${
																				block.deselect ? "deselected-block" : ""
																			}`}
																		>
																			<p>
																				<i className={block.icon}></i>{" "}
																				{block.label}{" "}
																				{block.required && <sup>*</sup>}
																			</p>
																		</div>
																	</div>
																))}
															</div>
														))}
													</div>
												</div>
												{layout.selected && <hr />}
											</div>
										))}
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

export default Layout;
