import React, { useState } from "react";
import toast from "react-hot-toast";
import { postEmployee } from "../api/authApi";
import { useEmployees } from "../context/employeeContext";

const EmployeeModal = ({ onClose }) => {
  const { loadEmployees } = useEmployees();

  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    totalExperience: ""
  });

  const onHandleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!employeeData.firstName || !employeeData.lastName || !employeeData.email) {
      toast.error("First name, last name and email are required");
      return;
    }

    try {
      const payload = {
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        email: employeeData.email,
        phoneNumber: employeeData.phoneNumber,
        totalExperience: employeeData.totalExperience
      };

      const response = await postEmployee(payload);

      if (response.success) {
        toast.success(response.message);
        loadEmployees();
        onClose();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Employee creation failed");
      console.log(error);
    }
  };

  return (
    <div
      data-testid="employee-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        data-testid="employee-modal-content"
        className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Add New Employee</h2>
            <p className="text-sm text-slate-500">Fill in the details below to create a new employee profile.</p>
          </div>
          <button
            data-testid="employee-modal-close"
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <form data-testid="employee-form" onSubmit={submitHandler} className="max-h-[75vh] overflow-y-auto px-6 py-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">First Name</label>
              <input
                data-testid="employee-firstname-input"
                required
                type="text"
                name="firstName"
                onChange={onHandleChange}
                value={employeeData.firstName}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Jane"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Last Name</label>
              <input
                data-testid="employee-lastname-input"
                required
                type="text"
                name="lastName"
                onChange={onHandleChange}
                value={employeeData.lastName}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Doe"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
              <input
                data-testid="employee-email-input"
                required
                type="email"
                name="email"
                onChange={onHandleChange}
                value={employeeData.email}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="jane.doe@example.com"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone Number</label>
              <input
                data-testid="employee-phone-input"
                type="text"
                name="phoneNumber"
                onChange={onHandleChange}
                value={employeeData.phoneNumber}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="+1 9876543210"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Total Experience</label>
              <input
                data-testid="employee-experience-input"
                type="text"
                name="totalExperience"
                onChange={onHandleChange}
                value={employeeData.totalExperience}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="3+ years"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              data-testid="employee-modal-cancel"
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              data-testid="employee-submit-button"
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
            >
              Create Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;