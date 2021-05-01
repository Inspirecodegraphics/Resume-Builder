import React from "react";

const Certificates = () => {
	return (
		<div className="pb-3">
			<h6 className="d-flex align-items-center">
				<div className="rb-icon-circle">
					<i className="fas fa-certificate "></i>
				</div>
				<b className="ps-2 certificate">CERTIFICATES</b>
			</h6>

			<b>
				<p className="my-1 certificate">Certificate Name</p>
			</b>
			<p className="my-1 certificate">Description</p>
		</div>
	);
};

export default Certificates;
