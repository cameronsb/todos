import React, { useState } from "react";

function App() {
    const [newTodo, updateNewTodo] = useState("");
    const [todos, updateTodos] = useState([]);
    const handleInputChange = (e) => {
        updateNewTodo(e.target.value);
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        updateTodos((prevTodos) => [
            ...prevTodos,
            { id: Date.now(), text: newTodo, completed: false },
        ]);
        updateNewTodo("");
    };

    const handleDelete = (id) => {
        updateTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="mx-auto max-w-lg w-full p-4 mt-[200px] border rounded-md flex flex-col gap-y-4 bg-white">
            <form onSubmit={handleSumbit} className="bg-white">
                <input
                    type="text"
                    value={newTodo}
                    onChange={handleInputChange}
                    className="border-2 border-gray-400 rounded-lg p-2 w-full"
                    placeholder="Add a new todo"
                />
            </form>
            <div className="py-4 flex flex-col gap-y-2">
                <h1 className="text-3xl font-extrabold">Todo List</h1>

                {todos.length > 0 &&
                    todos.map((todo) => (
                        <div
                            key={todo.id}
                            className="text-lg p-2 w-full hover:bg-gray-100 flex items-center justify-between cursor-pointer"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleDelete(todo.id);
                                }
                            }}
                            onClick={() => {
                                handleDelete(todo.id);
                            }}
                        >
                            {todo.text}
                            <button
                                onClick={handleDelete.bind(this, todo.id)}
                                className="ml-2"
                            >
                                &#10006;
                            </button>
                        </div>
                    ))}

                {todos.length === 0 && (
                    <p className="text-lg text-center h-[100px] p-4 bg-gray-50 rounded-md">
                        You're all done for today! <br />
                        <span className="text-sm text-gray-500">
                            Add a new todo to get started.
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
}

export default App;
