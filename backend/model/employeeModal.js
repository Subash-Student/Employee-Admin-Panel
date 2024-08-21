import  mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
    designation:{type:String,required:true},
    gender:{type:String,required:true},
    degree:{type:String,required:true},
    image:{type:String,required:true},
})

const employeeModal =mongoose.model.employee || mongoose.model("employee");

export default employeeModal;