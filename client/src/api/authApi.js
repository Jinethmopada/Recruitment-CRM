import api from "./axios";

export const registerUser = async(userData) => {
    const response = await api.post('/register',userData);
    return response.data;
}

export const loginUser = async(userData) => {
    const response = await api.post('/login',userData);
    return response.data;
}

export const fetchAllJobs = async () => {
    const response = await api.get('/get-jobs');
    return response.data.jobs;
}

export const postJob =  async(jobData) => {
    const response = await api.post('/new-job',jobData);
    return response.data;
}

export const deleteJob = async(jobId) => {
    const response = await api.delete(`/jobs/${jobId}`);
    return response.data;
}

export const updateJob = async(data) => {
    const response = await api.put(`/jobs/${data.jobId}`,data);
    return response.data;
}

export const fetchCandidates = async() => {
    const response = await api.get('/get-candidates');
    return response.data.candidates;
}

export const postCandidate = async(data) => {
    const response = await api.post('/candidate',data);
    return response.data;
}

export const updateCandidateStatus = async(data) => {
    const response = await api.put('/candidate-status', data);
    return response.data;
}

export const postEmployee = async(data) => {
    const response = await api.post('/new-employee',data);
    return response.data
}

export const getEmployees = async() => {
    const response = await api.get('/employees');
    return response.data.employees;
}

export const deleteEmployee = async(employeeId) => {
    const response = await api.delete(`/employee/${employeeId}`);
    return response.data;
}