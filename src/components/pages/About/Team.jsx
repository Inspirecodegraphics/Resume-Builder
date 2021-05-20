import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

const Team = () => {
	const teamMember = [
		{
			name: "Ashwanee Gupta",
			title: "Graphics Designer / UI Developer",
			photoURL:
				"https://firebasestorage.googleapis.com/v0/b/inspire-resume.appspot.com/o/Team%2FAshwanee%20Kumar%20Gupta.jpg?alt=media&token=2899c671-7780-442b-b738-d465e7d138bc",
			description:
				"A full-stack UI developer & Graphic designer, with 3+ year of experience in programming, & designing.",
			social: [
				{
					label: "facebook",
					link: "https://www.facebook.com/guptaashwanee",
					icon: "fab fa-facebook-f",
					anchorClass: "fb-ic",
				},
				{
					label: "twitter",
					link: "https://www.twitter.com/guptaashwanee",
					icon: "fab fa-twitter",
					anchorClass: "tw-ic",
				},
				{
					label: "github",
					link: "https://www.github.com/guptaashwanee",
					icon: "fab fa-github",
					anchorClass: "git-ic",
				},
				{
					label: "dribbble",
					link: "https://www.dribbble.com/guptaashwanee",
					icon: "fab fa-dribbble",
					anchorClass: "dribbble-ic",
				},
				{
					label: "linkedIn",
					link: "https://www.linkedin.com/in/guptaashwanee/",
					icon: "fab fa-linkedin-in",
					anchorClass: "li-ic",
				},
				{
					label: "instagram",
					link: "https://www.instagram.com/guptaashwanee",
					icon: "fab fa-instagram",
					anchorClass: "ins-ic",
				},
				{
					label: "mail",
					link: "https://mail.google.com/mail/?view=cm&fs=1&to=ashwanee2001gupta@gmail.com&su=INFO @ INSPIRE GRAPHICS &body=Hi there Inspire Graphics....&bcc=info.inspirecg@gmail.com",
					icon: "fas fa-envelope",
					anchorClass: "yt-ic",
				},
			],
		},
		{
			name: "Abhishek Rai",
			title: "Photoshop Expert / UI Designer",
			photoURL:
				"https://firebasestorage.googleapis.com/v0/b/inspire-resume.appspot.com/o/Team%2FAbhishek%20Rai.jpg?alt=media&token=065e932c-35bd-4982-b9e7-269accd4cc26",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur.",
			social: [
				{
					label: "facebook",
					link: "https://www.facebook.com/realabhirai",
					icon: "fab fa-facebook-f",
					anchorClass: "fb-ic",
				},
				{
					label: "twitter",
					link: "https://twitter.com/realabhishekrai",
					icon: "fab fa-twitter",
					anchorClass: "tw-ic",
				},
				{
					label: "github",
					link: "https://github.com/realabhishekrai",
					icon: "fab fa-github",
					anchorClass: "git-ic",
				},

				{
					label: "linkedIn",
					link: "https://www.linkedin.com/in/abhishek-rai-6a6a90181/",
					icon: "fab fa-linkedin-in",
					anchorClass: "li-ic",
				},
				{
					label: "instagram",
					link: "https://www.instagram.com/realabhishekrai/",
					icon: "fab fa-instagram",
					anchorClass: "ins-ic",
				},
				{
					label: "mail",
					link: "mailto:realabhishekrai@gmail.com",
					icon: "fas fa-envelope",
					anchorClass: "yt-ic",
				},
			],
		},
		{
			name: "Ankit Singh Chauhan",
			title: "UI Developer / Content Creator",
			photoURL:
				"https://firebasestorage.googleapis.com/v0/b/inspire-resume.appspot.com/o/Team%2FAnkit%20Singh%20Chauhan.jpg?alt=media&token=2b0fb239-3410-4cf7-b363-b0614b94821b",
			description: "I am a front-End developer / UI designer and programmer.",
			social: [
				{
					label: "facebook",
					link: "https://www.facebook.com/ankitt0007",
					icon: "fab fa-facebook-f",
					anchorClass: "fb-ic",
				},
				{
					label: "twitter",
					link: "https://twitter.com/Itz_Trooper_",
					icon: "fab fa-twitter",
					anchorClass: "tw-ic",
				},
				{
					label: "github",
					link: "https://github.com/ItzTrooper009",
					icon: "fab fa-github",
					anchorClass: "git-ic",
				},
				{
					label: "linkedIn",
					link: "https://www.linkedin.com/in/ankitt-chouhann-382459126/",
					icon: "fab fa-linkedin-in",
					anchorClass: "li-ic",
				},
				{
					label: "instagram",
					link: "https://www.instagram.com/itz_trooper_/",
					icon: "fab fa-instagram",
					anchorClass: "ins-ic",
				},
				{
					label: "mail",
					link: "mailto:ankitt335407@gmail.com",
					icon: "fas fa-envelope",
					anchorClass: "yt-ic",
				},
			],
		},
		{
			name: "Abhinav Aloney",
			title: "Social Media Handler",
			photoURL:
				"https://firebasestorage.googleapis.com/v0/b/inspire-resume.appspot.com/o/Team%2FAbhinav%20Aloney.jpg?alt=media&token=d9f61306-03ec-457c-8386-516ae0e883a4",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur.",
			social: [
				{
					label: "facebook",
					link: "https://www.facebook.com/abhinav.aloney/",
					icon: "fab fa-facebook-f",
					anchorClass: "fb-ic",
				},
				{
					label: "instagram",
					link: "https://www.instagram.com/tushar_19_07_/",
					icon: "fab fa-instagram",
					anchorClass: "ins-ic",
				},
				{
					label: "mail",
					link: "mailto:abhinavaloney@gmail.com",
					icon: "fas fa-envelope",
					anchorClass: "yt-ic",
				},
			],
		},
		{
			name: "Lavanshu Deshmukh",
			title: "Web Analyzer",
			photoURL:
				"https://firebasestorage.googleapis.com/v0/b/inspire-resume.appspot.com/o/Team%2FLavanshu%20Deshmukh.jpg?alt=media&token=fc7ab399-091c-4dd8-9c7d-28150317732c",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur.",
			social: [
				{
					label: "facebook",
					link: "https://www.facebook.com/lavanshu.deshmukh",
					icon: "fab fa-facebook-f",
					anchorClass: "fb-ic",
				},
				{
					label: "twitter",
					link: "https://twitter.com/LavanshuDeshmu1",
					icon: "fab fa-twitter",
					anchorClass: "tw-ic",
				},
				{
					label: "linkedIn",
					link: "https://www.linkedin.com/in/lavanshu-deshmukh-ab4124185",
					icon: "fab fa-linkedin-in",
					anchorClass: "li-ic",
				},
				{
					label: "github",
					link: "https://www.github.com/Lavanshu5030",
					icon: "fab fa-github",
					anchorClass: "git-ic",
				},
				{
					label: "instagram",
					link: "https://www.instagram.com/_lsd_28/",
					icon: "fab fa-instagram",
					anchorClass: "ins-ic",
				},
				{
					label: "mail",
					link: "mailto:lavanshu2001@gmail.com",
					icon: "fas fa-envelope",
					anchorClass: "yt-ic",
				},
			],
		},
		{
			name: "Nitin Singh",
			title: "Graphics Designer",
			photoURL:
				"https://firebasestorage.googleapis.com/v0/b/inspire-resume.appspot.com/o/Team%2FNitin%20Singh.jpg?alt=media&token=d4b65a3a-4659-4240-bd54-c48790a8b9ff",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur.",
			social: [
				{
					label: "facebook",
					link: "https://www.facebook.com/profile.php?id=100024403882912",
					icon: "fab fa-facebook-f",
					anchorClass: "fb-ic",
				},
				{
					label: "linkedIn",
					link: "https://www.linkedin.com/in/nitin-singh-1885b2158/",
					icon: "fab fa-linkedin-in",
					anchorClass: "li-ic",
				},
				{
					label: "instagram",
					link: "https://www.instagram.com/singhnitin_27/",
					icon: "fab fa-instagram",
					anchorClass: "ins-ic",
				},
				{
					label: "mail",
					link: "mailto:nitinsinghji12@gmail.com",
					icon: "fas fa-envelope",
					anchorClass: "yt-ic",
				},
				// {
				//   label: "mail",
				//   link: "mailto:nitinsinghji12@gmail.com",
				//   icon: "fas fa-envelope",
				//   anchorClass: "email-ic",
				// },
			],
		},
	];
	return (
		<div className="team">
			<div className="container">
				<div className="row">
					<div className="col">
						<h2 className="text-center pt-3 mb-0">
							<b>The Team</b>
						</h2>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<div className="container-member">
							{teamMember.map((member, index) => (
								<div className="card-member">
									<div className="content">
										<div className="imgBx-outer">
											<div className="imgBx">
												<img src={member.photoURL} alt="" />
											</div>
										</div>
										<div className="contentBx">
											<h3>
												{member.name} <br />
												<span>{member.title}</span>
											</h3>
										</div>
									</div>
									<ul className="sci">
										{member.social.map((social, index) => (
											<li style={{ "--i": index }}>
												<Tooltip
													key={index}
													placement="bottom"
													title={social.label}
													arrow
												>
													<a
														href={social.link}
														target="_blank"
														rel="noopener noreferrer"
													>
														<i className={social.icon}></i>
													</a>
												</Tooltip>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Team;
