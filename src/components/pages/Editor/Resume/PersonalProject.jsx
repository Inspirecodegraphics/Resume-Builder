import React from "react";
import { useAuth } from "../../../../Providers/AuthProvider";
import Skeleton from "@material-ui/lab/Skeleton";
import { formatDate } from "../../../../services/adminService";

const PersonalProjects = () => {
	const { currentResume } = useAuth();
	const getDate = (date) => {
		const currentDate = date.seconds ? date.toDate() : date;

		const dateObj = formatDate(currentDate, [{ month: "short" }, "year"]);
		return `${dateObj.month} ${dateObj.year}`;
	};
	const project = () => {
		return (
			<div className="pb-2">
				<h6 className="d-flex align-items-center mb-1">
					<div className="rb-icon-circle">
						<i className="fas fa-file-alt"></i>
					</div>
					<b className="ps-2 project">{currentResume.project.label}</b>
				</h6>
				{currentResume.project.project.map((project, index) => (
					<div key={index} className="row m-0 mb-1 border-left">
						<div className="col-8 px-1">
							<h6 className="mb-0 project">
								{project.name}
								{project.externalLink && (
									<sup>
										<a
											href={project.externalLink}
											target="_blank"
											rel="noreferrer"
										>
											<i className="fas fa-external-link-alt ps-1 Elink"></i>
										</a>
									</sup>
								)}
							</h6>
						</div>
						<div className="col-4 px-1">
							<p className="m-0 project">
								<i className="fas fa-calendar-alt pe-1"></i>
								{getDate(project.startDate)} -
								{project.present ? <b> Present</b> : getDate(project.endDate)}
							</p>
						</div>
						{project.institution && (
							<div className="col px-1">
								<p className="m-0 project">
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
								<p className="m-0 project">
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
					<b className="ps-2 project">PROJECTS</b>
				</h6>
				<b>
					<p className="my-1 project">Project Name</p>
				</b>
				<p className="my-1 project">Description</p>
				<Skeleton animation="wave" variant="text" />
				<Skeleton animation="wave" variant="text" />
			</div>
		);
	};
	return currentResume && currentResume.project ? project() : empty();
};

export default PersonalProjects;
