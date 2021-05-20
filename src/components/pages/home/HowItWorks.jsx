import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { ReactComponent as Flash } from "../../../static/icon/flash.svg";
import { ReactComponent as Layout } from "../../../static/icon/layout2.svg";
import { ReactComponent as Develop } from "../../../static/icon/develop.svg";
import { ReactComponent as ExportPdf } from "../../../static/icon/export_pdf.svg";
const HowItWorks = () => {
	const [currentdata, setCurrentData] = useState(0);
	function scrollToTop() {
		window.scrollTo(0, 0);
	}
	const work = [
		{
			title: "Register in a Flash",
			desc: "It only takes a couple of seconds to start using our online resume builder. The resume creator is offered completely through our website, meaning there is no software to download.",
			icon: <Flash></Flash>,
		},
		{
			title: "Choose a resume Layout",
			desc: "You get to choose between several design options with our selection of free resume templates. This helps you match your resume to the type of company and position you want.",
			icon: <Layout></Layout>,
		},
		{
			title: "Develop and Optimize Your Content",
			desc: "Each resume template is organized into major content sections that you fill in while optimization tools guide you through the process. And adding or removing a specific section based on your needs is no problem and you get layout and content suggestions so that your resume looks perfect.",
			icon: <Develop></Develop>,
		},
		{
			title: "Export and Send",
			desc: "Once your content is finished, you can export your resume in PDF from the free resume builder. Your latest version is saved and you can always go back to make edits.",
			icon: <ExportPdf></ExportPdf>,
		},
	];
	const handleChange = (index) => {
		setCurrentData(index);
	};
	return (
		<div className="container-fluid py-3 px-md-5 working">
			<div className="row">
				<div className="col">
					<h3 className="p-2 text-left py-3">
						<b> How it works</b>
					</h3>
				</div>
			</div>
			<div className="row">
				<div className="col d-flex justify-content-center icon">
					<div style={{ width: "125px" }}>{work[currentdata].icon}</div>
				</div>
			</div>
			<div className="row">
				<div className="working-more">
					{work.map((data, index) => (
						<div
							key={index}
							className={`row working-more-box ${
								index === currentdata ? "selected" : ""
							}`}
						>
							<h4 className="font-weight-bold mt-4 mb-3">
								<b>{data.title}</b>
							</h4>
							<p className="font-small text-center">{data.desc}</p>
						</div>
					))}
				</div>
			</div>
			<div className="row justify-content-center py-3">
				{work.map((data, index) => (
					<div
						className={`circle ${index === currentdata ? "selected" : ""}`}
						key={index}
						onClick={() => handleChange(index)}
					>
						<h4>{index + 1}</h4>
					</div>
				))}
			</div>
			<div className="row">
				<div className="col py-5 text-center">
					<Button variant="outlined" className="mb-2">
						<Link
							onClick={scrollToTop}
							className="text-dark px-2"
							to="/resume-templates"
						>
							Create My Resume
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default HowItWorks;
