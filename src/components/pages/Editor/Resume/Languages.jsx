import React from "react";
import { useAuth } from "../../../../Providers/AuthProvider";
import _ from "lodash";

const Languages = () => {
	const { currentResume } = useAuth();

	const languages = () => {
		return (
			<div className="pb-3">
				<h6 className="d-flex align-items-center mb-1">
					<div className="rb-icon-circle">
						<i className="fas fa-comment-dots"></i>
					</div>
					<b className="ps-2 language">{currentResume.language.label}</b>
				</h6>
				{currentResume.language.language.map((language, index) => (
					<div key={index} className="row m-0 mb-2">
						<div className="col-6 px-1">
							<h6 style={{ fontSize: "inherit" }} className="mb-0 language">
								{language.name.toUpperCase()}
							</h6>
						</div>
						<div className="col-6 px-0">
							<h6 className="mb-0 language">
								{_.range(5).map((ele) => {
									return (
										<i
											className={`fas fa-square px-1 ${
												ele < language.value ? "" : "text-white"
											}`}
										></i>
									);
								})}
							</h6>
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
						<i className="fas fa-comment-dots"></i>
					</div>
					<b className="ps-2 language">LANGUAGES</b>
				</h6>
				<b>
					<p className="my-1 language">Language</p>
				</b>
				<p className="my-1 language">
					Proficiency {"  "}
					<i className="fas fa-square"></i> <i className="fas fa-square"></i>{" "}
					<i className="fas fa-square"></i>{" "}
					<i className="fas fa-square text-white"></i>{" "}
					<i className="fas fa-square text-white"></i>{" "}
				</p>
			</div>
		);
	};

	return currentResume && currentResume.language ? languages() : empty();
};

export default Languages;
