import validator from "validator";
import userModal from "../model/userModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const logInUser = async(req,res) => {
  


}
const createToken =(id)=>{
    return jwt.sign({id},'random#secret')
}


export const registerUser =async(req,res)=>{
   

    const{name,email,password} = req.body;
    try{
    const exist = await userModal.findOne({email});

    if(exist){
       return res.json({success:false,message:"User Already Exist"});
    }

    if(!validator.isEmail(email)){
          return res.json({success:false,message:"Please enter valid email"});
        }

     if(password.length < 8){
        return res.json({success:false,message:"Please enter strong password"});
     }
 
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password,salt);

     const newUser = userModal({
        name:name,
        email:email,
        password:hashedPassword
     })
  
     const user = await newUser.save()
      
     const token = createToken(user._id);

     res.json({success:true,token});
    }
    catch(e){
        console.log(e);
        res.json({success:false,message:"Failed To Register"});
    }
}



