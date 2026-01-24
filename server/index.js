import express from "express"
import connectDB from "./config/db.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import cors from 'cors'

const app = express();
const port = process.env.PORT

// Connect to DataBase
connectDB()

// Cors

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true // Without this =>> cookies won't be sent 
}))


// Middleware to parse JSON

app.use(express.json())

// Morgan logger

app.use(morgan("dev"))

// Cookies Parser

app.use(cookieParser())

// Define Routes
app.use("/api/auth",authRoutes) // http://localhost:5000/api/auth/login  || http://localhost:5000/api/auth/signup
app.use("/api/category" , categoryRoutes)
app.use("/api/product" , productRoutes)
app.use("/api/order" ,orderRoutes)
app.use("/api/user" , userRoutes)


// Payment & Webhook Route
app.use("/api" , paymentRoutes)


app.get("/", (req, res)=>{
    res.send('Welcome to E-commerce API')
})







app.listen(port, ()=> {
    console.log(`Server is running on port : ${port}`);
})