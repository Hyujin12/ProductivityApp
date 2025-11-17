const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  title: {
    type: String,
    required: [true, "Task title is required"],
    trim: true,
    maxlength: [200, "Title cannot exceed 200 characters"]
  },
  deadline: {
    type: Date,
    required: false
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },
  subject: {
    type: String,
    default: "General",
    trim: true
  },
  notes: {
    type: String,
    default: "",
    maxlength: [1000, "Notes cannot exceed 1000 characters"]
  },
  type: {
    type: String,
    enum: ["assignment", "exam", "project", "reading", "other"],
    default: "assignment"
  },
  estimatedTime: {
    type: Number,
    default: 0,
    min: 0
  },
  completed: {
    type: Boolean,
    default: false,
    index: true
  },
  completedAt: {
    type: Date,
    default: null
  },
  tags: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
taskSchema.index({ userId: 1, completed: 1 });
taskSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Task", taskSchema);