import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ResumeEditor.css";
const ResumeEditor = (props) => {
	const id = props.match.params.id;
	const [selectedFont, setSelectedFont] = useState("Merriweather");
	const fonts = ["Merriweather", "Raleway", "Ubuntu", "Roboto"];
	useEffect(() => {});
	return (
		<section
			style={{ fontFamily: `${selectedFont}, sans-serif` }}
			className="rb-editor"
		>
			<div className="container-fluid">
				<div className="rb-editor-container py-5">
					<div className="row d-flex justify-content-center">
						<div className="rb-editor-page"></div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ResumeEditor;
