import EmployeesList from "../../components/Employees/employeesList"
import EmployeeSearchLayout from "../../layouts/employeeSearchLayout"
import { useState } from "react"

const Employees = () => {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div data-testid="employees-page" className="space-y-6">
        <div data-testid="employees-page-header" className="flex justify-between">
            <h1 data-testid="employees-page-title" className="text-4xl font-bold whitespace-nowrap">Employees</h1>
         </div>
        <EmployeeSearchLayout/>
        <EmployeesList/>
        </div>
    )
}

export default Employees