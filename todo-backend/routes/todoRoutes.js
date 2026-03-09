const express = require("express");
const router = express.Router();

const { addTodo, getTodos, deleteTodo, updateTodo } = require("../controllers/todoController");

router.post("/add", addTodo);
router.get("/user/:email", getTodos);
router.delete("/delete/:id", deleteTodo);
router.put("/update/:id", updateTodo);

module.exports = router;
