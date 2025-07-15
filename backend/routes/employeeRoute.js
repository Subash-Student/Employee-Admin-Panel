import express from "express";
import multer from "multer";
import { add, deleteEmployee, showEmployee, updateEmployee } from "../controller/employeeController.js";


const employeeRouter = express.Router();



employeeRouter.post("/add",multer().single("image"),add);
employeeRouter.get("/show",showEmployee);
employeeRouter.put("/update",multer().single("image"),updateEmployee);
employeeRouter.post("/delete",deleteEmployee);

export default employeeRouter;
