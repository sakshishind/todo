import { useState } from "react";

function Pagination({ todos, search, currentPage, setCurrentPage }) {
  
  const todosPerPage = 6;

  const filteredTodos = todos.filter(todo =>
    (todo.title || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  return (
    <div className="flex justify-center mt-10 gap-2">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-4 py-2 rounded shadow ${
            currentPage === i + 1
              ? "bg-stone-400 text-white"
              : "bg-white text-stone-600"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;