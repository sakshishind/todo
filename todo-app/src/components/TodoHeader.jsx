import React from "react";

// Receive the functions and state from Dashboard as props
function TodoHeader({ search, setSearch, onNew, onLogout }) {
  return (
    <div className="w-full">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-stone-800">My Tasks</h2>
        <button
          onClick={onLogout} // Uses prop from Dashboard
          className="bg-red-400 hover:bg-red-500 text-white px-5 py-2 rounded-lg font-semibold shadow"
        >
          Logout
        </button>
      </div>

      {/* Search + New Button */}
      <div className="flex justify-end items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white px-4 py-2 rounded-lg shadow text-stone-700 outline-none border border-transparent focus:border-stone-300"
        />

        <button
          onClick={onNew} // Uses prop from Dashboard
          className="bg-stone-400 hover:bg-stone-500 text-white px-5 py-2 rounded-lg font-semibold shadow"
        >
          + New Todo
        </button>
      </div>
    </div>
  );
}

export default TodoHeader;