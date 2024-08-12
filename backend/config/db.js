import  Mongoose  from "mongoose";


export const connectDB = async()=>{
  await Mongoose.connect("mongodb+srv://subashmurugan2021:398522@cluster0.p4jkc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("DB connected")
  })
}