import axios from "axios";
import constant from "@/src/services/constant.js";

const attemptRegister = async (username, password) => {
    const response = await axios.post(`${constant.API_URL}/register`, { username, password });
    return response
};

const attemptLogin = async (username, password) => {
    const response = await axios.post(`${constant.API_URL}/login`, { username, password });
    return response.data
};

export default { attemptRegister, attemptLogin };