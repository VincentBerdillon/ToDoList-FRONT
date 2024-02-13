const { Task } = require('../models/index.js');

const taskController = {
    listTasks: async function (request, response) {
        try{
        const tasks = await Task.findAll()
        response.json(tasks);
        }catch(error){
            console.log(error);
            res.status(500).json(error.toString());
        }
    },

    addTask: async function (request, response){
        const {id, name} = request.body;
        if (!name) {
            return response.status(400).json("le nom ne peut être vide");
        }
        try{
            const newTask = await Task.create(request.body)
            response.json(newTask);
            }catch(error){
                console.log(error);
                res.status(500).json(error.toString());
            }
    },

    updateTask: async function (request, response){
        const taskId = request.params.id
        const task = await Task.findByPk(taskId)

        if (!task) {
            return response.status(404).json("pas de tache existante")
        } 

        try {
        const {name} = request.body

        if (name){
            task.name = name
        }
        
        await task.save()
        response.json(task)

        } catch (error) {
            console.log(error);
            response.status(500).json(error.toString());
        }
    },

    deleteTask: async function (request, response){
        
        try{
        const {id} = request.params
        const task = await Task.destroy({
            where: {id:id}
        })

        if (!task) {
            return response.status(404).json("pas de tache à supprimer")
        } 

        response.status(204).json("no content")

        } catch (error){
            console.log(error);
            response.status(500).json(error.toString());
        }
    },

};

module.exports = taskController;
