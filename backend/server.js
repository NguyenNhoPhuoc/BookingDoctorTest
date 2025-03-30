import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import connectCloudinary from './config/cloudinary.js'
import connectDB from './config/mongodb.js'
import adminRouter from './routes/adminRouter.js'
import doctorRouter from './routes/doctorRouter.js'
// App config
const app= express()
const port = process.env.PORT || 4000
connectDB()
// middlewares

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
connectCloudinary()
//api endpoint
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>console.log('Server started on PORT:'+port))