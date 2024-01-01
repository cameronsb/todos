import React from "react";
import { twMerge } from "tailwind-merge";

const TaskCard = ({
    todo = null,
    handleComplete = () => {},
    handleDelete = () => {},
    // TODO: add edit ability / option menu
}) => {
    return (
        <div
            key={todo.id}
            className={twMerge(
                "text-lg p-2 w-full hover:bg-gray-100 flex items-center justify-between cursor-pointer group"
            )}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleComplete(todo.id);
                }
            }}
            onClick={() => {
                handleComplete(todo.id);
            }}
        >
            {/* Task Text */}
            <span
                className={twMerge(
                    todo.completed ? "line-through text-gray-300 h-[34px]" : ""
                )}
            >
                {todo.text}
            </span>

            {/* Delete Button */}
            <button
                onClick={handleDelete.bind(this, todo.id)}
                className={twMerge(
                    "ml-2 rounded-md p-1",
                    "group - hover:opacity-100 opacity-0 transition-opacity",
                    "border-2 border-transparent hover:border-gray-500",
                    "h-10 w-10 hover:bg-white"
                )}
            >
                {/* &#10006; */}
                &#x1F5D1;
            </button>
        </div>
    );
};

export default TaskCard;
