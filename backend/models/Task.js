const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : [true, 'Please add a task title'], // Error message agar title miss ho
            trim : true,
            maxlength : [100, 'Title can`t be more than 100 characters ']
        } ,
        description : {
            type : String,
            trim : true
        },        
        priority : {
            type: String,
            required: [true, 'Please select priority'],
            enum: ['Low', 'Medium', 'High'], // In 3 ke bahar koi value save nahi hogi
            default: 'Medium'
        },
        dueDate : {
            type: Date,
            required: [true, 'Please add a due date']
        },
        status : {
            type: String,
            required: true,
            enum: ['Pending', 'Completed'],
            default: 'Pending'
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Task',taskSchema)