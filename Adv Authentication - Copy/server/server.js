import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB(); // connecting to database
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials : true}));

app.use('/api/auth',authRouter);

app.get('/',(req,res)=>{
    res.send('API Working');
})

app.listen(port,(req,res)=>{
    console.log(`Server started on port ${port}`);
    
})

