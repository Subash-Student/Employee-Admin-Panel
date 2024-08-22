import express from "express";
import multer from "multer";
import { add, showEmployee } from "../controller/employeeController.js";

const employeeRouter = express.Router();

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()} ${file.originalname}`)
    }
})

const upload = multer({storage:storage});

employeeRouter.post("/add",upload.single("image"),add);
employeeRouter.get("/show",showEmployee)

export default employeeRouter;