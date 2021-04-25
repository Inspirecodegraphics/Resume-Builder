import React from "react";
import { useAuth } from "../../../../Providers/AuthProvider";
import Skeleton from "@material-ui/lab/Skeleton";

const PersonalProjects = () => {
	const { currentResume } = useAuth();
	const project = () => {
		return (
			<div className="pb-2 experience">
				<h6 className="d-flex align-items-center">
					<div className="rb-icon-circle">
						<i className="fas fa-file-alt"></i>
					</div>
					<b className="ps-2">{currentResume.project.label}</b>
				</h6>
				{currentResume.project.project.map((project, index) => (
					<div key={index} className="row m-0 mb-1 border-left">
						<div className="col-8 px-1">
							<h6 className="mb-0">
								{project.name}
								{project.externalLink && (
									<sup>
										<a href={project.externalLink}>
											<i className="fas fa-external-link-alt ps-1 Elink"></i>
										</a>
									</sup>
								)}
							</h6>
						</div>
						<div className="col-4 px-1">
							<p className="m-0">
								<i className="fas fa-calendar-alt pe-1"></i>
								{/* {education.startDate} */}
								July 2018 - Dec 2018
							</p>
						</div>
						{project.institution && (
							<div className="col px-1">
								<p className="m-0">
									<i
										className="fas fa-school pe-1"
										style={{ fontSize: "xx-small" }}
									></i>
									{project.institution}
								</p>
							</div>
						)}
						{project.desc && (
							<div className="col-12 px-1">
								<p className="m-0">
									<i
										className="fas fa-circle pe-1"
										style={{ fontSize: "xx-small" }}
									></i>
									{project.desc}
								</p>
							</div>
						)}
					</div>
				))}
			</div>
		);
	};
	const empty = () => {
		return (
			<div className="py-3">
				<h6 className="d-flex align-items-center">
					<div className="rb-icon-circle">
						<i className="fas fa-file-alt"></i>
					</div>
					<b className="ps-2">PROJECTS</b>
				</h6>
				<b>
					<p className="my-1">Project Name</p>
				</b>
				<p className="my-1">Description</p>
				<Skeleton animation="wave" variant="text" />
				<Skeleton animation="wave" variant="text" />
			</div>
		);
	};
	return currentResume && currentResume.project ? project() : empty();
};

export default PersonalProjects;
