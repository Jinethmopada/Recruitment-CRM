import { useCandidates } from '../context/candidateContext.jsx';
import { useState } from 'react';
import { updateCandidateStatus } from '../api/authApi';

const CandidatesList = () => {
  const { loading, filteredList, loadCandidates } = useCandidates();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentCandidates = filteredList.slice(firstIndex, lastIndex);

  const statuses = [
    'Applied',
    'Screening',
    'Interview',
    'Offer',
    'Hired',
    'Rejected',
  ];

  const handleStatusChange = async (candidateId, nextStatus) => {
    if (!candidateId || !nextStatus) return;

    try {
      await updateCandidateStatus({ candidateId, hiringStatus: nextStatus });
      await loadCandidates();
    } catch (error) {
      console.log('Failed to update candidate status', error);
    }
  };

  return (
    <>
      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold px-2">Candidates</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-4 py-3">CANDIDATE</th>
                <th className="px-4 py-3">EMAIL</th>
                <th className="px-4 py-3">JOB APPLIED</th>
                <th className="px-4 py-3">STAGE</th>
                <th className="px-4 py-3">EXPERIENCE</th>
                <th className="px-4 py-3">LOCATION</th>
                <th className="px-4 py-3">APPLIED ON</th>
              </tr>
            </thead>
            <tbody>
            {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-slate-500">
                    Loading Candidates...
                  </td>
                </tr>
              ) : filteredList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-2xl text-red-500">
                    No Candidates found.
                  </td>
                </tr>
              ) : (
                currentCandidates.map((candidate) => {
                  const fullName = `${candidate.firstName} ${candidate.lastName}`;
                  const location = `${candidate.city}, ${candidate.state}, ${candidate.country}`;
                  const createdDate = candidate.createdDate
                    ? new Date(candidate.createdDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : '-';

                  return (
                    <tr
                      key={candidate.candidateId}
                      className="cursor-pointer rounded-3xl border border-slate-200 bg-slate-50 hover:bg-slate-100"
                    >
                      <td className="px-4 py-5">
                        <div className="font-medium text-slate-900">{fullName}</div>
                      </td>
                      <td className="px-4 py-5 text-slate-700">{candidate.email || '-'}</td>
                      <td className="px-4 py-5 text-slate-700">{candidate.jobTitle || '-'}</td>
                      <td className="px-4 py-5 text-slate-700">
                        <select
                          value={candidate.hiringStatus || 'Applied'}
                          onChange={(e) => handleStatusChange(candidate.candidateId, e.target.value)}
                          className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-5 text-slate-700">{candidate.totalExperience || '-'}</td>
                      <td className="px-4 py-5 text-slate-700">{location || '-'}</td>
                      <td className="px-4 py-5">
                        <div className="text-xs text-slate-500">{createdDate}</div>
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
    </>
  );
};

export default CandidatesList
