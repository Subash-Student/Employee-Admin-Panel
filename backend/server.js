import express from "express"
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import cors from "cors";
import employeeRouter from "./routes/employeeRoute.js";



//create app

const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(cors());

//connect db
connectDB();

//api routes
app.use("/api/user",userRouter);
app.use("/api/employee",employeeRouter);
app.use("/api/employee",employeeRouter);
app.use("/images",express.static("uploads"));

//check api working
app.get("/",(req,res)=>{
    res.send("API working");
})

//host server
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
    
})

//mongodb+srv://subashmurugan2021:398522@cluster0.p4jkc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0