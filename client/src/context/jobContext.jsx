import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchAllJobs } from "../api/authApi";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const defaultFilters = {
    department: "All Departments",
    location: "All Locations",
    jobType: "All Types",
    experience: "All Levels",
    status: "All Status",
  };
  const [filters, setFilters] = useState(defaultFilters);
  const [filteredList, setFilteredList] = useState([]);

  const onHandleChange = (e) => {
    setSearch(e.target.value);
  };

  const onFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setSearch("");
    setFilters({ ...defaultFilters });
  };

  const filterJobs = () => {
    const jobsList = jobs.filter((job) => {
      const matchesSearch =
        search.trim() === "" ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        String(job.jobId).toLowerCase().includes(search.toLowerCase()) ||
        job.description?.toLowerCase().includes(search.toLowerCase());

      const matchesDepartment =
        filters.department === "All Departments" ||
        job.department === filters.department;
      const matchesLocation =
        filters.location === "All Locations" ||
        job.location === filters.location;
      const matchesJobType =
        filters.jobType === "All Types" || job.jobType === filters.jobType;
      const matchesExperience =
        filters.experience === "All Levels" ||
        job.experience === filters.experience;
      const matchesStatus =
        filters.status === "All Status" || job.jobStatus === filters.status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesLocation &&
        matchesJobType &&
        matchesExperience &&
        matchesStatus
      );
    });
    setFilteredList(jobsList);
  };

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchAllJobs();
        setJobs(data || []);
      } catch (error) {
        console.log("Failed to Fetch Jobs", error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, search, filters]);

  const value = useMemo(
    () => ({
      jobs,
      setJobs,
      loading,
      search,
      filters,
      filteredList,
      onHandleChange,
      onFilterChange,
      clearFilters,
    }),
    [jobs, loading, search, filters, filteredList]
  );

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

export const useJobs = () => useContext(JobContext);