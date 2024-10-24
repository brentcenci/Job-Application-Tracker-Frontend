import axios from "axios";

const API_URL = "http://127.0.0.1:8080";

const fetchJobs = async (token) => {
    const response =  await axios.get(`${API_URL}/jobs`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

const addJob = async (jobData, token) => {
    console.log("token being used to add job: ", token)
    const response = await axios.post(`${API_URL}/jobs`, jobData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(response.data)
    return response.data
}

const updateJob = async (jobData, editedColumn, newValue, token) => {
    console.log("token being used to update job: ", token);
    jobData[editedColumn] = newValue;
    const response = await axios.put(`${API_URL}/jobs/update`, jobData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(response.data);
    return response.data;
}

export default { fetchJobs, addJob, updateJob };