import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import CategoryCard from "./components/CategoryCard";
import { ControlledMenu } from "./components/Menu";
import TaskCard from "./components/TaskCard";
import { morningTodos, packingTodos } from "./lists";

function App() {
    const [newTodo, updateNewTodo] = useState("");
    const [todos, updateTodos] = useState([]);
    const [visibleTodos, updateVisibleTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [hideOnComplete, updateHideOnComplete] = useState(false); // either remove or strike through

    const firstRender = useRef(true);

    const getSettingsOptions = () => {
        // show a toggled on option or a toggled off option
        const hideOnCompleteOption = {
            content: (
                <>
                    <strong>Completed Tasks</strong>:{" "}
                    {hideOnComplete ? "Hide" : "Strikethrough"}
                </>
            ),
            // content: <></>,
            value: "OnComplete",
            onClick: () => {
                updateHideOnComplete(!hideOnComplete);
            },
        };

        return [hideOnCompleteOption];
    };

    // * Task Creation * //
    const handleInputChange = (e) => {
        updateNewTodo(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTodos((prevTodos) => [
            ...prevTodos,
            { id: Date.now(), text: newTodo, completed: false },
        ]);
        updateNewTodo("");
    };

    // * Task Deletion * //
    const handleDelete = (id) => {
        updateTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    // * Task Completion * //
    const handleComplete = (id) => {
        updateTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }

                return todo;
            })
        );
    };

    // * Storage Management * //
    const getTodosFromStorage = () => {
        const todos = localStorage.getItem("todos");

        if (todos) {
            return JSON.parse(todos);
        }

        return [];
    };

    const saveTodosToStorage = (todos) => {
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    // * Category Support * //
    // TODO: categories should be separate objects
    const getIconForCategory = (category) => {
        switch (category) {
            case "packing":
                return "🏜️";
            case "groceries":
                return "🛒";
            case "work":
                return "💼";
            case "school":
                return "🎓";
            case "fitness":
                return "🏋️";
            case "morning":
                return "☀️";
            case "evening":
                return "🌙";
            case "weekend":
                return "🎉";
            default:
                return "📦";
        }
    };

    const getTodosByCategory = (category) => {
        let todoItems = [];
        switch (category) {
            case "packing":
                todoItems = packingTodos;
                break;
            case "morning":
                todoItems = morningTodos;
                break;
            default:
                todoItems = [];
                toast.error("Category not found");
        }

        return todoItems.map((todo) => {
            return {
                id: uuidv4(),
                text: todo,
                completed: false,
            };
        });
    };

    const handleCategoryClick = (category) => {
        // preload the todo list for the category
        const todos = getTodosByCategory(category);

        // update the todo list
        updateTodos(todos);
    };

    useEffect(() => {
        const todos = getTodosFromStorage();
        updateTodos(todos);

        setLoading(false);

        const handleStorageChange = (e) => {
            if (e.key === "todos") {
                const todos = getTodosFromStorage();
                updateTodos(todos);
            }
        };

        // storage listener to update the todo list when storage changes
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        saveTodosToStorage(todos);

        if (hideOnComplete) {
            updateVisibleTodos(todos.filter((todo) => !todo.completed));
        } else {
            updateVisibleTodos(todos);
        }
    }, [todos, hideOnComplete]);

    // // handle hotkeys for undo and redo
    // useEffect(() => {
    //     // mac = command + z
    //     // windows = ctrl + z

    //     // TODO: https://usehooks.com/usehistorystate

    //     // check for mac
    //     const isMac = navigator.userAgent.toUpperCase().includes("MAC");

    //     const modifierKey = isMac ? "metaKey" : "ctrlKey";

    //     const handleHotkey = (e) => {
    //         // mod + shift + z
    //         if (e[modifierKey] && e.shiftKey && e.key === "z") {
    //             // redo
    //             console.log("redo");

    //             return;
    //         }
    //         // mod + z
    //         if (e[modifierKey] && e.key === "z") {
    //             // undo
    //             console.log("undo");

    //             return;
    //         }
    //     };

    //     window.addEventListener("keydown", handleHotkey);

    //     return () => {
    //         window.removeEventListener("keydown", handleHotkey);
    //     };
    // }, []);

    return !loading ? (
        <>
            <Toaster />
            <section className="px-5">
                <div className="mx-auto max-w-3xl w-full p-4 mt-[100px] border rounded-md flex flex-col gap-y-4 bg-white">
                    <form onSubmit={handleSubmit} className="bg-white">
                        <input
                            type="text"
                            value={newTodo}
                            onChange={handleInputChange}
                            className="border-2 border-gray-400 rounded-lg p-2 w-full"
                            placeholder="Add a new todo"
                            autoFocus={true}
                        />
                    </form>
                    <div className="py-4 flex flex-col gap-y-2">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-extrabold flex items-center">
                                <span>Todo List</span>

                                {visibleTodos.length > 0 && (
                                    <span className="text-gray-300 text-xl ml-4 font-normal">
                                        {/* show number of incomplete todos remaining */}
                                        {
                                            visibleTodos.filter(
                                                (todo) => !todo.completed
                                            ).length
                                        }{" "}
                                        of {todos.length} remaining
                                    </span>
                                )}
                            </h1>
                            {/* Settings Menu */}
                            <ControlledMenu
                                triggerMarkup={
                                    <>
                                        <span className="block">⚙️</span>
                                        <h3 className="sr-only">Settings</h3>
                                    </>
                                }
                                options={getSettingsOptions()}
                            />
                        </div>

                        {/* clear all */}
                        {todos.length > 0 && (
                            <button
                                onClick={() => {
                                    updateTodos([]);
                                }}
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                Clear all
                            </button>
                        )}

                        {visibleTodos.length > 0 ? (
                            visibleTodos.map((todo) => (
                                <TaskCard
                                    key={todo.id}
                                    todo={todo}
                                    handleComplete={handleComplete}
                                    handleDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <div className="text-lg text-center p-4 bg-gray-50 rounded-md">
                                <p className="text-lg text-center">
                                    You&apos;re all done for today! <br />
                                    <span className="text-sm text-gray-500">
                                        Add a new todo to get started.
                                    </span>
                                </p>
                                {/* Category Tiles */}
                                <div className="flex flex-col gap-y-2 mt-4">
                                    <h1 className="text-3xl font-extrabold">
                                        Categories
                                    </h1>
                                    <div className="grid grid-cols-2 gap-2 py-5">
                                        {[
                                            "packing",
                                            "groceries",
                                            "work",
                                            "school",
                                            "fitness",
                                            "morning",
                                            "evening",
                                            "weekend",
                                        ].map((category) => {
                                            const icon =
                                                getIconForCategory(category);

                                            return (
                                                <CategoryCard
                                                    key={category}
                                                    category={category}
                                                    icon={icon}
                                                    handleCategoryClick={
                                                        handleCategoryClick
                                                    }
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    ) : (
        // loading
        <div className="flex items-center justify-center h-screen">
            <p className="text-2xl font-bold text-white">Loading...</p>
        </div>
    );
}

export default App;
