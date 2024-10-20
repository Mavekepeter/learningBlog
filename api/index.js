import express from'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'
dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('MongoDb is connected');
    
})
.catch((error)=>{
    console.log(error);
    
})
const app = express()

app.use(express.json())
app.listen(3000,()=>{
    console.log('server is running on port 3000');
    
})
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoute)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.meessage || 'Internal server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})