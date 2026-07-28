import Jobs from '../models/Jobs.js';

export const postJob = async(req,res) => {
    try {
        const {jobId,title,description,jobType,department,location,experience} = req.body;
        const jobStatus = req.body.jobStatus || "OPEN";
        
        if(!jobId || !title || !description){
            return res.status(400).json({success:false,message:"Mandatory Fields are missing while creating a Job"});
        }
        const newJob = await Jobs.create({
            jobId,title,description,jobStatus,jobType,department,location,experience
        });

        res.status(201).json({
            success:true,
            newJob,
            message:"Job Posted Successfully"
        })
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getJobs = async(req,res) => {
    try {
        const jobs = await Jobs.find().sort({postedDate:-1});
        res.status(200).json({
            success:true,
            jobs,
            message:"Job Fetched Successfully"
        })
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export const fetchJob = async (req,res) => {
    try {
        const {jobId} = req.params;
        const getJob = await Jobs.findOne({jobId});
        if(!getJob){
             return res.status(404).json({
                success: false,
                message: "Job Not Found"
            });
        }
        return res.status(200).json({
            success:true,
            getJob,
            message:`Job with ID: ${jobId} Fetched Successfully`
        })
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export const editJob = async(req,res) => {
    try {
        const {jobId} = req.params;
        const updateData = req.body;

        const updatedJob = await Jobs.findOneAndUpdate(
            {jobId},
            updateData,
            {new:true}
        );
        if(!updatedJob){
            return res.status(404).json({success:false,error:"Job Not Found"});
        }
        res.status(200).json({success:true,updatedJob,message:"Job Updated Successfully"})

    } catch (error) {
     res.status(500).json({success:false,message:error.message});   
    }
}

export const deleteJob = async(req,res) => {
    try {
        const {jobId} = req.params;
        const deleteJob = await Jobs.findOneAndDelete({jobId});
        if(!deleteJob){
            res.status(404).json({success:false,message:"Job Not Found"})
        }
        res.status(200).json({success:true,message:`Job with ${jobId} Deleted Successfully`})
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}