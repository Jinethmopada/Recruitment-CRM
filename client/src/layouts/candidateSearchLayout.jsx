import {useCandidates} from '../context/candidateContext.jsx';

const CandidateSearchLayout = () => {
    const {search, handleChange} = useCandidates();

  return (
    <div className="mb-6">
      <div className="rounded-4xl border border-slate-200 bg-slate-100 p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <input
            type="search"
            value={search}
            onChange = {handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            placeholder="Search by Candidate Id or Email"
          />
        </div>
      </div>
    </div>
  );
};

export default CandidateSearchLayout