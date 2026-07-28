import { useState } from 'react';
import { useJobs } from '../context/jobContext';
import JobDetailsModal from '../layouts/jobDetailsModal';

const JobsList = () => {
  const { loading, filteredList, selectedJob, setSelectedJobId } = useJobs();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentJobs = filteredList.slice(firstIndex, lastIndex);

  const statusColors = {
    CLOSED: 'bg-rose-100 text-rose-700',
    FILLED: 'bg-orange-100 text-orange-700',
    FROZEN: 'bg-orange-100 text-orange-700',
    HOLD: 'bg-orange-100 text-rose-700',
    OPEN: 'bg-emerald-100 text-emerald-700',
    DRAFT: 'bg-yellow-100 text-black-100'
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

                  return (
                    <tr
                      key={job.jobId}
                      className="cursor-pointer rounded-3xl border border-slate-200 bg-slate-50 hover:bg-slate-100"
                    >
                      <td className="px-4 py-5">
                        <div onClick={() => setSelectedJobId(job.jobId)} className="font-medium text-slate-900">{job.title}</div>
                        <div className="text-xs text-slate-500">{job.jobId}</div>
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
    </>
  );
};

export default JobsList;
