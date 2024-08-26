import validator from "validator";
import employeeModal from "../model/employeeModal.js";





export const add = async(req,res)=>{

    const {name,email,mobile,designation,gender,degree,byAdd} = req.body;

    const image_fileName = `${req.file.filename}`;

    const exist =await employeeModal.findOne({email});

    if(exist){
       return res.json({success:false,message:`${name} already exist`});
    }

    var re = /^[a-zA-Z ]{2,30}$/;

    if(!re.test(name)){
        return res.json({success:false,message:"Please enter valid Name"});
    }

    if(!validator.isEmail(email)){
          return res.json({success:false,message:"Please enter valid email"});
    }
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if(mobile.length>10 || !phoneno.test(mobile)){
        return res.json({success:false,message:"Please enter valid mobile number"});
    }
    
    const newEmployee = employeeModal({
        name:name,
        email:email,
        mobile:mobile,
        designation:designation,
        gender:gender,
        degree:degree,
        image:image_fileName,
        AddedBy:byAdd
    })

    try {
        await newEmployee.save();
        res.json({success:true,message:"Employee Details Added"});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Failed while adding"});
    }


}

 export const showEmployee = async(req,res)=>{

    try {
        const data = await employeeModal.find({});
        res.json({success:true,data:data})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Failed"})

    }
}

export const updateEmployee =async(req,res)=>{

    try{
    const {_id,name,email,mobile,designation,gender,degree} = req.body;

    // const image_fileName = `${req.file.filename}`;

    const exist =await employeeModal.findOne({_id});

    if(!exist){
       return res.json({success:false,message:"User does not Exist!"});
    }

    var re = /^[a-zA-Z ]{2,30}$/;

    if(!re.test(name)){
        return res.json({success:false,message:"Please enter valid Name"});
    }

    if(!validator.isEmail(email)){
          return res.json({success:false,message:"Please enter valid email"});
    }
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if(!phoneno.test(mobile)){
        return res.json({success:false,message:"Please enter valid mobile number"});
    }

    const update = await employeeModal.updateOne({_id},{$set:{
        name:name,
        email:email,
        mobile:mobile,
        designation:designation,
        gender:gender,
        degree:degree
    }})

        res.json({ success: true, message: "Details updated successfully" });
    }
     catch (error) {
        console.log(error);
        res.json({success:false,message:"Failed While Update"});
    }
}