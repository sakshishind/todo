import React from "react";

// STEP 1: Catch everything the form needs to work
function TodoForm({ formData, setFormData, setShowForm, handleSave, editId }) {
    
    return (
        /* STEP 2: The background overlay */
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                <h2 className="text-xl font-bold mb-4 text-stone-800">
                    {editId ? "Edit Todo" : "New Todo"}
                </h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full mb-3 p-2 rounded bg-stone-100 outline-none focus:ring-1 focus:ring-stone-300"
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={formData.desc}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    className="w-full mb-3 p-2 rounded bg-stone-100 outline-none focus:ring-1 focus:ring-stone-300"
                />

                <input
                    type="text"
                    placeholder="Time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full mb-4 p-2 rounded bg-stone-100 outline-none focus:ring-1 focus:ring-stone-300"
                />

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-5 py-2 bg-stone-400 text-white rounded hover:bg-stone-500 transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodoForm;