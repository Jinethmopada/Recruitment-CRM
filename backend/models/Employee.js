import mongoose from 'mongoose';
import Counter from "../models/Counter.js";

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

employeeSchema.pre("save", async function () {
  if (!this.isNew) return ;

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "employeeId" },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );

    this.employeeId = `C-${counter.sequenceValue}`;
  } catch (err) {
   throw err;
  }
});

const Employees =  mongoose.model('Employee', employeeSchema)

export default Employees