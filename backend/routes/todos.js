const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo'); // Adjust path if needed

// GET all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new todo
router.post('/', async (req, res) => {
    try {
        const newTodo = new Todo({
            text: req.body.text,
            completed: req.body.completed
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT (update) a todo
router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE a todo
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(204).end(); // No content to return after deletion
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
