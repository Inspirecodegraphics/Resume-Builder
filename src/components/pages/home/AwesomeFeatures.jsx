import React, { useState, useEffect } from "react";
import getFeatures from "../../../services/adminService";

const AwesomeFeatures = () => {
	const [features, setFeatures] = useState([]);

	useEffect(() => {
		let features = getFeatures();
		setFeatures(features);
	}, []);

	return (
		<div className="container-fluid pt-3 px-md-5" id="features">
			<div className="row mb-1 pt-2">
				<div className="col">
					<h4 className="text-left">Awesome features</h4>
				</div>
			</div>
			<div className="row align-items-center justify-content-center">
				{features.map((feature, index) => (
					<div key={index} className="col-lg-4 text-center col-md-9">
						{feature.col.map((features, index) => {
							return features.type === "image" ? (
								<img
									key={features + index}
									src={features.src}
									alt="Inspire Resume Features"
									className="z-depth-0 img-fluid hoverable"
								/>
							) : (
								<React.Fragment key={features + index}>
									<div className="row text-start">
										<div className="col-2 py-2">
											<i className={features.icon + " text-warning fa-2x"}></i>
										</div>
										<h5 className="font-weight-bolder title text-start">
											{features.title}
										</h5>
									</div>
									<div className="row">
										<div className="col-2">
											<hr className="m-auto my-1" style={{ height: "2px" }} />
										</div>
										<div className="col-10 mb-2">
											<p className="text-justify text-start">
												{features.description}
											</p>
										</div>
									</div>
								</React.Fragment>
							);
						})}
					</div>
				))}
			</div>
			<hr className="my-3" style={{ height: "2px" }} />
		</div>
	);
};

export default AwesomeFeatures;

// <div key={features + index} className="row mb-3">
// 	<div className="col-1 p-0 pt-3 text-center">
// 		<i className={features.icon + " text-warning fa-2x"}></i>
// 	</div>
// 	<div className="col-11 mb-2">
// 		<h5 className="font-weight-bolder title text-left">
// 			{features.title}
// 		</h5>
// 		<p className="text-justify">{features.description}</p>
// 	</div>
// </div>
