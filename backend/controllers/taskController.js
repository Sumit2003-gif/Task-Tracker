const asyncHandler = require('express-async-handler')
const Task = require('../models/Task')

const createTask = asyncHandler(async (req,res)=>{
    const { title, description, priority,dueDate} = req.body
    console.log("Data",req.body)

    if (!title || !dueDate) {
        res.status(400);
        throw new Error('Please provide title and due date');
    }

    const task = await Task.create({
        title,
        description,
        priority,
        dueDate,
        status : 'Pending'
    })

    res.status(201).json(task)
})

const getTasks = asyncHandler(async (req, res)=>{
    const tasks = await Task.find().sort({ createdAt : -1})
    res.status(200).json(tasks)
})


const updateTask  = asyncHandler(async(req,res)=>{
    const { id } = req.params
    const task = await Task.findById(id )

    if (!task) {
        res.status(404)
        throw new Error('Task not found')
    }

    const updatedTask = await Task.findByIdAndUpdate(
        id,
        { $set : req.body},
        {new: true,runValidators:true}
    ) 

    res.status(200).json(updatedTask)
})


const deleteTask = asyncHandler(async (req,res)=>{
    const task = await Task.findById(req.params.id)

    if (!task) {
        res.status(404)
        throw new Error('Task not found')
    }

    await task.deleteOne()
    res.status(200).json({ id: req.params.id, message : 'Task Deleted Successfully'})
})

module.exports ={
    createTask,getTasks,updateTask,deleteTask
}