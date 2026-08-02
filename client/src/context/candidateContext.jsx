import {useContext, createContext, useState, useEffect, useMemo} from 'react';
import {fetchCandidates} from '../api/authApi';

const CandidateContext = createContext();

export const CandidateProvider = ({children}) => {
    const [candidatesList, setCandidatesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCandidateId, setSelectedCandidateId] = useState(null);
      const [interviewCount, setInterviewCount] = useState(0);
      const [hireCount, setHireCount] = useState(0);
      const [rejectedCount, setRejectedCount] = useState(0);
      const [screeningCount, setScreeningCount] = useState(0);
    
      useEffect(() => {
        const interviewCount = candidatesList.filter(candidate => candidate.hiringStatus === 'Interview').length;
        const hireCount = candidatesList.filter(candidate => candidate.hiringStatus === 'Hired').length;
        const rejectedCount = candidatesList.filter(candidate => candidate.hiringStatus === 'Rejected').length;
        const screeningCount = candidatesList.filter(candidate => candidate.hiringStatus === 'Screening').length;
        setInterviewCount(interviewCount);
        setHireCount(hireCount);
        setRejectedCount(rejectedCount);
        setScreeningCount(screeningCount);
      }, [candidatesList]);

    useEffect(() => {
        const loadCandidates = async() => {
            try{
                const data = await fetchCandidates();
                setCandidatesList(data || []);
            }catch(error){
                console.log("Failed to Fetch Candidates", error);
            }finally{
                setLoading(false);
            }
        }

        loadCandidates();
    },[])

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const loadCandidates = async() => {
        try{
            const data = await fetchCandidates();
            setCandidatesList(data || []);
        }catch(error){
            console.log("Failed to Fetch Candidates", error);
        }
    }
    
    const uniqueCandidates = Object.values(
  candidatesList.reduce((acc, candidate) => {
    const key = (candidate.email || '').trim().toLowerCase();

    if (!key) {
      // fallback for records without email
      const fallbackKey = candidate.candidateId || `${candidate.firstName}-${candidate.lastName}-${candidate.phoneNumber}`;
      if (!acc[fallbackKey]) acc[fallbackKey] = candidate;
      return acc;
    }

    if (!acc[key]) acc[key] = candidate;
    return acc;
  }, {})
);

    const filteredList = uniqueCandidates.filter((candidate) => {
        const query = search.toLowerCase();
        return(
            candidate.candidateId?.toLowerCase().includes(query) || candidate.email?.toLowerCase().includes(query)
        );
    })

    const selectedCandidate = useMemo(() => {
        if(selectedCandidateId !== null){
            return candidatesList.find((candidate) => selectedCandidateId === candidate.candidateId) || null;
        }
    }, [selectedCandidateId, candidatesList])

    const value = {
        candidatesList,
        filteredList,
        loading,
        search,
        setSearch,
        handleChange,
        loadCandidates,
        selectedCandidateId,
        setSelectedCandidateId,
        selectedCandidate,
        interviewCount,
        hireCount,
        rejectedCount,
        screeningCount
    };

    return(
        <CandidateContext.Provider value={value}>
        {children}
        </CandidateContext.Provider>
    )
}

export const useCandidates = () => useContext(CandidateContext);