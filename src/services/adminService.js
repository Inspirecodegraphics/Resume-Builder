const month = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const monthShort = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const features = [
	{
		col: [
			{
				icon: "fas fa-edit",
				title: "Modern design",
				description:
					"Modern design elements to your resume, including colors and fonts, to give it a creative edge.",
			},
			{
				icon: "fas fa-cogs",
				title: "Easy for create",
				description:
					"It only takes a couple of seconds to start, you need to choose a design and layout to create resume",
			},
			{
				icon: "fas fa-tablet-alt",
				title: "Responsive work",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima.",
			},
		],
	},
	{
		col: [
			{
				type: "image",
				src: "https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png",
			},
		],
	},
	{
		col: [
			{
				icon: "fas fa-chart-line",
				title: "Optimized for use",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima.",
			},
			{
				icon: "fas fa-users",
				title: "Technical support",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima.",
			},
			{
				icon: "far fa-gem",
				title: "High quality",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima.",
			},
		],
	},
];

function formatDate(date, views) {
	const result = {};
	views.forEach((ele) => {
		if (typeof ele === "object") {
			Object.keys(ele).forEach((key) => {
				if (key === "month") {
					result[key] = getMonthName(date.getMonth(), ele[key]);
				}
				if (key === "day") {
					result[key] = getDaysName(date.getDay(), ele[key]);
				}
			});
		}
		if (ele === "year") {
			result[ele] = date.getFullYear();
		}
		if (ele === "month") {
			result[ele] = getMonthName(date.getMonth());
		}
		if (ele === "day") {
			result[ele] = getDaysName(date.getDay());
		}
	});
	return result;
}
function getMonthName(index, type) {
	return type === "short" ? monthShort[index] : month[index];
}
function getDaysName(index, type) {
	return type === "short" ? daysShort[index] : days[index];
}

export default function getFeatures() {
	return features;
}
export { formatDate, getFeatures };
