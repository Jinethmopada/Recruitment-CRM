import { useMemo } from "react";
import { useJobs } from "../context/jobContext";

const JobSearchLayout = () => {
  const { jobs, search, filters, onHandleChange, onFilterChange, clearFilters } = useJobs();
  const departments = useMemo(
    () => ["All Departments", ...new Set(jobs.map((job) => job.department || "")).values()],
    [jobs]
  );
  const experience = useMemo(
    () => ["All Levels", ...new Set(jobs.map((job) => job.experience || ""))],
    [jobs]
  );
  const locations = useMemo(
    () => ["All Locations", ...new Set(jobs.map((job) => job.location || ""))],
    [jobs]
  );
  const jobType = useMemo(
    () => ["All Types", ...new Set(jobs.map((job) => job.jobType || ""))],
    [jobs]
  );
  const status = useMemo(
    () => ["All Status", ...new Set(jobs.map((job) => job.jobStatus || ""))],
    [jobs]
  );
  const siteType = useMemo(
    () => ["All Site Types", ...new Set(jobs.map((job) => job.siteType || ""))],
    [jobs]
  );

  return (
    <div data-testid="jobs-search-layout">
      <div className="rounded-4xl border border-slate-200 bg-slate-100 p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <input
            data-testid="job-search-input"
            type="search"
            value={search}
            onChange={onHandleChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            placeholder="Search by Job Id or title"
          />

          <div>
            <label className="block">Department</label>
            <select
              data-testid="filter-department"
              name="department"
              value={filters.department}
              onChange={onFilterChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {departments.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block">Location</label>
            <select
              data-testid="filter-location"
              name="location"
              value={filters.location}
              onChange={onFilterChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {locations.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block">Job Type</label>
            <select
              data-testid="filter-job-type"
              name="jobType"
              value={filters.jobType}
              onChange={onFilterChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {jobType.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block">Experience Level</label>
            <select
              data-testid="filter-experience"
              name="experience"
              value={filters.experience}
              onChange={onFilterChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {experience.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block">Site Type</label>
            <select
              data-testid="filter-site-type"
              name="siteType"
              value={filters.siteType}
              onChange={onFilterChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {siteType.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block">Status</label>
            <select
              data-testid="filter-status"
              name="status"
              value={filters.status}
              onChange={onFilterChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {status.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <button data-testid="clear-filters-button" onClick={() => clearFilters()} className="border-2 rounded-lg bg-indigo-600 text-white text-center p-3 m-3">Clear Filters</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchLayout