import  mongoose  from "mongoose";


const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const userModal = mongoose.model.user || mongoose.model("user",userSchema);

export default userModal;