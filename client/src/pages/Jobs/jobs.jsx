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
    <div data-testid="jobs-page">
    <div data-testid="jobs-page-header" className="flex justify-between">
    <h1 data-testid="jobs-page-title" className="text-4xl font-bold whitespace-nowrap">Jobs</h1>
    <button data-testid="create-job-button" onClick={() => onClickHandler()} className="border-2 rounded-lg bg-indigo-600 text-white text-center p-3 m-3">+ Create Job</button>
    </div>
    <div data-testid="jobs-page-content" className="space-y-6">
    {isOpen && <JobModal onClose={() => setIsOpen(false)} />}
    <JobSearchLayout/>
    <JobsList/>
    </div>
    </div>
  )
};

export default Jobs