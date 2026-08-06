import { useEmployees } from '../../context/employeeContext.jsx';
import { useState } from 'react';

const EmployeesList = () => {
  const {
        filteredList,
        loading,
        loadEmployees,
        selectedEmployeeId,
        setSelectedEmployeeId} = useEmployees();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentEmployees = filteredList.slice(firstIndex, lastIndex);

  return (
    <>
      <div data-testid="employees-list-section" className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 data-testid="employees-list-title" className="text-2xl font-semibold px-2">Employees</h2>
          </div>
        </div>

        <div data-testid="employees-table-wrapper" className="overflow-x-auto">
          <table data-testid="employees-table" className="min-w-full border-separate border-spacing-y-3 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-4 py-3">EMPLOYEE</th>
                <th className="px-4 py-3">EMAIL</th>
                <th className="px-4 py-3">PHONE NUMBER</th>
                <th className="px-4 py-3">TOTAL EXPERIENCE</th>
                <th className="px-4 py-3">CREATED DATE</th>
              </tr>
            </thead>
            <tbody>
            {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-slate-500">
                    Loading Employees...
                  </td>
                </tr>
              ) : filteredList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-2xl text-red-500">
                    No Employees found.
                  </td>
                </tr>
              ) : (
                currentEmployees.map((employee) => {
                  const fullName = `${employee.firstName} ${employee.lastName}`;
                  const firstCharacter = employee.firstName ? employee.firstName.charAt(0).toUpperCase() : '';
                  const lastCharacter = employee.lastName ? employee.lastName.charAt(0).toUpperCase() : '';
                  const char = `${firstCharacter}${lastCharacter}`;
                  const createdDate = employee.createdDate
                    ? new Date(employee.createdDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : '-';

                  return (
                    <tr
                      key={employee.employeeId}
                      className="cursor-pointer rounded-3xl border border-slate-200 bg-slate-50 hover:bg-slate-100"
                    >
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-sm font-semibold text-indigo-700 shadow-sm">
                            {char}
                          </div>
                          <div
                            onClick={() => setSelectedEmployeeId(employee.employeeId)}
                            className="cursor-pointer font-semibold text-slate-900 transition hover:text-indigo-700"
                          >
                            {fullName}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-slate-700">{employee.email || '-'}</td>
                      <td className="px-4 py-5 text-slate-700">{employee.phoneNumber || '-'}</td>
                      <td className="px-4 py-5 text-slate-700">{employee.totalExperience || '-'}</td>
                      <td className="px-4 py-5 text-slate-700">{createdDate || '-'}</td>
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

export default EmployeesList
