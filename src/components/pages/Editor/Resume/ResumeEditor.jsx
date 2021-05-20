import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// Material UI Core
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

// SVG Icons
import { ReactComponent as Background1 } from "../../../../static/background/background1.svg";
import FontSelect from "./FontSelect";

import { useAuth } from "../../../../Providers/AuthProvider";

import Layout1 from "../Style/Layout1";
import "./ResumeEditor.css";
import Layout2 from "./../Style/Layout2";
import AccountDailog from "./AccountSettingDialog";
import { AccountSetting } from "./../../../../Context/AccountSettingContext";
import { getTechnologies } from "../../../../services/utils/db";
import Settings from "./../Layout/Settings";
import MainMenu from "../Layout/MainMenu";
// import Layout from "./../Layout/Layout";

const ResumeEditor = (props) => {
	const id = props.match.params.id;
	const [selectedFont, setSelectedFont] = useState("Roboto");
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
			<section className="rb-editor ">
				<MainMenu setSelectedFont={setSelectedFont}></MainMenu>

				<div className="container-fluid">
					<div className="rb-editor-container-fluid py-5">
						<div
							style={{ fontFamily: `${selectedFont}, sans-serif` }}
							className="row d-flex justify-content-center"
						>
							<div className="rb-editor-container">
								{/* <form noValidate autoComplete="off">
									<TextField value="Resume" id="standard-basic" />
								</form> */}
								<div className="rb-editor-page text-dark" id="editor">
									{/* <Layout1></Layout1> */}
									<Layout2></Layout2>
								</div>
							</div>
						</div>
					</div>
				</div>
				<AccountDailog technology={tech}></AccountDailog>
			</section>
		</AccountSetting.Provider>
	);
};

export default ResumeEditor;
