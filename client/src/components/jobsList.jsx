import { useState } from 'react';
import { useJobs } from '../context/jobContext';
import JobDetailsModal from '../layouts/jobDetailsModal';
import ApplyModal from '../layouts/applyModal';
import {PiSuitcaseSimpleLight} from "react-icons/pi";

const JobsList = () => {
  const { loading, filteredList, selectedJob, setSelectedJobId, selectedTitle, setSelectedTitle } = useJobs();

  const [currentPage, setCurrentPage] = useState(1);
  const [applyJob, setApplyJob] = useState(null);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentJobs = filteredList.slice(firstIndex, lastIndex);

  const statusColors = {
    CLOSED: 'bg-rose-100 text-rose-700',
    FILLED: 'bg-orange-100 text-orange-700',
    FROZEN: 'bg-amber-100 text-amber-700',
    HOLD: 'bg-pink-100 text-pink-700',
    OPEN: 'bg-emerald-100 text-emerald-700',
    DRAFT: 'bg-yellow-100 text-yellow-800'
  };

  const jobIconColors = {
    CLOSED: 'border-rose-200 bg-rose-50 text-rose-600',
    FILLED: 'border-orange-200 bg-orange-50 text-orange-600',
    FROZEN: 'border-amber-200 bg-amber-50 text-amber-600',
    HOLD: 'border-pink-200 bg-pink-50 text-pink-600',
    OPEN: 'border-emerald-200 bg-emerald-50 text-emerald-600',
    DRAFT: 'border-yellow-200 bg-yellow-50 text-yellow-700'
  };


  return (
    <>
      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold px-2">Posted Jobs</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Job Title</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Job Type</th>
                <th className="px-4 py-3">Experience</th>
                <th className="px-4 py-3">Posted Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Application</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-slate-500">
                    Loading jobs...
                  </td>
                </tr>
              ) : filteredList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-2xl text-red-500">
                    No jobs found.
                  </td>
                </tr>
              ) : (
                currentJobs.map((job) => {
                  const postedDate = job.postedDate
                    ? new Date(job.postedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : '-';
                  const jobIconClass = jobIconColors[job.jobStatus] || 'border-indigo-200 bg-indigo-50 text-indigo-600';

                  return (
                    <tr
                      key={job.jobId}
                      className="cursor-pointer rounded-3xl border border-slate-200 bg-slate-50 hover:bg-slate-100"
                    >
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-xl border text-lg shadow-sm ${jobIconClass}`}>
                            <PiSuitcaseSimpleLight />
                          </div>
                          <div>
                            <div onClick={() => setSelectedJobId(job.jobId)} className="font-medium text-slate-900">
                              {job.title}
                            </div>
                            <div className="text-xs text-slate-500">{job.jobId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-slate-700">{job.department}</td>
                      <td className="px-4 py-5 text-slate-700">{job.location}</td>
                      <td className="px-4 py-5">
                        <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-900">
                          {job.jobType}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-slate-700">{job.experience}</td>
                      <td className="px-4 py-5 text-slate-700">{postedDate}</td>
                      <td className="px-4 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColors[job.jobStatus]}`}
                        >
                          {job.jobStatus}
                        </span>
                      </td>
                      <td className="px-4 py-5">
                        {job.jobStatus === 'OPEN' ? (
                          <button
                          onClick={() => {
                            setSelectedJobId(null);
                            setSelectedTitle(job.title);
                            setApplyJob(job);
                          }}
                          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
                        >
                          Apply
                        </button>
                        ): "-"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing {firstIndex + 1} - {Math.min(lastIndex, filteredList.length)} of {filteredList.length} jobs
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
                className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-100"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`h-10 w-10 rounded-lg ${
                    currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'border hover:bg-slate-100'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-100"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedJob && <JobDetailsModal />}
      {applyJob && (
        <ApplyModal
          onClose={() => {
            setApplyJob(null);
            setSelectedTitle(null);
          }}
        />
      )}
    </>
  );
};

export default JobsList;
