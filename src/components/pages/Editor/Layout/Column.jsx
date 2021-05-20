import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const Container = {
	margin: "8px",
	border: "1px solid lightgrey",
	borderRadius: "2px",
	// width: "220px",
	// display: "flex",
	flexDirection: "column",
};

// 	padding: 8px;
// 	transition: background-color 0.2s ease;
// 	background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
// 	flex-grow: 1;
// 	min-height: 100px;
// `;

export default class Column extends React.Component {
	render() {
		return (
			<div className={this.props.col} style={Container}>
				<h3 className="p-2 text-dark">{this.props.column.title}</h3>
				<Droppable droppableId={this.props.column.id}>
					{(provided, snapshot) => (
						<div
							style={{ minHeight: "100px", flexGrow: "1", padding: "8px" }}
							ref={provided.innerRef}
							{...provided.droppableProps}
							isDraggingOver={snapshot.isDraggingOver}
						>
							{this.props.tasks.map((task, index) => (
								<Task key={task.id} task={task} index={index} />
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		);
	}
}
