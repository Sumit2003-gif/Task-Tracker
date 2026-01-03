const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const taskRoutes = require('./routes/taskRoute')
const { errorHandler } = require('./middleware/errorMiddleware')
dotenv.config()
const app = express()
const Port = process.env.PORT

connectDB()
app.use(cors())
app.use(express.json())
app.use('/api/tasks',taskRoutes)

app.get('/', (req,res)=>{
    return res.status(200).json({message:"Server is working......! "})
})

app.use(errorHandler)
app.listen(Port , ()=>{
    console.log(`Server is start at ${Port}`)
})
