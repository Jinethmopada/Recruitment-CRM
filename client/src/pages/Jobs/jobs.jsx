import React, { useState } from "react";
import { fetchAllJobs } from "../../api/authApi";
import JobSearchLayout from "../../layouts/jobSearchLayout";
import JobsList from "../../components/jobsList";
import JobModal from "../../layouts/jobModal";

const Jobs = () => {
  const [isOpen,setIsOpen] = useState(false);

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
    <div className="flex justify-between">
    <h1 className="text-4xl font-bold whitespace-nowrap">Jobs</h1>
    <button onClick={() => onClickHandler()} className="border-2 rounded-lg bg-indigo-600 text-white text-center p-3 m-3">+ Create Job</button>
    </div>
    <div className="space-y-6">
    {isOpen && <JobModal onClose={() => setIsOpen(false)} />}
    <JobSearchLayout/>
    <JobsList/>
    </div>
    </div>
  )
};

export default Jobs