import { useEmployees } from '../context/employeeContext.jsx';
import CountComponent from '../components/Dashboard/countComponent.jsx';
import { GrInProgress } from 'react-icons/gr';
import { useState } from 'react';
import EmployeeModal from './employeeModal.jsx';

const EmployeeSearchLayout = () => {
    const {search, handleChange,employeesList,employeeCount} = useEmployees();
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div data-testid="employee-search-layout" className="mb-6">
      <div className="rounded-4xl border border-indigo-200 bg-slate-100 p-4 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
          <div className="flex-1">
            <input
              data-testid="employee-search-input"
              type="search"
              value={search}
              onChange={handleChange}
              className="w-100 rounded-2xl border border-indigo-400 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="Search by Employee Id or Email"
            />
          </div>
          <div className="w-full xl:max-w-65">
            <CountComponent
              Icon={GrInProgress}
              count={employeeCount}
              text="Total Employees"
              accent="indigo"
            />
          </div>

          <button data-testid="create-employee-button" onClick={() => setIsOpen(true)} className="border-2 rounded-lg bg-indigo-600 text-white text-center p-3 m-3">+ Create Employee</button>
        {isOpen && <EmployeeModal onClose={() => setIsOpen(false)} />}
        </div>
      </div>
    </div>
  );
};

export default EmployeeSearchLayout