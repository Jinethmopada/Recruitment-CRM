import EmployeesList from "../../components/Employees/employeesList"
import EmployeeSearchLayout from "../../layouts/employeeSearchLayout"
import EmployeeModal from "../../layouts/employeeModal"
import { useState } from "react"

const Employees = () => {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div data-testid="employees-page" className="space-y-6">
        <div data-testid="employees-page-header" className="flex justify-between">
            <h1 data-testid="employees-page-title" className="text-4xl font-bold whitespace-nowrap">Employees</h1>
            <button data-testid="create-employee-button" onClick={() => setIsOpen(true)} className="border-2 rounded-lg bg-indigo-600 text-white text-center p-3 m-3">+ Create Employee</button>
        </div>
        {isOpen && <EmployeeModal onClose={() => setIsOpen(false)} />}
        <EmployeeSearchLayout/>
        <EmployeesList/>
        </div>
    )
}

export default Employees