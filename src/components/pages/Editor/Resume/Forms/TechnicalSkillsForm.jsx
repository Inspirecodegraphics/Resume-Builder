import React from "react";
import Joi from "joi-browser";
import _ from "lodash";
import "date-fns";
// Material UI Labs
import Rating from "@material-ui/lab/Rating";

// Material UI Core
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

// Material UI Icons
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import DoneIcon from "@material-ui/icons/Done";
import Form from "../../../../common/ExperienceFormBase";
import InputField from "../../../../common/InputField";
import { writeResume } from "../../../../../services/utils/db";

import { AuthContext } from "../../../../../Providers/AuthProvider";

class TechnicalSkillsForm extends Form {
	static contextType = AuthContext;

	state = {
		mainContent: {
			label: "TECHNICAL SKILLS",
			tech: [],
		},
		technology: [],
		searchQuery: "",
		errors: {},
		currentUser: {},
		notification: false,
	};
	async componentDidMount() {
		const { technology } = this.props;
		const { currentUser, currentResume } = this.context;
		let data = { ...this.state };
		if (currentResume.technicalSkills) {
			data.mainContent = this.generateDoc(currentResume.technicalSkills);
		}
		data.currentUser = currentUser;
		data.technology = technology;
		console.log(data);
		this.setState(data);
	}
	generateDoc(data) {
		return {
			label: data.label || "TECHNICAL SKILLS",
			tech: data.tech || [],
		};
	}

	schema = {
		searchQuery: Joi.string().allow("").label("Search"),
		label: Joi.string().label("Label"),
		tech: Joi.array(),
	};

	handleSubmit = () => (e) => {
		e.preventDefault();
		const errors = this.validate("label");
		this.setState({ errors: errors || {} });
		if (errors) {
			console.log(errors);
			return;
		}
		this.doSubmit();
	};
	doSubmit = async (type) => {
		const { mainContent, currentUser } = this.state;
		writeResume(
			{
				technicalSkills: mainContent,
			},
			currentUser.uid,
			currentUser.resumeId
		)
			.then((data) => {
				this.setState({ notification: true });
			})
			.catch((err) => {
				console.log(err);
			});
	};
	handleRatingChange = (value, label, type) => {
		const mainContent = { ...this.state.mainContent };
		let target = mainContent[type].find((e) => e.label === label);
		target.value = value;
		this.setState({ mainContent });
	};

	handleNotificationClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		this.setState({ notification: false });
	};
	handleSearch = (query) => {
		this.setState({ searchQuery: query });
	};
	handleAddChip = (tech) => {
		let mainContent = { ...this.state.mainContent };
		if (mainContent.tech.find((t) => t.label === tech.label)) {
			console.log("Already Added");
			return;
		}
		tech.value = 5;
		mainContent.tech.push(tech);
		this.setState({ mainContent, searchQuery: "" });
	};
	handleDeleteChip = (tech) => {
		let mainContent = { ...this.state.mainContent };
		mainContent.tech = mainContent.tech.filter(
			(chip) => chip.label !== tech.label
		);

		this.setState({ mainContent });
	};
	getPageData = () => {
		const { technology: allTech, searchQuery } = this.state;
		let filtered = [];
		if (searchQuery)
			filtered = allTech.filter((t) =>
				t.label.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		const finalTech = _.orderBy(filtered, "label", "asc");
		return { totalCount: filtered.length, finalTech };
	};

	render() {
		const { notification } = this.state;

		return (
			<div>
				{this.skills()}
				<Snackbar
					className="bg-suscess"
					severity="success"
					anchorOrigin={{ vertical: "top", horizontal: "right" }}
					open={notification}
					onClose={this.handleNotificationClose}
					action={
						<IconButton
							size="small"
							aria-label="close"
							color="inherit"
							onClick={this.handleNotificationClose}
						>
							<CloseIcon fontSize="small" />
						</IconButton>
					}
					message={
						<span>
							<CheckIcon classmane="p-2 m-2"></CheckIcon>
							Content Saved suscessfully
						</span>
					}
					autoHideDuration={5000}
				></Snackbar>
			</div>
		);
	}

	skills() {
		const { mainContent, errors } = this.state;
		const { totalCount, finalTech } = this.getPageData();
		return (
			<form onSubmit={this.handleSubmit()}>
				<div className="row mb-2">
					<div className="col-md-12 my-2">
						<InputField
							handleChange={this.handleChange("label")}
							error={errors.label}
							value={mainContent.label}
							type="text"
							placeholder="Label"
							name="label"
							label="Label"
							icon={<i className="fas fa-tags text-muted" />}
						></InputField>
					</div>
					{mainContent.tech.length > 0 && (
						<div className="col">
							<div className="row">
								<div className="col-md-5">
									<p className="mb-0">Technical Skill</p>
								</div>
								<div className="col-md-7">
									<p className="mb-0">Proficiency</p>
								</div>
							</div>
						</div>
					)}
					<div style={{ maxHeight: "200px", overflow: "auto" }}>
						{mainContent.tech.map((tech, index) => (
							<div className="row" key={index}>
								<div className="col-md-5">
									<Chip
										key={tech.label}
										label={tech.label}
										color="secondary"
										variant="outlined"
										icon={
											<div className="ms-2">
												<i
													style={{ fontSize: "initial" }}
													className={tech.icon}
												></i>
											</div>
										}
										onDelete={() => this.handleDeleteChip(tech)}
										className="m-1"
									/>
								</div>
								<div className="col-md-7 my-2 d-flex align-items-center">
									<Rating
										id={`value${tech.label}`}
										name={`value${tech.label}`}
										value={tech.value}
										precision={1}
										onChange={(event, value) => {
											this.handleRatingChange(value, tech.label, "tech");
										}}
										icon={
											<i
												class="fas fa-square px-1"
												style={{ fontSize: "smaller" }}
											></i>
										}
										max={10}
									/>
								</div>
							</div>
						))}
					</div>

					<div className="col-md-12 my-2">
						<TextField
							error={errors.searchQuery}
							placeholder="Search"
							id="searchQuery"
							label="Search Technology"
							type="text"
							fullWidth
							autoFocus
							name="searchQuery"
							value={this.state.searchQuery}
							onChange={(e) => this.handleSearch(e.currentTarget.value)}
							variant="standard"
							color="primary"
							helperText={errors.searchQuery}
						></TextField>
					</div>
					{totalCount > 0 && (
						<div className="col-md-12 my-2">
							{finalTech.map((tech, index) => (
								<Chip
									key={tech.label + index}
									label={tech.label}
									color="secondary"
									icon={
										<div className="ms-2">
											<i
												style={{ fontSize: "initial" }}
												className={tech.icon}
											></i>
										</div>
									}
									variant="outlined"
									onDelete={() => this.handleAddChip(tech)}
									deleteIcon={<DoneIcon />}
									className="m-1"
								/>
							))}
						</div>
					)}
				</div>
				<DialogActions>
					<Button onClick={this.props.handleClose} color="primary">
						Close
					</Button>
					<Button type="submit" color="primary">
						Save
					</Button>
				</DialogActions>
			</form>
		);
	}
}

export default TechnicalSkillsForm;
