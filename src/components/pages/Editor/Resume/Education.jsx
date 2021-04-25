import React from "react";
import { useAuth } from "../../../../Providers/AuthProvider";

const Education = () => {
	const { currentResume } = useAuth();

	const education = () => {
		return (
			<div className="pb-0 education">
				<h6 className="d-flex align-items-center">
					<div className="rb-icon-circle">
						<i className="fas fa-graduation-cap"></i>
					</div>
					<b className="ps-2">{currentResume.education.label}</b>
				</h6>
				{currentResume.education.education.map((education, index) => (
					<div key={index} className="row m-0 mb-2 border-left">
						<div className="col-12 px-1">
							<h6 className="mb-1">{education.program}</h6>
						</div>
						<div className="col-6 px-1">
							<p className="m-0">
								<i className="fas fa-school pe-1"></i>
								<span style={{ fontWeight: "500" }}>
									{education.institution}
								</span>
							</p>
						</div>
						<div className="col-4 px-1">
							<p className="m-0">
								<i className="fas fa-calendar-alt pe-1"></i>
								{/* {education.startDate} */}
								July 2018 - Dec 2018
							</p>
						</div>
						<div className="col-2 px-1">
							<p className="m-0">{education.grade}</p>
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
						<i className="fas fa-graduation-cap"></i>
					</div>
					<b className="ps-2">EDUCATION</b>
				</h6>
				<b>
					<p className="my-1">Study Program</p>
				</b>
				<p className="my-1">
					<i className="fas fa-city"></i> Institute/Place of Education
				</p>
			</div>
		);
	};
	return currentResume && currentResume.education ? education() : empty();
};

export default Education;
