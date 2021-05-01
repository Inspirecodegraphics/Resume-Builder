import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// Material UI Core
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

// SVG Icons
import { ReactComponent as Layout } from "../../../../static/icon/layout.svg";
import { ReactComponent as Theme } from "../../../../static/icon/theme.svg";
import { ReactComponent as Settings } from "../../../../static/icon/settings.svg";
import { ReactComponent as Background1 } from "../../../../static/background/background1.svg";
import FontSelect from "./FontSelect";

import { useAuth } from "../../../../Providers/AuthProvider";

import Layout1 from "../Style/Layout1";
import "./ResumeEditor.css";
import Layout2 from "./../Style/Layout2";
import AccountDailog from "./AccountSettingDialog";
import { AccountSetting } from "./../../../../Context/AccountSettingContext";
import { getTechnologies } from "../../../../services/utils/db";

const ResumeEditor = (props) => {
	const id = props.match.params.id;
	const [selectedFont, setSelectedFont] = useState("Roboto");
	const fonts = ["Merriweather", "Raleway", "Ubuntu", "Roboto", "Kiwi Maru"];
	const [tech, setTech] = useState([]);
	const { currentUser, currentResume } = useAuth();

	useEffect(() => {
		async function getTech() {
			const technology = await getTechnologies();
			setTech(technology.tech);
		}
		getTech();
	}, []);

	return (
		<AccountSetting.Provider
		// value={{ dailogOpen, setDailogOpen, index, setIndex }}
		>
			<section className="rb-editor ice-theme">
				<div className="container-fluid">
					<div className="rb-editor-container-fluid py-5">
						<div
							style={{ fontFamily: `${selectedFont}, sans-serif` }}
							className="row d-flex justify-content-center"
						>
							<div className="rb-editor-container">
								<form noValidate autoComplete="off">
									<TextField value="Resume" id="standard-basic" />
								</form>
								<div className="rb-editor-page text-dark" id="editor">
									{/* <Layout1></Layout1> */}
									<Layout2></Layout2>
								</div>
								{/* <MultipleSelect></MultipleSelect> */}
							</div>
						</div>
					</div>
				</div>
				<AccountDailog technology={tech}></AccountDailog>
				{/* <div className="w-100 d-flex justify-content-center">
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
			</div> */}
			</section>
		</AccountSetting.Provider>
	);
};

export default ResumeEditor;
