import React, { useState } from "react";
import { postCandidate } from "../api/authApi";
import { useJobs } from "../context/jobContext";
import { useCandidates } from "../context/candidateContext";
import toast from "react-hot-toast";

const ApplyModal = ({ onClose }) => {
  const { loadCandidates } = useCandidates();
  const { selectedJob, selectedTitle } = useJobs();

  const [candidateData, setCandidateData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    state: "",
    country: "",
    Gender: "",
    Citizenship: "",
    resumePath: "",
    totalExperience: "",
  });

  const onHandleChange = (e) => {
    setCandidateData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const requiredFields = [
      candidateData.firstName,
      candidateData.lastName,
      candidateData.email,
      candidateData.phoneNumber,
      candidateData.city,
      candidateData.state,
      candidateData.country,
      candidateData.Gender,
      candidateData.Citizenship,
    ];

    if (requiredFields.some((field) => !String(field).trim())) {
      toast.error("All mandatory fields are required");
      return;
    }

    const phone = Number(candidateData.phoneNumber);
    if (Number.isNaN(phone)) {
      toast.error("Phone number should be valid digits");
      return;
    }

    try {
      const payload = {
        firstName: candidateData.firstName,
        lastName: candidateData.lastName,
        email: candidateData.email,
        phoneNumber: phone,
        city: candidateData.city,
        state: candidateData.state,
        country: candidateData.country,
        Gender: candidateData.Gender,
        Citizenship: candidateData.Citizenship,
        jobTitle: selectedJob?.title || selectedTitle || "",
        totalExperience: candidateData.totalExperience || "",
        resumePath: candidateData.resumePath || "",
      };

      const response = await postCandidate(payload);

      if (response.success) {
        toast.success(response.message);
        if (typeof loadCandidates === "function") {
          await loadCandidates();
        }
        onClose?.();
      } else {
        toast.error(response.message || "Candidate creation failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Candidate creation failed");
      console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">{`Applying to: ${selectedJob?.title || selectedTitle || "Selected role"}`}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={submitHandler} className="max-h-[75vh] overflow-y-auto px-6 py-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">First Name</label>
              <input
                type="text"
                name="firstName"
                onChange={onHandleChange}
                value={candidateData.firstName}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g. John"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                onChange={onHandleChange}
                value={candidateData.lastName}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g. Doe"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                onChange={onHandleChange}
                value={candidateData.email}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g. john.doe@example.com"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                onChange={onHandleChange}
                value={candidateData.phoneNumber}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g. 9876543210"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">City</label>
              <input
                type="text"
                name="city"
                onChange={onHandleChange}
                value={candidateData.city}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="City"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">State</label>
              <input
                type="text"
                name="state"
                onChange={onHandleChange}
                value={candidateData.state}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="State"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Country</label>
              <input
                type="text"
                name="country"
                onChange={onHandleChange}
                value={candidateData.country}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Country"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Company Name</label>
              <input
                type="text"
                name="companyName"
                onChange={onHandleChange}
                value={candidateData.companyName}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Company Name"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                onChange={onHandleChange}
                value={candidateData.jobTitle}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Job Title"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">School Name</label>
              <input
                type="text"
                name="school"
                onChange={onHandleChange}
                value={candidateData.schoolName}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="School"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Degree</label>
              <input
                type="text"
                name="degree"
                onChange={onHandleChange}
                value={candidateData.degree}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Degree"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Field of Study</label>
              <input
                type="text"
                name="fieldOfStudy"
                onChange={onHandleChange}
                value={candidateData.fieldOfStudy}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Field of Study"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Gender</label>
              <select
                name="Gender"
                onChange={onHandleChange}
                value={candidateData.Gender}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Citizenship</label>
              <input
                type="text"
                name="Citizenship"
                onChange={onHandleChange}
                value={candidateData.Citizenship}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Citizenship"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Total Experience</label>
              <input
                type="text"
                name="totalExperience"
                onChange={onHandleChange}
                value={candidateData.totalExperience}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g. 4 years"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Resume/Portfolio Link</label>
              <input
                type="text"
                name="resumePath"
                onChange={onHandleChange}
                value={candidateData.resumePath}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="https://... or file path"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;