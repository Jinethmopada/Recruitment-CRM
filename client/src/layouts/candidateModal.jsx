import React from 'react';
import { useCandidates } from '../context/candidateContext';

const CandidateModal = () => {
  const { selectedCandidate, setSelectedCandidateId } = useCandidates();

  if (!selectedCandidate) return null;

  const fullName = `${selectedCandidate.firstName || ''} ${selectedCandidate.lastName || ''}`.trim() || '-';
  const location = [selectedCandidate.city, selectedCandidate.state, selectedCandidate.country]
    .filter(Boolean)
    .join(', ') || '-';

  const appliedDate = selectedCandidate.createdDate
    ? new Date(selectedCandidate.createdDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '-';

  return (
    <div
      data-testid="candidate-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6 backdrop-blur-sm"
      onClick={() => setSelectedCandidateId(null)}
    >
      <div
        data-testid="candidate-modal-content"
        className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Candidate Details</h2>
            <p className="text-sm text-slate-500">Complete information for the selected candidate.</p>
          </div>
          <button
            data-testid="candidate-modal-close"
            type="button"
            onClick={() => setSelectedCandidateId(null)}
            className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto px-6 py-6">
          <div className="mb-5 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <div>
              <p className="text-sm text-slate-500">Candidate Name</p>
              <p className="text-lg font-semibold text-slate-800">{fullName}</p>
            </div>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
              {selectedCandidate.hiringStatus || 'Applied'}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-slate-600">Candidate ID</p>
              <p className="text-sm text-slate-800">{selectedCandidate.candidateId || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Email</p>
              <p className="text-sm text-slate-800">{selectedCandidate.email || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Phone Number</p>
              <p className="text-sm text-slate-800">{selectedCandidate.phoneNumber || '-'}</p>
            </div>
             <div>
              <p className="text-sm font-medium text-slate-600">Job ID</p>
              <p className="text-sm text-slate-800">{selectedCandidate.jobId || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Job Applied</p>
              <p className="text-sm text-slate-800">{selectedCandidate.jobTitle || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Experience</p>
              <p className="text-sm text-slate-800">{selectedCandidate.totalExperience || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Location</p>
              <p className="text-sm text-slate-800">{location}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Gender</p>
              <p className="text-sm text-slate-800">{selectedCandidate.Gender || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Citizenship</p>
              <p className="text-sm text-slate-800">{selectedCandidate.Citizenship || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Company</p>
              <p className="text-sm text-slate-800">{selectedCandidate.companyName || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Applied On</p>
              <p className="text-sm text-slate-800">{appliedDate}</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-slate-600">Qualification</p>
            <p className="mt-1 text-sm leading-6 text-slate-700">
              School : {selectedCandidate.schoolName || '-'}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-700">
              Degree : {selectedCandidate.degree || '-'}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-700">
              Field of Study : {selectedCandidate.fieldOfStudy || '-'}
            </p>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-slate-600">Role Description</p>
            <p className="mt-1 text-sm leading-6 text-slate-700">
              {selectedCandidate.jobDescription || 'No job description provided.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;