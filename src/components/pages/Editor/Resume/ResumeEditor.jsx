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
import { getUser } from "../../../../services/resumeService";
import "./ResumeEditor.css";

const ResumeEditor = (props) => {
	const id = props.match.params.id;
	const [selectedFont, setSelectedFont] = useState("Roboto");
	const [user, setUser] = useState(null);
	const fonts = ["Merriweather", "Raleway", "Ubuntu", "Roboto", "Kiwi Maru"];

	useEffect(() => {
		const user = getUser();
		setUser(user);
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
							<Header user={user}></Header>
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
