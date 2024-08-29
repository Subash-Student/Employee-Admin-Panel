import validator from "validator";
import userModal from "../model/userModal.js";
import bcrypt from "bcrypt";
import 'dotenv/config'
import jwt from "jsonwebtoken";


export const logInUser = async(req,res) => {
  
   const {email,password} = req.body;

   try {
      const user = await userModal.findOne({email});

      if(!user){
        return res.json({success:false,message:"User Does Not Exist!"});
      }
      
      const isMatch = await bcrypt.compare(password,user.password);
      
      if(!isMatch){
         return res.json({success:false,message:"Password Does't Match!"});
      }
      
      const token = createToken(user._id);
      res.json({success:true,token:token,user,message:"Succefully Loged In"})
      
   } catch (error) {
      console.log(error);
      return res.json({success:false,message:"Error while LogIn"});;
   }


}
const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET ||'random#secret')
}

export const registerUser =async(req,res)=>{
   

    const{name,email,password,code} = req.body;
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
      if(code != "2020"){
          return res.json({success:false,message:"Please enter valid admin code"});
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

     res.json({success:true,token,user,message:"Successfully Registered"});
    }
    catch(e){
        console.log(e);
        res.json({success:false,message:"Failed To Register"});
    }
}



