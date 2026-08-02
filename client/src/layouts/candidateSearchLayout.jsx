import {useCandidates} from '../context/candidateContext.jsx';
import CountComponent from '../components/Dashboard/countComponent.jsx';
import {RxPeople} from "react-icons/rx";
import {FaStar} from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { GrInProgress } from "react-icons/gr";

const CandidateSearchLayout = () => {
    const {search, handleChange,candidatesList,interviewCount,hireCount,rejectedCount,screeningCount} = useCandidates();

  return (
    <div className="mb-6">
      <div className="rounded-4xl border border-indigo-200 bg-slate-100 p-4 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
          <div className="flex-1">
            <input
              type="search"
              value={search}
              onChange={handleChange}
              className="w-full rounded-2xl border border-indigo-400 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="Search by Candidate Id or Email"
            />
          </div>

          <div className="w-full xl:max-w-65">
            <CountComponent
              Icon={RxPeople}
              count={candidatesList.length}
              text="Total Candidates"
              accent="green"
            />
          </div>
          <div className="w-full xl:max-w-65">
            <CountComponent
              Icon={GrInProgress}
              count={screeningCount}
              text="Total Screening"
              accent="indigo"
            />
          </div>
          <div className="w-full xl:max-w-65">
            <CountComponent
              Icon={FaStar}
              count={hireCount}
              text="Total Hires"
              accent="green"
            />
          </div>
          <div className="w-full xl:max-w-65">
            <CountComponent
              Icon={FcCancel}
              count={rejectedCount}
              text="Total Rejected"
              accent="red"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateSearchLayout