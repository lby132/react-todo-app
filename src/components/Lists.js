import React from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import List from "./List";

const Lists = React.memo(({todoData, setTodoData, handleClick}) => {
    const handleEnd = (result) => {
        console.log('result', result);

        if (!result.destination) return;
        const newTodoData = [...todoData];

        // 1. 변경 시키는 아이템을 배열에서 지워준다.
        // 2. return 값으로 지워진 아이템을 잡아준다.
        const [reorderdItem] = newTodoData.splice(result.source.indent, 1);

        newTodoData.splice(result.destination.indent, 0, reorderdItem);
        setTodoData(newTodoData);
        localStorage.setItem('todoData', JSON.stringify([newTodoData]));
    };
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
                                            <List
                                                handleClick={handleClick}
                                                key={data.id}
                                                id={data.id}
                                                title={data.title}
                                                completed={data.completed}
                                                todoData={todoData}
                                                setTodoData={setTodoData}
                                                provided={provided}
                                                snapshot={snapshot}
                                            />
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
});

export default Lists;
