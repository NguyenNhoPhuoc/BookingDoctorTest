import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import connectCloudinary from './config/cloudinary.js'
import connectDB from './config/mongodb.js'
import adminRouter from './routes/adminRouter.js'
import aiChatbotRouter from './routes/aiChatbotRouter.js'
import doctorRouter from './routes/doctorRouter.js'
import userRouter from './routes/userRouter.js'
import vnpayRouter from './routes/vnpayRoutes.js'; // Importing the payment router
// App config
const app= express()
const port = process.env.PORT || 4000
connectDB()
// middlewares

app.use(express.json())
const corsOptions = {
  origin: 'https://book-doctor-frontend.onrender.com', // Origin của frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức HTTP được phép
  allowedHeaders: ['Content-Type', 'Authorization'], // Các header được phép
  credentials: true // Nếu cần gửi cookie hoặc thông tin xác thực
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
connectCloudinary()
//api endpoint
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.use('/api/ai-chatbot', aiChatbotRouter)
app.use('/api/payment',vnpayRouter) // Uncommented the payment router
app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>console.log('Server started on PORT:'+port))
