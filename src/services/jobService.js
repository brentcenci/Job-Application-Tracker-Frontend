import axios from "axios";
import constant from "@/src/services/constant.js";

const fetchJobs = async (token) => {
    const response =  await axios.get(`${constant.API_URL}/jobs`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};

const addJob = async (jobData, token) => {
    console.log("token being used to add job: ", token)
    const response = await axios.post(`${constant.API_URL}/jobs`, jobData, {
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
    const response = await axios.put(`${constant.API_URL}/jobs/update`, jobData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(response.data);
    return response.data;
}

const deleteJob = async (jobData, token) => {
    console.log("token being used to delete job: ", token);
    const response = await axios.put(`${constant.API_URL}/jobs/delete`, jobData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(response.data);
    return response.data;
}



export default { fetchJobs, addJob, updateJob, deleteJob };