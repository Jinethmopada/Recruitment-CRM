import React from 'react';
import { useJobs } from '../context/jobContext';
import { deleteJob as deleteJobApi } from '../api/authApi';

const JobDetailsModal = () => {
  const { selectedJob, setSelectedJobId } = useJobs();

  if (!selectedJob) return null;

  const handleDeleteJob = async () => {
    try {
        alert("Are you sure you want to delete");
      await deleteJobApi(selectedJob.jobId);
      setSelectedJobId(null);
      alert(`Job with Job ID: ${selectedJob.jobId} deleted successfully`);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete job');
    }
  };

  const postedDate = selectedJob.postedDate
    ? new Date(selectedJob.postedDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '-';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6 backdrop-blur-sm"
      onClick={() => setSelectedJobId(null)}
    >
      <div
        className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Job Details</h2>
            <p className="text-sm text-slate-500">Complete information for this job posting.</p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedJobId(null)}
            className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto px-6 py-6">
          <div className="mb-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <div>
              <p className="text-sm text-slate-500">Job Title</p>
              <p className="text-lg font-semibold text-slate-800">{selectedJob.title || '-'}</p>
            </div>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
              {selectedJob.jobStatus || 'OPEN'}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-slate-600">Job ID</p>
              <p className="text-sm text-slate-800">{selectedJob.jobId || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Department</p>
              <p className="text-sm text-slate-800">{selectedJob.department || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Location</p>
              <p className="text-sm text-slate-800">{selectedJob.location || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Job Type</p>
              <p className="text-sm text-slate-800">{selectedJob.jobType || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Experience</p>
              <p className="text-sm text-slate-800">{selectedJob.experience || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Posted Date</p>
              <p className="text-sm text-slate-800">{postedDate}</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-slate-600">Description</p>
            <p className="mt-1 text-sm leading-6 text-slate-700">
              {selectedJob.description || 'No description provided.'}
            </p>
          </div>

          <div className="mt-6 flex justify-between">
          <button
              type="button"
              onClick={handleDeleteJob}
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => setSelectedJobId(null)}
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;