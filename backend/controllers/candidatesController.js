import Candidates from '../models/Candidates.js';

export const postCandidate = async(req,res) => {
    try {
        const {candidateId,firstName,lastName,email,phoneNumber,city,state,country,companyName,jobTitle
            ,totalExperience,createdDate,jobDescription,jobId,schoolName,degree,fieldOfStudy,Gender,Citizenship,resumePath
        } = req.body
        const hiringStatus = req.body.hiringStatus || "Applied"
        if(!firstName || !lastName || !email || !phoneNumber || !city || !state 
            || !country || !Gender || !Citizenship){
                return res.status(400).json({success:false,message:"Mandatory Fields are missing"});
            }
         const candidates = await Candidates.create({
           candidateId,firstName,lastName,email,phoneNumber,city,state,country,companyName,jobTitle,
            totalExperience,jobId,createdDate,jobDescription,schoolName,degree,fieldOfStudy,Gender,Citizenship,resumePath,hiringStatus
         });
         res.status(200).json({
            success:true,
            candidates,
            message:"Candidate Data Created Successfully"
         });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getCandidates = async(req,res) => {
    try{
        const candidates = await Candidates.find().sort({createdDate:-1});
        res.status(200).json({
            success:true,
            candidates,
            message:"Candidates Fetched Successfully"
        })
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}

export const updateStatus = async(req,res) => {
    try{
        const {candidateId,hiringStatus} = req.body;
        if(!candidateId || !hiringStatus){
            return res.status(400).json({success:false,message:"Candidate Id and Hiring Status are required"});
        }
        const candidate = await Candidates.findOne({candidateId});
        if(!candidate){
            return res.status(404).json({success:false,message:"Candidate not found"});
        }
        candidate.hiringStatus = hiringStatus;
        await candidate.save();
        res.status(200).json({success:true,message:"Hiring status updated successfully"});
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}