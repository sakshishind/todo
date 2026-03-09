import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../components/Pagination";
import TodoHeader from "../components/TodoHeader";
import TodoCards from "../components/TodoCards";
import TodoForm from "../components/TodoForm";


const API = "http://localhost:8000/api/todo";

function Dashboard() {

  const navigate = useNavigate();
  const loggedUser = localStorage.getItem("loggedUser") || "User";

  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 6;

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    time: "",
    completed: false
  });

  // Load todos from MongoDB
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`${API}/user/${loggedUser}`);
        setTodos(res.data);
      } catch (error) {
        console.log("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, [loggedUser]);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/");
  };

  const handleNew = () => {
    setFormData({ title: "", desc: "", time: "", completed: false });
    setEditId(null);
    setShowForm(true);
  };

  const handleEdit = (todo) => {
    setFormData(todo);
    setEditId(todo._id);
    setShowForm(true);
  };

  // Delete todo from MongoDB
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/delete/${id}`);
      setTodos(todos.filter(t => t._id !== id));
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  // Add or Update todo in MongoDB
  const handleSave = async () => {
    try {
      if (editId) {
        // Update existing todo
        const res = await axios.put(`${API}/update/${editId}`, formData);
        setTodos(todos.map(t => t._id === editId ? res.data : t));
      } else {
        // Add new todo
        const res = await axios.post(`${API}/add`, {
          ...formData,
          email: loggedUser
        });
        setTodos([...todos, res.data.todo]);
      }
      setShowForm(false);
    } catch (error) {
      console.log("Error saving todo:", error);
    }
  };

  // Toggle complete in MongoDB
  const toggleComplete = async (todo) => {
    try {
      console.log("Before toggle:", todo.completed);

      const res = await axios.put(`${API}/update/${todo._id}`, {
        completed: !todo.completed
      });

      console.log("API Response:", res.data);

      setTodos(todos.map(t =>
        t._id === todo._id
          ? { ...t, completed: !todo.completed }
          : t
      ));
    } catch (error) {
      console.log("Error toggling todo:", error);
    }
  };

  const filteredTodos = todos.filter(todo =>
    (todo.title || "").toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * todosPerPage;
  const indexOfFirst = indexOfLast - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  const todoz = [
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build a project' },
    { id: 3, text: 'Deploy to the web' }
  ];



  return (
    <div className="min-h-screen bg-amber-50 px-16 py-8">
      <TodoHeader
        search={search}
        setSearch={setSearch}
        onNew={handleNew}
        onLogout={handleLogout}
      ></TodoHeader>

      <ul>
      {todoz.map((todo) => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>

      <TodoCards
        currentTodos={currentTodos}
        toggleComplete={toggleComplete}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      ></TodoCards>


      {showForm && (
        <TodoForm
          formData={formData}
          setFormData={setFormData}
          setShowForm={setShowForm}
          handleSave={handleSave}
          editId={editId}
        />
      )}

      <Pagination
        todos={todos}
        search={search}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>

    </div>
  );
}

export default Dashboard;
