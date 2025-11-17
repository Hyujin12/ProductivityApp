const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// All task routes require authentication
router.use(authMiddleware);

// @route   GET /tasks
// @desc    Get all tasks for logged-in user
// @access  Private
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    
    res.json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

// @route   GET /tasks/:id
// @desc    Get single task by ID
// @access  Private
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Get task error:", error);
    res.status(500).json({ message: "Failed to fetch task" });
  }
});

// @route   POST /tasks
// @desc    Create new task
// @access  Private
router.post("/", async (req, res) => {
  try {
    const { 
      title, 
      priority, 
      subject, 
      deadline, 
      notes, 
      type, 
      estimatedTime, 
      tags 
    } = req.body;

    // Validate required fields
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Task title is required" });
    }

    // Create new task
    const task = new Task({
      userId: req.userId,
      title: title.trim(),
      priority: priority || "medium",
      subject: subject || "General",
      deadline: deadline || null,
      notes: notes || "",
      type: type || "assignment",
      estimatedTime: estimatedTime || 0,
      tags: tags || []
    });

    await task.save();
    
    res.status(201).json({
      message: "Task created successfully",
      task
    });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
});

// @route   PUT /tasks/:id
// @desc    Update task
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    // Find task and verify ownership
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Prepare update data
    const updateData = { ...req.body };
    
    // Set completedAt when marking task as completed
    if (req.body.completed === true && !task.completed) {
      updateData.completedAt = new Date();
    } else if (req.body.completed === false) {
      updateData.completedAt = null;
    }

    // Update task
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({
      message: "Task updated successfully",
      task: updatedTask
    });
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
});

// @route   DELETE /tasks/:id
// @desc    Delete task
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.findByIdAndDelete(req.params.id);
    
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

// @route   GET /tasks/stats/summary
// @desc    Get task statistics
// @access  Private
router.get("/stats/summary", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    
    const stats = {
      total: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      pending: tasks.filter(t => !t.completed).length,
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length
    };

    res.json(stats);
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({ message: "Failed to fetch statistics" });
  }
});

module.exports = router;
