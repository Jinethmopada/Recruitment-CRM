import {useContext, createContext, useState, useEffect, useMemo} from 'react';
import {getEmployees} from '../api/authApi';

const EmployeeContext = createContext();

export const EmployeeProvider = ({children}) => {
    const [employeesList, setEmployeesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [employeeCount,setEmployeeCount] = useState(0);
    

    useEffect(() => {
        const loadEmployees = async() => {
            try{
                const data = await getEmployees();
                setEmployeesList(data || []);
            }catch(error){
                console.log("Failed to Fetch Candidates", error);
            }finally{
                setLoading(false);
            }
        }

        loadEmployees();
    },[])

    useEffect(() => {
        setEmployeeCount(employeesList.length);
    },[employeesList])

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const loadEmployees = async() => {
        try{
            const data = await getEmployees();
            setEmployeesList(data || []);
        }catch(error){
            console.log("Failed to Fetch Candidates", error);
        }
    }
    
    const uniqueEmployees = Object.values(
  employeesList.reduce((acc, employee) => {
    const key = (employee.email || '').trim().toLowerCase();

    if (!key) {
      // fallback for records without email
      const fallbackKey = employee.employeeId || `${employee.firstName}-${employee.lastName}-${employee.phoneNumber}`;
      if (!acc[fallbackKey]) acc[fallbackKey] = employee;
      return acc;
    }

    if (!acc[key]) acc[key] = employee;
    return acc;
  }, {})
);

    const filteredList = uniqueEmployees.filter((employee) => {
        const query = search.toLowerCase();
        return(
            employee.candidateId?.toLowerCase().includes(query) || employee.email?.toLowerCase().includes(query)
        );
    })

    const selectedEmployee = useMemo(() => {
        if(selectedEmployeeId !== null){
            return employeesList.find((employee) => selectedEmployeeId === employee.employeeId) || null;
        }
    }, [selectedEmployeeId, employeesList])

    const value = {
        employeesList,
        filteredList,
        loading,
        search,
        setSearch,
        handleChange,
        loadEmployees,
        selectedEmployeeId,
        setSelectedEmployeeId,
        selectedEmployee,
        employeeCount
    };

    return(
        <EmployeeContext.Provider value={value}>
        {children}
        </EmployeeContext.Provider>
    )
}

export const useEmployees = () => useContext(EmployeeContext);