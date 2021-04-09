const resume = [
	{
		id: 1,
	},
];
const user = [
	{
		id: 1,
		name: "Ashwanee Kumar Gupta",
		tag: "Web Developer & Graphic Designer",
		imgUrl:
			"https://avatars0.githubusercontent.com/u/52340682?s=400&u=f95785be36c03b5b0be65765d03176c60b18a632&v=4",
		desc: `Prolific, a full-stack Web developer & Graphic designer with a passion for metrics and beating former "best-yets." Seeking an Intern job as a Full-Stack UI Developer. 2+ years of experience includes programming, debugging, designing, and wireframes.`,
		socialInfo: [
			{
				label: "Facebook",
				icon: "fab fa-facebook-f",
				link: "https://www.facebook.com/guptaashwanee",
			},
			{
				label: "Instagram",
				icon: "fab fa-instagram",
				link: "https://www.instagram.com/guptaashwanee",
			},
			{
				label: "LinkedIn",
				icon: "fab fa-linkedin-in",
				link: "https://www.linkedin.com/in/guptaashwanee/",
			},
			{
				label: "Twitter",
				icon: "fab fa-twitter",
				link: "https://twitter.com/guptaashwanee",
			},
			{
				label: "Github",
				icon: "fab fa-github",
				link: "https://github.com/guptaashwanee",
			},
			{
				label: "Stack Overflow",
				icon: "fab fa-stack-overflow",
				link: "",
			},
			{
				label: "Medium",
				icon: "fab fa-medium-m",
				link: "",
			},
			{
				label: "Quora",
				icon: "fab fa-quora",
				link: "",
			},
			{
				label: "Skype",
				icon: "fab fa-skype",
				link: "",
			},
		],
		mainContact: [
			{
				label: "Phone Number",
				icon: "fas fa-mobile-alt",
				link: "tel:8827920790",
			},
			{
				label: "Website",
				icon: "fas fa-globe",
				link: "https://www.inspirecg.in/",
			},
			{
				label: "Email",
				icon: "fas fa-envelope",
				link: "mailto:ashwanee2001gupta@gmail.com",
			},
		],
		address: {
			icon: "fas fa-map-marker-alt",
			country: "India",
			state: "Madhya Pradesh",
			add: "In front of ECHS hospital, bodabag road KABEER SADAN, rewa (M.P.)",
		},
	},
	{
		id: 2,
		name: "Ashwanee Kumar Gupta",
		tag: "Web Developer & Graphic Designer",
		imgUrl:
			"https://avatars0.githubusercontent.com/u/52340682?s=400&u=f95785be36c03b5b0be65765d03176c60b18a632&v=4",
		desc: `Prolific, a full-stack Web developer & Graphic designer with a passion for metrics and beating former "best-yets." Seeking an Intern job as a Full-Stack UI Developer. 2+ years of experience includes programming, debugging, designing, and wireframes.`,
		socialInfo: {
			facebook: {
				label: "Facebook",
				icon: "fab fa-facebook-f",
				link: "https://www.facebook.com/guptaashwanee",
			},
			instagram: {
				label: "Instagram",
				icon: "fab fa-instagram",
				link: "https://www.instagram.com/guptaashwanee",
			},
			linkedIn: {
				label: "LinkedIn",
				icon: "fab fa-linkedin-in",
				link: "https://www.linkedin.com/in/guptaashwanee/",
			},
			twitter: {
				label: "Twitter",
				icon: "fab fa-twitter",
				link: "https://twitter.com/guptaashwanee",
			},
			github: {
				label: "Github",
				icon: "fab fa-github",
				link: "https://github.com/guptaashwanee",
			},
			stackOverFlow: {
				label: "Stack Overflow",
				icon: "fab fa-stack-overflow",
				link: "",
			},
			medium: {
				label: "Medium",
				icon: "fab fa-medium-m",
				link: "",
			},
			quora: {
				label: "Quora",
				icon: "fab fa-quora",
				link: "",
			},
			skype: {
				label: "Skype",
				icon: "fab fa-skype",
				link: "",
			},
		},
		mainContact: {
			phoneNumber: {
				label: "Phone Number",
				icon: "fas fa-mobile-alt",
				link: "8827920790",
			},
			website: {
				label: "Website",
				icon: "fas fa-globe",
				link: "https://www.inspirecg.in/",
			},
			email: {
				label: "Email",
				icon: "fas fa-envelope",
				link: "ashwanee2001gupta@gmail.com",
			},
			address: {
				label: "Address",
				icon: "fas fa-map-marker-alt",
				country: "India",
				state: "Madhya Pradesh",
				link:
					"In front of ECHS hospital, bodabag road KABEER SADAN, rewa (M.P.)",
			},
		},
	},
];

const getResume = () => {
	return resume;
};
const getUser = () => {
	return user[1];
};
const setUserContact = (data) => {
	Object.keys(data).forEach((label) => {
		user[1].mainContact[label].link = data[label];
	});
	// user[1].address.add = data.address;
};
const setUserSocial = (social) => {};

export { getResume, getUser, setUserContact };
