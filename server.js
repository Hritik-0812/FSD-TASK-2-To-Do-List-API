import express from "express";
const app = express();
app.use(express.json());

// In-memory array
let todos = [
  { id: 1, task: "Learn Node", done: false }
];

// 1️ GET /todos → List all tasks
app.get("/todos", (req, res) => {
  res.json(todos);
});

// 2️ POST /todos → Add a new task
app.post("/todos", (req, res) => {
  const { task } = req.body;
  const newTodo = {
    id: todos.length + 1,
    task,
    done: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// 3️ PATCH /todos/:id → Update done to true
app.patch("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Task not found" });
  }

  todo.done = true;

  res.json({
    message: "Task updated",
    todo
  });
});

// Server start
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
