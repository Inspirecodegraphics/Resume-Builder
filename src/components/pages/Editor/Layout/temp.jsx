import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import initialData from "./../../../../services/settingsData";
import Column from "./Column";

const Layout = () => {
	const [state, setState] = useState(initialData);
	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const start = state.columns[source.droppableId];
		const finish = state.columns[destination.droppableId];

		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				taskIds: newTaskIds,
			};

			const newState = {
				...state,
				columns: {
					...state.columns,
					[newColumn.id]: newColumn,
				},
			};

			setState(newState);
			return;
		}

		// Moving from one list to another
		const startTaskIds = Array.from(start.taskIds);
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			taskIds: startTaskIds,
		};

		const finishTaskIds = Array.from(finish.taskIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			taskIds: finishTaskIds,
		};

		const newState = {
			...state,
			columns: {
				...state.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		};
		setState(newState);
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="container">
				<div className="row">
					<div className="d-flex">
						{state.columnOrder.map((columnId) => {
							const column = state.columns[columnId];
							const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
							return (
								<Column
									col="col-4"
									key={column.id}
									column={column}
									tasks={tasks}
								/>
							);
						})}
					</div>
				</div>
			</div>

			{/* <Droppable droppableId="droppable">
				{(provided) => (
					<div ref={provided.innerRef}>
						<Draggable>{state.columnOrder}</Draggable>
					</div>
				)}
			</Droppable> */}
		</DragDropContext>
	);
};

export default Layout;
