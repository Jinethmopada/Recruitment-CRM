import React, { useState } from "react";
import { postJob } from "../api/authApi";

const JobModal = ({ onClose }) => {
    const [jobData,setJobData] = useState({
        jobId:"",
        title:"",
        description:"",
        jobStatus:"",
        jobType:"",
        department:"",
        experience:"",
        location:""
    });

    const onHandleChange = (e) => {
        setJobData({...jobData,[e.target.name] : e.target.value});
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        if(!jobData.jobId || !jobData.title || !jobData.description || !jobData.department || !jobData.jobStatus
            || !jobData.location || !jobData.experience){
                alert("All Mandatory fields are required");
                return;
            }
        try {
            const payload = {
                jobId: jobData.jobId,
                title: jobData.title,
                description: jobData.description,
                jobType: jobData.jobType,
                department: jobData.department,
                experience: jobData.experience,
                location: jobData.location,
            };

            const response = await postJob(payload);
            if(response.success){
                console.log(response);
                alert(response.message);
                onClose();
            }else{
                alert(response.message);
            }
            } catch (error) {
                alert(error.response?.data?.message || "Job Posting Failed");
                console.log(error) 
        }    
    }
    
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Create New Job</h2>
            <p className="text-sm text-slate-500">Fill in the details below to post a new opportunity.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={submitHandler} className="max-h-[75vh] overflow-y-auto px-6 py-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Job ID</label>
              <input
                type="text"
                name="jobId"
                onChange={onHandleChange}
                value={jobData.jobId}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g. JOB-102"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Title</label>
              <input
                required
                type="text"
                name="title"
                onChange={onHandleChange}
                value={jobData.title}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Frontend Developer"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Department</label>
              <input
                type="text"
                required
                name="department"
                value={jobData.department}
                onChange={onHandleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Engineering"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Location</label>
              <input
                required
                type="text"
                name="location"
                value={jobData.location}
                onChange={onHandleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Remote / New York"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Job Type</label>
               <select required name="jobType" value={jobData.jobType} onChange={onHandleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
                <option>Select Type</option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Contract</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Experience Level</label>
               <input
                type="text"
                required
                name="experience"
                value={jobData.experience}
                onChange={onHandleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="2+ years"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Status</label>
              <select required name="jobStatus" value={jobData.jobStatus} onChange={onHandleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
                <option>Select Status</option>
                <option>OPEN</option>
                <option>CLOSED</option>
                <option>DRAFT</option>
                <option>FILLED</option>
                <option>FROZEN</option>
                <option>HOLD</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
            <textarea
            name="description"
            required
            value={jobData.description}
            onChange={onHandleChange}
              rows="4"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="Describe the role, responsibilities, and requirements..."
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;