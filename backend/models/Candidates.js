import mongoose from "mongoose";
import Counter from "../models/Counter.js";

const CandidatesSchema = new mongoose.Schema({
    candidateId:{
        type: String,
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
        type: Number,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    createdDate:{
        type:Date,
        required:true,
        default: Date.now
    },
    totalExperience:{
        type:String,
        required: false
    },
    companyName:{
        type: String,
        required: false
    },
    jobTitle:{
        type: String,
        required: false
    },
    jobDescription:{
        type: String,
        required:false
    },
    schoolName:{
        type: String,
        required: false
    },
    degree:{
        type: String,
        required: false
    },
    fieldOfStudy:{
        type: String,
        required:false
    },
    Gender:{
        type: String,
        required:true
    },
    Citizenship:{
        type: String,
        required:true
    },
    resumePath:{
        type: String,
        required:false
    },
    hiringStatus:{
        type: String,
        default:"Applied"
    }
})

CandidatesSchema.pre("save", async function () {
  if (!this.isNew) return ;

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "candidateId" },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );

    this.candidateId = `C-${counter.sequenceValue}`;
  } catch (err) {
   throw err;
  }
});

const Candidates = mongoose.model('Candidates',CandidatesSchema);

export default Candidates