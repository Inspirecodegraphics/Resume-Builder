import React from "react";
import { useAuth } from "../../../../Providers/AuthProvider";
import { formatDate } from "../../../../services/adminService";

const Education = () => {
	const { currentResume } = useAuth();
	const getDate = (date) => {
		const currentDate = date.seconds ? date.toDate() : date;

		const dateObj = formatDate(currentDate, [{ month: "short" }, "year"]);
		return `${dateObj.month} ${dateObj.year}`;
	};
	const education = () => {
		return (
			<div className="pb-0">
				<h6 className="d-flex align-items-center mb-1">
					<div className="rb-icon-circle">
						<i className="fas fa-graduation-cap"></i>
					</div>
					<b className="ps-2 education">{currentResume.education.label}</b>
				</h6>
				<div className="pb-1">
					{currentResume.education.education.map((education, index) => (
						<div key={index} className="row m-0 mb-1 border-left">
							<div className="col-12 px-1">
								<h6 className="mb-1 education">{education.program}</h6>
							</div>
							<div className="col-6 px-1">
								<p className="m-0 education">
									<i className="fas fa-school pe-1"></i>
									<span style={{ fontWeight: "500" }}>
										{education.institution}
									</span>
								</p>
							</div>
							<div className="col-4 px-1">
								<p className="m-0 education">
									<i className="fas fa-calendar-alt pe-1"></i>
									{getDate(education.startDate)} -
									{education.present ? (
										<b> Present</b>
									) : (
										getDate(education.endDate)
									)}
								</p>
							</div>
							<div className="col-2 px-1">
								<p className="m-0 education">{education.grade}</p>
							</div>
						</div>
					))}
				</div>
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
					<b className="ps-2 education">EDUCATION</b>
				</h6>
				<b>
					<p className="my-1 education">Study Program</p>
				</b>
				<p className="my-1">
					<i className="fas fa-city education"></i> Institute/Place of Education
				</p>
			</div>
		);
	};
	return currentResume && currentResume.education ? education() : empty();
};

export default Education;
