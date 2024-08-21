import validator from "validator";
import employeeModal from "../model/employeeModal";





export const add = async(req,res)=>{

    const {name,email,mobile,designation,gender,degree} = req.body;

    const image_fileName = `${req.file.filename}`;

    const exist =await employeeModal.findOne({email});

    if(exist){
       return res.json({success:false,message:`${name} already exist`});
    }

    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
        image:image_fileName
    })

    try {
        await newEmployee.save();
        res.json({success:true,message:"Employee Details Added"});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Failed while adding"});
    }


}