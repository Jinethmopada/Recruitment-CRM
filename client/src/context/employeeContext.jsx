import {useContext, createContext, useState, useEffect, useMemo} from 'react';
import {getEmployees} from '../api/authApi';

const EmployeeContext = createContext();

export const EmployeeProvider = ({children}) => {
    const [employeesList, setEmployeesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    

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
        selectedEmployee
    };

    return(
        <CandidateContext.Provider value={value}>
        {children}
        </CandidateContext.Provider>
    )
}

export const useCandidates = () => useContext(CandidateContext);