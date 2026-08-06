import EmployeesList from "../../components/Employees/employeesList"
import EmployeeSearchLayout from "../../layouts/employeeSearchLayout"

const Employees = () => {
    return(
        <div data-testid="employees-page" className="space-y-6">
        <EmployeeSearchLayout/>
        <EmployeesList/>
        </div>
    )
}

export default Employees