import React from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

export default function List({todoData, setTodoData}) {

    const handleCompleteChange = (id) => {
        let newTodoData = todoData.map(data => {
            if (data.id === id) {
                data.completed = !data.completed;
            }
            return data;
        });
        setTodoData(newTodoData);
    };

    const handleClick = (id) => {
        console.log(id)
        let newTodoData = todoData.filter(data => data.id !== id);
        console.log('newTodoData ', newTodoData);
        setTodoData(newTodoData);
    };

    const handleEnd = (result) => {
        console.log('result', result);

        if (!result.destination) return;
        const newTodoData = [...todoData];

        // 1. 변경 시키는 아이템을 배열에서 지워준다.
        // 2. return 값으로 지워진 아이템을 잡아준다.
        const [reorderdItem] = newTodoData.splice(result.source.indent, 1);

        newTodoData.splice(result.destination.indent, 0, reorderdItem);
        setTodoData(newTodoData);
    }

    return (
        <div>
            <DragDropContext onDragEnd={handleEnd}>
                <Droppable droppableId="todo">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {todoData.map((data, index) => {
                                return (
                                    <Draggable
                                        key={data.id}
                                        draggableId={data.id.toString()}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div key={data.id} {...provided.draggableProps}
                                                 ref={provided.innerRef} {...provided.draggableProps}
                                                 className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-400 border rounded`}>
                                                <div className="items-center">
                                                    <input type="checkbox" defaultChecked={false}
                                                           onChange={() => handleCompleteChange(data.id)}/>{" "}
                                                    <span
                                                        className={data.completed ? "line-through" : undefined}>{data.title}</span>
                                                </div>
                                                <div className="items-center">
                                                    <button className="px-4 py-2 float-right"
                                                            onClick={() => handleClick(data.id)}>x
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};
