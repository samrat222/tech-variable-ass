const router = require("express").Router();
const Task = require("../models/tasks.model");
const User = require("../models/users.model");

router.post("/createTask", async (req, res) => {
  try {
    const { title, description, completed, id } = req.body;
    const existinguser = await User.findById(id);
    if (existinguser) {
      const newTask = new Task({
        title,
        description,
        completed,
        user: existinguser,
      });
      await newTask.save().then(() => res.status(200).json({ newTask }));
      existinguser.todos.push(newTask);
      existinguser.save();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/updateTask/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { title, description, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, completed },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteTask/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
