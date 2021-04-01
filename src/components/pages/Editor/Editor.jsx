import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import getResume from "./../../../services/resumeService";

const Editor = () => {
	const [EditorType, setEditorType] = useState("resume");
	const history = useHistory();
	const handleEditorClick = () => {
		const resume = getResume();
		history.push(`/editor/resume/${resume[0].id}`);
	};
	return (
		<section className="container">
			<div className="row justify-content-center py-4">
				<div className="col-10 col-md-4 box beta-content"></div>
				<div
					className="col-10 col-md-4 box resume-content"
					onClick={handleEditorClick}
				></div>
			</div>
		</section>
	);
};

export default Editor;
