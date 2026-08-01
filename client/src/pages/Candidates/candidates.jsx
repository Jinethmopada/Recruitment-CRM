import CandidatesList from "../../components/candidatesList"
import CandidateSearchLayout from "../../layouts/candidateSearchLayout"


const Candidates = () => {
    return(
        <div className="space-y-6">
            <CandidateSearchLayout/>
            <CandidatesList/>
        </div>
    )
}

export default Candidates