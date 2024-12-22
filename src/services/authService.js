import axios from "axios";
import constant from "@/src/services/constant.js";

const attemptRegister = async (username, password) => {
    const response = await axios.post(`${constant.API_URL}/register`, { username, password });
    return response
};

const attemptLogin = async (username, password) => {
    console.log("With Vite:", import.meta.env.VITE_BACKEND_URL);
    console.log("Without Vite in name:", import.meta.env.BACKEND_URL);
    const response = await axios.post(`${constant.API_URL}/login`, { username, password });
    return response.data
};

export default { attemptRegister, attemptLogin };