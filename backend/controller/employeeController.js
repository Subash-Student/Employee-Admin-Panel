import validator from "validator";
import employeeModal from "../model/employeeModal.js";
import streamifier from "streamifier"
import cloudinary from "../config/cloudinary.js";




export const add = async(req,res)=>{

    const {name,email,mobile,designation,gender,degree,byAdd} = req.body;

         const imageFile = req.file  || null;
    if (!imageFile) return res.status(400).json({ message: "Image file is required" });

    const imagePath = await handleFileUpload(imageFile, uploadImage, "Image");


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
        image:imagePath,
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

export const updateEmployee = async (req, res) => {
    try {
      const { _id, name, email, mobile, designation, gender, degree } = req.body;
     
      const imageFile = req.file  || null;
      if (!imageFile) return res.status(400).json({ message: "Image file is required" });
  
      const image_fileName = await handleFileUpload(imageFile, uploadImage, "Image");
  
      const employee = await employeeModal.findOne({_id});
  
      if (!employee) {
        return res.json({ success: false, message: "User does not exist!" });
      }
  

      const namePattern = /^[a-zA-Z ]{2,30}$/;
      if (!namePattern.test(name)) {
        return res.json({ success: false, message: "Please enter a valid name" });
      }
  
      
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter a valid email" });
      }
  
      
      const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (!phonePattern.test(mobile)) {
        return res.json({ success: false, message: "Please enter a valid mobile number" });
      }
  
    
      const updatedEmployee = await employeeModal.updateOne(
        { _id },
        {
          $set: {
            name,
            email,
            mobile,
            designation,
            gender,
            degree,
            ...(image_fileName && { image: image_fileName }),
          },
        }
      );
  
        res.json({ success: true, message: "Details updated successfully" });
     
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Failed to update details" });
    }
  };

  export const deleteEmployee = async (req, res) => {
    try {
      const { _id } = req.body;
  
      // Validate that an ID is provided
      if (!_id) {
        return res.status(400).json({ success: false, message: "Employee ID is required" });
      }
  
      // Find the employee by ID
      const user = await employeeModal.findOne({ _id });
  
      // If the employee does not exist, return an error message
      if (!user) {
        return res.status(404).json({ success: false, message: "User does not exist" });
      }
  
      // Delete the employee
      await employeeModal.deleteOne({ _id });
  
      // Return success message
      return res.json({ success: true, message: `${user.name}'s details deleted successfully` });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Failed to delete details" });
    }
  };
  

  const handleFileUpload = async (file, uploadFunction, type) => {
    if (file) {
        try {
            const result = await uploadFunction(file);
            if (!result?.success) {
                throw new Error(`${type} upload failed`);
            }
            return result.url;
        } catch (error) {
            console.error(`Error during ${type} upload:`, error);
            throw new Error(`${type} upload encountered an error`);
        }
    }
    return null;
};




async function uploadImage(file) {
    return new Promise((resolve, reject) => {
        if (!file?.buffer) {
            return reject({ success: false, message: "Invalid image file" });
        }

        const safeFilename = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "image-files",
                resource_type: "image",
                public_id: safeFilename, // Unique filename to avoid conflicts
            },
            (error, result) => {
                if (error) {
                    console.error("Image upload error:", error);
                    return reject({ success: false });
                }
                resolve({ success: true, url: result.secure_url });
            }
        );

        // Convert the buffer to a readable stream and pipe it to Cloudinary
        streamifier.createReadStream(file.buffer).pipe(stream);
    });
}