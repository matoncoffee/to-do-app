const express = require('express');
const Task = require('../models/modeltask');

const router = express.Router();

// Create task
router.post('/tasks', async (req, res) => {
  const { title } = req.body;
  const task = new Task({ title });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all tasks
router.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

// Update task
router.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete task
router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

