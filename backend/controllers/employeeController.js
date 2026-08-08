import Employees from '../models/Employee.js';

export const postEmployee = async(req,res) => {
    try{
        const {firstName,lastName,email,phoneNumber,totalExperience,employeeId,createdDate} = req.body;
        const employee = await Employees.create({firstName,lastName,email,phoneNumber,totalExperience});
        res.status(200).json({
            success:true,
            employee,
            message:"Employee Data Created Successfully"
        })
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}

export const getEmployees = async(req,res) => {
    try{
        const employees = await Employees.find().sort({createdDate:-1});
        res.status(200).json({
            success:true,
            employees,
            message:"Employees Fetched Successfully"
        })
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}

export const getEmployeeById = async(req,res) => {
    try{
        const {id} = req.params;
        const employee = await Employees.findById(id);
        res.status(200).json({
            success:true,
            employee,
            message:"Employee Fetched Successfully"
        })
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}

export const deleteEmployee = async(req,res) => {
    try {
        const {employeeId} = req.params
        const delEmp = await Employees.findOneAndDelete({employeeId});
        if(!delEmp){
            res.status(404).json({success:false,message:"Employee Not Found"})
        }
        res.status(200).json({success:true,message:"Employee Deleted Successfully"});
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}