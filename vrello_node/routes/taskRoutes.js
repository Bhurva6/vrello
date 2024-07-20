// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { verifyToken } = require('../middleware/authMiddleware');

// Create a new task
router.post('/', verifyToken, async (req, res) => {
  const { title, description, column } = req.body;
  try {
    const task = new Task({
      title,
      description,
      column,
      createdBy: req.user.id,
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all tasks
router.get('/', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a task
router.put('/:id', verifyToken, async (req, res) => {
  const { title, description, column } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.column = column || task.column;
    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a task
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    await task.remove();
    res.status(200).json({ message: 'Task removed' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
