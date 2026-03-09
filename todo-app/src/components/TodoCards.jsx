import React from "react";

// STEP 1: Catch all the data and functions from the Dashboard as props
function TodoCards({ currentTodos, toggleComplete, handleEdit, handleDelete }) {
    
    // Safety check: if there are no todos, show nothing or a message
    if (!currentTodos || currentTodos.length === 0) {
        return <div className="text-center text-stone-500">No tasks found.</div>;
    }

    return (
        /* STEP 2: Wrap everything in a single parent div */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTodos.map((todo) => (
                <div key={todo._id} className="bg-white p-5 rounded-xl shadow">
                    
                    {/* radio + title */}
                    <div className="flex items-center gap-3">
                        <input
                            type="radio"
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo)}
                            className="w-4 h-4 cursor-pointer"
                        />
                        <h3 className={`text-lg font-semibold ${
                            todo.completed ? "line-through text-gray-400" : "text-stone-800"
                        }`}>
                            {todo.title}
                        </h3>
                    </div>

                    <p className="text-stone-500 text-sm mt-2">{todo.desc}</p>
                    <p className="text-stone-400 text-xs mt-2">{todo.time}</p>

                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={() => handleEdit(todo)}
                            className="text-stone-600 hover:text-stone-900 font-semibold text-sm"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => handleDelete(todo._id)}
                            className="text-red-400 hover:text-red-600 font-semibold text-sm"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TodoCards;