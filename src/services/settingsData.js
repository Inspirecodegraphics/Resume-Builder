const initialData = {
	tasks: {
		"task-1": { id: "task-1", content: "Certificates" },
		"task-2": { id: "task-2", content: "Projects" },
		"task-3": { id: "task-3", content: "Achievements" },
		"task-4": { id: "task-4", content: "Education" },
		"task-5": { id: "task-5", content: "Languages" },
		"task-6": { id: "task-6", content: "Interests" },
		"task-7": { id: "task-7", content: "Tech. Skills" },
		"task-8": { id: "task-8", content: "Skills" },
		"task-9": { id: "task-9", content: "Work Experience" },
		"task-10": { id: "task-10", content: "Social" },
	},
	columns: {
		"column-1": {
			id: "column-1",
			title: "To do",
			taskIds: [],
		},
		"column-2": {
			id: "column-2",
			title: "In progress",
			taskIds: [],
		},
		"column-3": {
			id: "column-3",
			title: "Done",
			taskIds: [
				"task-1",
				"task-2",
				"task-3",
				"task-4",
				"task-5",
				"task-6",
				"task-7",
				"task-8",
				"task-9",
				"task-10",
			],
		},
	},
	// Facilitate reordering of the columns
	columnOrder: ["column-1", "column-2", "column-3"],
};

export default initialData;
