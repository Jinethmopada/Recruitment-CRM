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