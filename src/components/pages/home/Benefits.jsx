import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./Landing.css";
import { useAuth } from "../../../Providers/AuthProvider";
import { ReactComponent as Layout } from "../../../static/icon/web-design.svg";

const Benefits = () => {
	const { currentUser } = useAuth();

	const benefit = [
		{
			title: "A Resume Layout That Stands Out",
			desc:
				"A creative, professional layout can grab a recruiter's attention. Our resume layout optimizer makes sure all your content is aligned and organized so your resume looks like a work of art.",
			icon: <Layout></Layout>,
		},
		{
			title: "Live Feedback to Improve Your Content",
			desc:
				"A creative, professional layout can grab a recruiter's attention. Our resume layout optimizer makes sure all your content is aligned and organized so your resume looks like a work of art.",
			icon: "",
		},
		{
			title: "Templates Suited to Your Exact Needs",
			desc:
				"A creative, professional layout can grab a recruiter's attention. Our resume layout optimizer makes sure all your content is aligned and organized so your resume looks like a work of art.",
			icon: "",
		},
		{
			title: "Free Cover Letter and Resume Samples",
			desc:
				"A creative, professional layout can grab a recruiter's attention. Our resume layout optimizer makes sure all your content is aligned and organized so your resume looks like a work of art.",
			icon: "",
		},
	];
	return (
		<div className="container-fluid pt-3 px-md-5">
			<div className="row">
				<div className="col">
					<h4 className="p-2 text-left">
						Benefits of using an Inspire Resume Builder
					</h4>
				</div>
			</div>
			<div className="row">
				{benefit.map((data, index) => (
					<div key={index} className="mb-4 col-md-6">
						<div className="card card-body text-left hoverable">
							<div style={{ width: "50px" }}>{data.icon}</div>
							{/* <i
								className="fas fa-square orange-text mr-2"
								aria-hidden="true"
							></i> */}
							<p className="font-weight-bold text-uppercase spacing m-3">
								<strong className="orange-text">{data.title}</strong>
							</p>
							<p className="font-small mx-4 service-title">{data.desc}</p>
						</div>
					</div>
				))}
			</div>
			<Button variant="outlined" className="mb-2">
				<Link className="text-dark px-2" to="/resume-templates">
					Start for free today
				</Link>
			</Button>
			<hr className="my-3" style={{ height: "2px" }} />
		</div>
	);
};

export default Benefits;
