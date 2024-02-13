const express = require('express');
const router = express.Router();
const taskController = require('./controllers/task.js');

// Route pour la liste des taches
router.get('/tasks', taskController.listTasks);

// Route pour ajouter une tache
router.post('/tasks', taskController.addTask);

// Route pour modifier une tache
router.patch('/tasks/:id', taskController.updateTask);

// Route pour supprimer une tache
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
