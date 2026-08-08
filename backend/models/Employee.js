import mongoose from 'mongoose';
import EmployeeCounter from './EmployeeCounter.js';

const employeeSchema = new mongoose.Schema({
    employeeId:{
        type:String,
        unique:true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: false
    },
    totalExperience:{
        type:String,
        required: false
    },
    createdDate:{
        type:Date,
        default: Date.now
    }
})

employeeSchema.pre('save', async function () {
    if (!this.isNew || this.employeeId) {
        return;
    }

    const counter = await EmployeeCounter.findOneAndUpdate(
        { name: 'employeeId' },
        { $inc: { seq: 1 } },
        {
            new: true,
            upsert: true
        }
    );

    this.employeeId = `E-${counter.seq}`;
});

const Employees =  mongoose.model('Employee', employeeSchema)

export default Employees