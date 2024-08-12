import express from "express"
import { connectDB } from "./config/db.js";



const app = express();
const port = 4000;

connectDB();


app.listen(port,()=>{
    console.log(`Server started on https://localhost:${port}`)
})



//mongodb+srv://subashmurugan2021:398522@cluster0.p4jkc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0