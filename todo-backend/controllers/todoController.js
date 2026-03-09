const Todo = require("../models/Todo");

const addTodo = async (req, res) => {
  try {
    const { title, desc, time, email } = req.body;

    const newTodo = new Todo({
      title,
      desc,
      time,
      email
    });

    await newTodo.save();
    res.json({ message: "Todo added", todo: newTodo });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};



const getTodos = async (req, res) => {
  try {
    const { email } = req.params;

    const todos = await Todo.find({ email });
    res.json(todos);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};



const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo deleted" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};



const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, time, completed } = req.body;

    const updated = await Todo.findByIdAndUpdate(
      id,
      { title, desc, time, completed },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { addTodo, getTodos, deleteTodo, updateTodo };
