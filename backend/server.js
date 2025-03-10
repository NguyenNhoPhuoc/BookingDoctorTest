import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import connectCloudinary from './config/cloudinary.js'
import connectDB from './config/mongodb.js'
import adminRouter from './routes/adminRouter.js'
// App config
const app= express()
const port = process.env.PORT || 4000
connectDB()
// middlewares

app.use(express.json())
app.use(cors())
connectCloudinary()

//api endpoint
app.use('/api/admin',adminRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>console.log('Server started on PORT:'+port))