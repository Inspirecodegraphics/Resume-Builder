import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../Providers/AuthProvider";
import { formatDate } from "../../../../services/adminService";

const WorkExperience = () => {
	const { currentResume } = useAuth();
	const formatDesc = (desc) => {
		return desc.split("/n");
	};
	const getDate = (date) => {
		const dateObj = formatDate(date, [{ month: "short" }, "year"]);
		return `${dateObj.month} ${dateObj.year}`;
	};
	const workExperience = () => {
		return (
			<div className="pb-0 experience">
				<h6 className="d-flex align-items-center mb-1">
					<div className="rb-icon-circle">
						<i className="fas fa-briefcase"></i>
					</div>
					<b className="ps-2 workExperience">
						{currentResume.workExperience.label}
					</b>
				</h6>
				{currentResume.workExperience.experience.map((experience, index) => (
					<div key={index} className="row m-0 mb-2">
						<div className="col-12 px-1">
							<h6 className="mb-1 workExperience">{experience.title}</h6>
						</div>
						<div className="col-8 px-1 pb-1">
							<p className="m-0 workExperience">
								<i className="fas fa-school pe-1"></i>
								<span style={{ fontWeight: "500" }}>
									{experience.company}
								</span>, {experience.address}
							</p>
						</div>
						<div className="col-4 px-1 pb-1">
							<p className="m-0 workExperience">
								<i className="fas fa-calendar-alt pe-1"></i>
								{getDate(experience.startDate.toDate())} -
								{experience.present ? (
									<b> Present</b>
								) : (
									getDate(experience.endDate.toDate())
								)}
							</p>
						</div>
						<div className="col-12 px-1">
							<ul className="desc-list mb-0 workExperience">
								{formatDesc(experience.desc).map((data, index) => (
									<li className="ps-1">{data}</li>
								))}
							</ul>
						</div>
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
						<i className="fas fa-briefcase"></i>
					</div>
					<b className="ps-2 workExperience">WORK EXPERIENCE</b>
				</h6>
				<b>
					<p className="my-1 workExperience">Title/Position</p>
				</b>
				<p className="my-1 workExperience">
					<i className="fas fa-city"></i> Workplace/Company
				</p>
			</div>
		);
	};
	return currentResume && currentResume.workExperience
		? workExperience()
		: empty();
};

export default WorkExperience;
