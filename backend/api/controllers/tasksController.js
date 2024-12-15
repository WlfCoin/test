// tasksController.js
const Task = require("../../models/tasksModel");
const User = require("../../models/userModel");

// Get all tasks for the user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ success: false, message: "No tasks found" });
        }
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ success: false, message: "Server error while fetching tasks" });
    }
};

// Mark a task as completed
exports.completeTask = async (req, res) => {
    try {
        const { taskId } = req.body;

        if (!taskId) {
            return res.status(400).json({ success: false, message: "Task ID is required" });
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        if (task.completed) {
            return res.status(400).json({ success: false, message: "Task already completed" });
        }

        task.completed = true;
        await task.save();

        res.status(200).json({ success: true, message: "Task marked as completed" });
    } catch (error) {
        console.error("Error completing task:", error);
        res.status(500).json({ success: false, message: "Server error while completing task" });
    }
};

// Add a new task for the user
exports.addTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ success: false, message: "Title and description are required" });
        }

        const task = new Task({
            userId: req.user.id,
            title,
            description,
        });

        await task.save();

        res.status(201).json({ success: true, message: "Task added successfully", data: task });
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ success: false, message: "Server error while adding task" });
    }
};
