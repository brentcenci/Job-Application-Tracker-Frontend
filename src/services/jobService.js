import axios from "axios";
import constants from "@/src/services/constants.js";

const fetchJobs = async (token) => {
    const response =  await axios.get(`${constants.API_URL}/jobs`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};

const addJob = async (jobData, token) => {
    console.log("token being used to add job: ", token)
    const response = await axios.post(`${constants.API_URL}/jobs`, jobData, {
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
    const response = await axios.put(`${constants.API_URL}/jobs/update`, jobData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(response.data);
    return response.data;
}



export default { fetchJobs, addJob, updateJob };