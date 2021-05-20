import React from "react";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import icon from "../../static/logo.png";

import "./Footer.css";

function Footer() {
	function scrollToTop() {
		window.scrollTo(0, 0);
	}
	const social = {
		facebook: {
			link: "https://www.facebook.com/guptaashwanee",
			icon: "fab fa-facebook-f text-primary",
		},
		twitter: {
			link: "https://www.twitter.com/guptaashwanee",
			icon: "fab fa-twitter text-info",
		},
		instagram: {
			link: "https://www.instagram.com/guptaashwanee",
			icon: "fab fa-instagram text-danger",
		},
	};
	return (
		<footer
			className="page-footer text-white text-center text-md-start"
			style={{ backgroundColor: "#313b47" }}
		>
			<div style={{ backgroundColor: "#425061" }}>
				<div className="container">
					<div className="row py-3 text-white d-flex align-items-center">
						<div
							style={{ height: "37px" }}
							className="col-md-6 text-center text-md-start"
						>
							<h6 style={{ lineHeight: "37px" }}>
								Get connected with us on social networks!
							</h6>
						</div>
						<div className="col-md-6 text-center text-md-end">
							{Object.keys(social).map((type, index) => (
								<Tooltip key={index} placement="bottom" title={type} arrow>
									<a
										target="_blank"
										rel="noopener noreferrer"
										className="btn-floating btn-small mx-2 d-inline-block text-center bg-light z-depth-1"
										href={social[type].link}
									>
										<i className={social[type].icon}></i>
									</a>
								</Tooltip>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="container my-5">
				<div className="row">
					<div className="col-md-3 col-sm-6 col-12">
						<h6>
							<img src={icon} alt="" style={{ width: "40px" }} /> ResumeBase
						</h6>
						<hr
							className="text-danger mx-auto d-inline-block mb-4 mt-0"
							style={{ width: 75, height: 1.5, opacity: 0.75 }}
						/>
						<p>
							RESUMEBASE is organize & managed by the INSPIRE team. The purpose
							is to provide an extremely rich graphical user interface for
							creating Resumes, with clean & maintainable Design.
						</p>
					</div>
					<div className="col-md-3 col-sm-6 col-12">
						<h6>Products</h6>
						<hr
							className="text-danger mx-auto d-inline-block mb-4 mt-0"
							style={{ width: 75, height: 1.5, opacity: 0.75 }}
						/>
						<p>
							<Link
								onClick={scrollToTop}
								className="footer-link"
								to="/resume-templates"
							>
								Resume Templates
							</Link>
						</p>
						<p>
							<Link
								onClick={scrollToTop}
								className="footer-link"
								to="/cv-templates"
							>
								CV Templates
							</Link>
						</p>
						<p>
							<Link
								onClick={scrollToTop}
								className="footer-link"
								to="/cover-Letters"
							>
								Cover Letters
							</Link>
						</p>
					</div>
					<div className="col-md-3 col-sm-6 col-12">
						<h6>Useful links</h6>
						<hr
							className="text-danger mx-auto d-inline-block mb-4 mt-0"
							style={{ width: 75, height: 1.5, opacity: 0.75 }}
						/>
						<p>
							<Link
								onClick={scrollToTop}
								className="footer-link"
								to="/about-us"
							>
								About Us
							</Link>
						</p>
						<p>
							<Link
								onClick={scrollToTop}
								className="footer-link"
								to="/page/legal/privacy-policy"
							>
								Privacy Policy
							</Link>
						</p>
						<p>
							<a
								target="_blank"
								rel="noopener noreferrer"
								className="footer-link"
								href="https://inspirecg.in"
							>
								Inspire Code & Graphics
							</a>
						</p>
					</div>
					<div className="col-md-3 col-sm-6 col-12">
						<h6>Contact</h6>
						<hr
							className="text-danger mx-auto d-inline-block mb-4 mt-0"
							style={{ width: 75, height: 1.5, opacity: 0.75 }}
						/>

						<p>
							<i className="fas fa-home me-3"></i>
							S.A.T.I. VIDISHA 464001(M.P.)
						</p>
						<p>
							<i className="fas fa-envelope me-3"></i>
							<a className="footer-link" href="mailto:info.inspirecg@gmail.com">
								info.inspirecg@gmail.com
							</a>
						</p>
						<p>
							<i className="fas fa-phone me-3"></i>
							<a className="footer-link" href="tel:8827920790">
								+91 8827920790
							</a>
						</p>
						<p>
							<i className="fab fa-whatsapp me-3"></i>
							<a
								target="_blank"
								rel="noopener noreferrer"
								className="footer-link"
								href="https://api.whatsapp.com/send?phone=918827920790&text=Hello%20Inspire%20Resume%20-&source=&data="
							>
								+91 8827920790
							</a>
						</p>
					</div>
				</div>
			</div>
			<div className="bg-dark">
				<div className="container py-3 text-white text-center">
					<div>
						Copyright © 2021 <strong>INSPIRE RESUME</strong>. All Rights
						Reserved
					</div>
					<div className="py-1">
						Designed &amp; Maintained by{" "}
						<a
							rel="noopener noreferrer"
							href="https://github.com/guptaashwanee"
							target="_blank"
							class="footer-link"
						>
							Ashwanee Gupta
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
