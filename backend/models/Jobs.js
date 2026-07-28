import mongoose from 'mongoose';

const jobsSchema = new mongoose.Schema({
    jobId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    postedDate:{
        type:Date,
        required:true,
        default: Date.now
    },
    jobStatus:{
        type:String,
        default:"OPEN"
    },
    jobType:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    experience:{
        type: String
    }
},
{
    timestamps:true
})

const Jobs = mongoose.model('Jobs',jobsSchema)

export default Jobs