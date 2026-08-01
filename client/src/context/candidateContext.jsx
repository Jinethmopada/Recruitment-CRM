import {useContext, createContext, useState, useEffect} from 'react';
import {fetchCandidates} from '../api/authApi';

const CandidateContext = createContext();

export const CandidateProvider = ({children}) => {
    const [candidatesList, setCandidatesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

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

    const filteredList = candidatesList.filter((candidate) => {
        const query = search.toLowerCase();
        return(
            candidate.candidateId?.toLowerCase().includes(query) || candidate.email?.toLowerCase().includes(query)
        );
    })
    const value = {
        candidatesList,
        filteredList,
        loading,
        search,
        setSearch,
        handleChange,
        loadCandidates
    };

    return(
        <CandidateContext.Provider value={value}>
        {children}
        </CandidateContext.Provider>
    )
}

export const useCandidates = () => useContext(CandidateContext);