import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./Landing.css";
import { useAuth } from "../../../Providers/AuthProvider";
import { ReactComponent as LiveFeedback } from "../../../static/icon/live_feedback.svg";
import { ReactComponent as Templates } from "../../../static/icon/templates.svg";
import { ReactComponent as LivePreview } from "../../../static/icon/live_preview.svg";
import { ReactComponent as Layers } from "../../../static/icon/layers.svg";
import { ReactComponent as Cv } from "../../../static/icon/cv.svg";
import { ReactComponent as Translate } from "../../../static/icon/translate.svg";
import { ReactComponent as Design } from "../../../static/icon/design-thinking.svg";
import { ReactComponent as Savings } from "../../../static/icon/savings.svg";
import { ReactComponent as Sync } from "../../../static/icon/synchronization.svg";
import { ReactComponent as NoCost } from "../../../static/icon/no_cost.svg";
import { ReactComponent as Protection } from "../../../static/icon/protection.svg";

const Benefits = () => {
	const [currentdata, setCurrentData] = useState(0);
	const benefit = [
		{
			title: "A Resume Layout That Stands Out",
			desc: "A creative, professional layout can grab a recruiter's attention. Our resume layout optimizer makes sure all your content is aligned and organized so your resume looks like a work of art.",
			icon: <Cv></Cv>,
		},
		{
			title: "Live Feedback to Improve Your Content",
			desc: "A creative, professional layout can grab a recruiter's attention. Our resume layout optimizer makes sure all your content is aligned and organized so your resume looks like a work of art.",
			icon: <LiveFeedback></LiveFeedback>,
		},
		{
			title: "Templates Suited to Your Exact Needs",
			desc: "A creative, professional layout can grab a recruiter's attention. Our resume layout optimizer makes sure all your content is aligned and organized so your resume looks like a work of art.",
			icon: <Templates></Templates>,
		},
		{
			title: "Free Cover Letter and Resume Samples",
			desc: "A creative, professional layout can grab a recruiter's attention. Our resume layout optimizer makes sure all your content is aligned and organized so your resume looks like a work of art.",
			icon: <Layers></Layers>,
		},
	];
	const benifitMore = [
		{
			title: "Beautiful Resume Templates. At no Cost",
			desc: "Use the Basic/Free account to create a modern resume.",
			icon: <NoCost></NoCost>,
		},
		{
			title: "Design and Functionality",
			desc: "Easily change or add design elements to your resume, including colors and fonts, to give it a creative edge.",
			icon: <Design></Design>,
		},
		{
			title: "Online Access and Synchronization",
			desc: "Your resume is saved in your online account for you to access and update anytime, from anywhere.",
			icon: <Sync></Sync>,
		},
		{
			title: "Save Time and Money",
			desc: "When you use the free resume maker, you save yourself the trouble of creating a resume from scratch.",
			icon: <Savings></Savings>,
		},
		{
			title: "Data Protection",
			desc: "All of your personal information and saved resumes are protected with high online security measures.",
			icon: <Protection></Protection>,
		},
		{
			title: "Multiple Languages",
			desc: "All fields are editable so you can write your information in any language.",
			icon: <Translate></Translate>,
		},
		{
			title: "Live View Mode",
			desc: "You can see how your complete resume looks as you fill in the content sections, giving you the full picture all the time.",
			icon: <LivePreview></LivePreview>,
		},
	];

	const handleChange = (index) => {
		setCurrentData(index);
	};
	function scrollToTop() {
		window.scrollTo(0, 0);
	}
	return (
		<div className="container-fluid pt-3 px-md-5 benifits">
			<div className="row">
				<div className="col">
					<h3 className="p-2 text-left py-3">
						<b> Benefits of using an Inspire Resume Builder</b>
					</h3>
				</div>
			</div>
			<div className="row d-flex align-items-stretch">
				{benefit.map((data, index) => (
					<div key={index} className="mb-4 col-md-6">
						<div className="card card-body text-left hover h-100">
							<div style={{ width: "50px" }} className="icon">
								{data.icon}
							</div>
							<h4 className="font-weight-bold spacing m-2 ms-0">
								<b>{data.title}</b>
							</h4>
							<div className="row">
								<div className="col-2 ps-0 pe-2 px-sm-3">
									<hr
										className="m-auto my-1"
										style={{ height: "3px", opacity: 1, borderRadius: "50px" }}
									/>
								</div>
								<div className="col-10 ps-0">
									<p className="font-small service-title">{data.desc}</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="row justify-content-center">
				<p className="ps-5">
					<b>and many more...</b>
				</p>
				{benifitMore.map((data, index) => (
					<div
						className={`circle ${index === currentdata ? "selected" : ""}`}
						key={index}
						onClick={() => handleChange(index)}
					>
						<div style={{ width: "45px" }}>{data.icon}</div>
					</div>
				))}
			</div>
			<div className="row">
				<div className="benefit-more">
					{benifitMore.map((data, index) => (
						<div
							key={index}
							className={`row benefit-more-box ${
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
			<div className="row justify-content-center">
				<div className="col-lg-1 col-md-3 col-4 px-0">
					<hr
						className="m-auto my-3"
						style={{ height: "4px", opacity: 1, borderRadius: "50px" }}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col text-center">
					<Button variant="outlined" className="mb-2">
						<Link
							onClick={scrollToTop}
							className="text-dark px-2"
							to="/resume-templates"
						>
							Start for free today
						</Link>
					</Button>
				</div>
			</div>

			<hr className="my-3" style={{ height: "2px" }} />
		</div>
	);
};

export default Benefits;
