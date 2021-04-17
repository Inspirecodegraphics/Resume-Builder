import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Material UI Core
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

// SVG Icons
import { ReactComponent as Layout } from "../../../../static/icon/layout.svg";
import { ReactComponent as Theme } from "../../../../static/icon/theme.svg";
import { ReactComponent as Settings } from "../../../../static/icon/settings.svg";

import FontSelect from "./FontSelect";
import Header from "./Header";
import "./ResumeEditor.css";

import { useAuth } from "../../../../Providers/AuthProvider";

const ResumeEditor = (props) => {
	const id = props.match.params.id;
	const [selectedFont, setSelectedFont] = useState("Roboto");
	const fonts = ["Merriweather", "Raleway", "Ubuntu", "Roboto", "Kiwi Maru"];
	const [resume, setResume] = useState({});
	const { currentUser, currentResume } = useAuth();

	useEffect(() => {
		// async function fetchResume() {
		// 	console.log("Firebase Called");
		// 	try {
		// 		db.doc(`users/${currentUser.uid}/resumes/${"1"}`).onSnapshot((doc) => {
		// 			console.log("Current data: ", doc.data());
		// 			setResume(doc.data());
		// 		});
		// 	} catch (error) {
		// 		console.error("Error fetching Document", error);
		// 	}
		// 	// const resume = await getResumes();
		// 	// console.log(resume);
		// 	// setResume(resume);
		// }
		// fetchResume();
	}, []);

	return (
		<section className="rb-editor">
			<div className="container-fluid">
				<div className="rb-editor-container-fluid py-5">
					<div
						style={{ fontFamily: `${selectedFont}, sans-serif` }}
						className="row d-flex justify-content-center"
					>
						<div className="rb-editor-container">
							<p>Resume</p>
							<form noValidate autoComplete="off">
								<TextField value="Resume" id="standard-basic" />
							</form>
							<Header></Header>
							{/* <h1>{currentResume && currentResume.mainContent.email}</h1> */}
						</div>
					</div>
				</div>
			</div>

			<div className="w-100 d-flex justify-content-center">
				<div className="row rb-editor-setting">
					<div className="col-3 p-2">
						<FontSelect
							setSelectedFont={setSelectedFont}
							item={fonts}
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
