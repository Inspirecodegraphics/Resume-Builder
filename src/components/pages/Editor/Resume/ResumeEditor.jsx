import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import "./ResumeEditor.css";
import { ReactComponent as Layout } from "../../../../static/icon/layout.svg";
import { ReactComponent as Theme } from "../../../../static/icon/theme.svg";
import { ReactComponent as Settings } from "../../../../static/icon/settings.svg";
import Dropdown from "../../../common/Dropdown";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FontSelect from "./FontSelect";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
const ResumeEditor = (props) => {
	const id = props.match.params.id;
	const [selectedFont, setSelectedFont] = useState("Ubuntu");
	const fonts = ["Merriweather", "Raleway", "Ubuntu", "Roboto"];
	useEffect(() => {});
	const user = {
		type: "User",
		label: "current user",
		className: "menu-appbar",
		icon: <AccountCircle />,

		menuItem: ["Merriweather", "Raleway", "Ubuntu", "Roboto"],
	};
	const useStyles = makeStyles((theme) => ({
		large: {
			width: theme.spacing(15),
			height: theme.spacing(15),
		},
	}));
	const classes = useStyles();

	return (
		<section
			style={{ fontFamily: `${selectedFont}, sans-serif` }}
			className="rb-editor"
		>
			<div className="container-fluid">
				<div className="rb-editor-container-fluid py-5">
					<div className="row d-flex justify-content-center">
						<div className="rb-editor-container">
							<p>Resume</p>
							<form noValidate autoComplete="off">
								<TextField value="Resume" id="standard-basic" />
							</form>
							<div className="rb-editor-page" id="editor">
								<div className="header pt-4 px-3">
									<div className="row">
										<div className="col-3 d-flex justify-content-end align-items-center">
											<Avatar
												alt="Ashwanee Kumar Gupta"
												src="https://avatars0.githubusercontent.com/u/52340682?s=400&u=f95785be36c03b5b0be65765d03176c60b18a632&v=4"
												className={classes.large}
											/>
										</div>
										<div className="col-9 text-dark">
											<h2 className="mb-1 font-weight-normal">
												ASHWANEE KUMAR GUPTA
											</h2>
											<h5>Web Developer & Graphic Designer</h5>
											<p>
												Lorem ipsum dolor sit amet consectetur adipisicing elit.
												Iure voluptates illum quae adipisci qui magni odio,
												minima dolores nisi, minus doloremque cum quo repellat
												dignissimos.
											</p>
										</div>
									</div>
								</div>
								<hr className="rb-divider" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-100 d-flex justify-content-center">
				<div className="row rb-editor-setting">
					<div className="col-3 p-2">
						{/* <p className="m-0">
							<Font></Font> Font
						</p>
						<Dropdown item={user}></Dropdown> */}
						<FontSelect
							setSelectedFont={setSelectedFont}
							item={user}
						></FontSelect>
					</div>
					<div className="col-3 p-2">
						<p className="m-0">
							<Theme></Theme> Theme
						</p>
					</div>
					<div className="col-3 p-2">
						<p className="m-0">
							<Layout></Layout> Layout
						</p>
					</div>
					<div className="col-3 p-2">
						<p className="m-0">
							<Settings></Settings> Settings
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ResumeEditor;
