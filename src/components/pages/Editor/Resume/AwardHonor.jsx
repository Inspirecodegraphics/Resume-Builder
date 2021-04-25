import React from "react";
import { useAuth } from "../../../../Providers/AuthProvider";

const Honor = () => {
	const { currentResume } = useAuth();
	const award = () => {
		return (
			<div className="pb-2 experience">
				<h6 className="d-flex align-items-center">
					<div className="rb-icon-circle">
						<i className="fas fa-file-alt"></i>
					</div>
					<b className="ps-2">{currentResume.award.label}</b>
				</h6>
				{currentResume.award.award.map((award, index) => (
					<div key={index} className="row m-0 mb-1 border-left">
						<div className="col-10 px-1">
							<h6 className="mb-0">
								{award.name}
								{award.externalLink && (
									<sup>
										<a href={award.externalLink}>
											<i className="fas fa-external-link-alt ps-1 Elink"></i>
										</a>
									</sup>
								)}
							</h6>
						</div>
						<div className="col-2 px-1">
							<p className="m-0">
								<i className="fas fa-calendar-alt pe-1"></i>
								{/* {education.startDate} */}
								July 2018
							</p>
						</div>
						{award.institution && (
							<div className="col px-1">
								<p className="m-0">
									<i
										className="fas fa-square pe-1"
										style={{ fontSize: "xx-small" }}
									></i>
									{award.institution}
								</p>
							</div>
						)}
						{award.desc && (
							<div className="col-12 px-1">
								<p className="m-0">
									<i
										className="fas fa-circle pe-1"
										style={{ fontSize: "xx-small" }}
									></i>
									{award.desc}
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
					<b className="ps-2">HONOR AND AWARDS</b>
				</h6>
				<b>
					<p className="my-1">Title/Award Name</p>
				</b>
				<p className="my-1">Name of the Institution that issued/awarded it.</p>
				<p className="my-1">Description</p>
			</div>
		);
	};
	return currentResume && currentResume.award ? award() : empty();
};

export default Honor;
